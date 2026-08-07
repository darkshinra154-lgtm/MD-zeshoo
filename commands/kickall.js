const delay = ms => new Promise(res => setTimeout(res, ms));

async function kickallCommand(sock, from, msg, isAdmin) {
    const isGroup = from.endsWith('@g.us');
    if (!isGroup) return await sock.sendMessage(from, { text: '❌ This command only works in groups!' }, { quoted: msg });
    
    // Only admins/owner can use this command
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Only group admins can use this command!' }, { quoted: msg });

    try {
        const groupMetadata = await sock.groupMetadata(from);
        const botId = sock.user.id.includes(':') ? sock.user.id.split(':')[0] + '@s.whatsapp.net' : sock.user.id;
        const senderId = msg.key.participant || msg.key.remoteJid;
        
        // Check if bot is admin
        const botParticipant = groupMetadata.participants.find(p => p.id === botId);
        const isBotAdmin = botParticipant && (botParticipant.admin === 'admin' || botParticipant.admin === 'superadmin');
        
        if (!isBotAdmin) return await sock.sendMessage(from, { text: '❌ I am not an admin. Please make me admin first!' }, { quoted: msg });

        // Filter participants: Remove bot, sender, and other admins
        const participantsToKick = groupMetadata.participants
            .filter(p => p.id !== botId && p.id !== senderId && !p.admin)
            .map(p => p.id);

        if (participantsToKick.length === 0) {
            return await sock.sendMessage(from, { text: '❌ No non-admin members found to kick.' }, { quoted: msg });
        }

        await sock.sendMessage(from, { text: `⏳ Starting to kick ${participantsToKick.length} members in batches to avoid ban. Please wait...` }, { quoted: msg });

        let kickedCount = 0;
        let errorCount = 0;
        const batchSize = 5; // Kick 5 members at a time

        for (let i = 0; i < participantsToKick.length; i += batchSize) {
            const batch = participantsToKick.slice(i, i + batchSize);
            try {
                await sock.groupParticipantsUpdate(from, batch, 'remove');
                kickedCount += batch.length;
                // Small delay between batches
                await delay(2000); 
            } catch (err) {
                console.error(`Failed to kick batch starting at ${i}:`, err.message);
                errorCount += batch.length;
                // Longer delay on error
                await delay(5000);
            }
        }

        await sock.sendMessage(from, { 
            text: `✅ *KICKALL COMPLETED*\n\n📊 *Stats:*\nTotal: ${participantsToKick.length}\nKicked: ${kickedCount}\nFailed: ${errorCount}\n\n_Note: Admins were skipped for safety._` 
        }, { quoted: msg });

    } catch (e) {
        await sock.sendMessage(from, { text: '❌ Critical Error: ' + e.message }, { quoted: msg });
    }
}

module.exports = kickallCommand;
module.exports = kickallCommand;
