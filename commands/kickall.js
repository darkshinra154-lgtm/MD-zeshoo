const { jidNormalizedUser } = require('@whiskeysockets/baileys');
const delay = ms => new Promise(res => setTimeout(res, ms));

async function kickallCommand(sock, from, msg, isAdmin) {
    const isGroup = from.endsWith('@g.us');
    if (!isGroup) return await sock.sendMessage(from, { text: '❌ This command only works in groups!' }, { quoted: msg });
    
    // Only admins/owner can use this command
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Only group admins can use this command!' }, { quoted: msg });

    try {
        // Fetch fresh metadata to ensure we have latest admin list
        const groupMetadata = await sock.groupMetadata(from);
        const botId = jidNormalizedUser(sock.user.id);
        const senderId = jidNormalizedUser(msg.key.participant || msg.key.remoteJid);
        
        // Check if bot is admin
        const botParticipant = groupMetadata.participants.find(p => jidNormalizedUser(p.id) === botId);
        const isBotAdmin = botParticipant && (botParticipant.admin === 'admin' || botParticipant.admin === 'superadmin');
        
        if (!isBotAdmin) {
            return await sock.sendMessage(from, { 
                text: '❌ *ADMIN ERROR*\n\nI don\'t see myself as an admin in this group. Please:\n1. Make sure I am an admin.\n2. If I am already an admin, try demoting and promoting me again.\n\n_Current Status: Member_' 
            }, { quoted: msg });
        }

        // Filter participants: Remove bot, sender, and other admins
        const participantsToKick = groupMetadata.participants
            .filter(p => {
                const pId = jidNormalizedUser(p.id);
                return pId !== botId && pId !== senderId && !p.admin;
            })
            .map(p => p.id);

        if (participantsToKick.length === 0) {
            return await sock.sendMessage(from, { text: '❌ No non-admin members found to kick.' }, { quoted: msg });
        }

        await sock.sendMessage(from, { text: `⏳ *KICKALL STARTED*\n\nTarget: ${participantsToKick.length} members\nMethod: Batch processing (Anti-Ban)\n\n_Please wait..._` }, { quoted: msg });

        let kickedCount = 0;
        let errorCount = 0;
        const batchSize = 5; 

        for (let i = 0; i < participantsToKick.length; i += batchSize) {
            const batch = participantsToKick.slice(i, i + batchSize);
            try {
                await sock.groupParticipantsUpdate(from, batch, 'remove');
                kickedCount += batch.length;
                await delay(2000); // 2s delay between batches
            } catch (err) {
                console.error(`Failed to kick batch:`, err.message);
                errorCount += batch.length;
                await delay(3000);
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
