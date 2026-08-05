async function kickallCommand(sock, from, msg, isAdmin) {
    const isGroup = from.endsWith('@g.us');
    if (!isGroup) return await sock.sendMessage(from, { text: '❌ This command only works in groups!' }, { quoted: msg });
    
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Only admin can use this command!' }, { quoted: msg });

    try {
        const groupMetadata = await sock.groupMetadata(from);
        const botId = sock.user.id.includes(':') ? sock.user.id.split(':')[0] + '@s.whatsapp.net' : sock.user.id;
        const senderId = msg.key.participant || msg.key.remoteJid;
        
        // Check if bot is admin
        const botParticipant = groupMetadata.participants.find(p => p.id === botId);
        const isBotAdmin = botParticipant && (botParticipant.admin === 'admin' || botParticipant.admin === 'superadmin');
        
        if (!isBotAdmin) return await sock.sendMessage(from, { text: '❌ I am not an admin. Please make me admin first!' }, { quoted: msg });

        await sock.sendMessage(from, { text: '⏳ Kicking all members... Please wait.' }, { quoted: msg });

        const participants = groupMetadata.participants
            .filter(p => p.id !== botId && p.id !== senderId) // Don't kick bot and sender
            .map(p => p.id);

        if (participants.length === 0) {
            return await sock.sendMessage(from, { text: '❌ No members to kick.' }, { quoted: msg });
        }

        // Removing participants
        await sock.groupParticipantsUpdate(from, participants, 'remove');

        await sock.sendMessage(from, { text: `✅ Successfully kicked ${participants.length} members.` }, { quoted: msg });
    } catch (e) {
        await sock.sendMessage(from, { text: '❌ Failed to kick members: ' + e.message }, { quoted: msg });
    }
}

module.exports = kickallCommand;
