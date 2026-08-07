const { jidNormalizedUser } = require('@whiskeysockets/baileys');
const delay = ms => new Promise(res => setTimeout(res, ms));

async function kickallCommand(sock, from, msg, isAdmin) {
    const isGroup = from.endsWith('@g.us');
    if (!isGroup) return await sock.sendMessage(from, { text: '❌ This command only works in groups!' }, { quoted: msg });
    
    // Only admins/owner can use this command
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Only group admins can use this command!' }, { quoted: msg });

    try {
        // Fetch fresh metadata
        const groupMetadata = await sock.groupMetadata(from);
        
        // Super Robust Bot ID Detection
        const rawBotId = sock.user.id;
        const botNumber = rawBotId.split(':')[0].split('@')[0]; // Just the digits
        
        // Find bot in participants by matching just the phone number digits
        const botParticipant = groupMetadata.participants.find(p => {
            const pId = p.id.split('@')[0].split(':')[0];
            return pId === botNumber;
        });

        const isBotAdmin = botParticipant && (botParticipant.admin === 'admin' || botParticipant.admin === 'superadmin');
        
        if (!isBotAdmin) {
            return await sock.sendMessage(from, { 
                text: `❌ *ADMIN ERROR (LOGIC V4)*\n\nI am still unable to confirm my admin status.\n\n*Debug Info:*\n- Bot Number: ${botNumber}\n- Found in List: ${botParticipant ? 'YES' : 'NO'}\n- Role in List: ${botParticipant?.admin || 'member'}\n\n*Solution:*\nTry to **Demote** and then **Promote** me again. This will refresh the group data on WhatsApp servers.` 
            }, { quoted: msg });
        }

        // Filter participants: Remove bot, sender, and other admins
        const senderId = jidNormalizedUser(msg.key.participant || msg.key.remoteJid).split('@')[0];
        
        const participantsToKick = groupMetadata.participants
            .filter(p => {
                const pId = p.id.split('@')[0].split(':')[0];
                // Don't kick bot, don't kick sender, don't kick any admins
                return pId !== botNumber && pId !== senderId && !p.admin;
            })
            .map(p => p.id);

        if (participantsToKick.length === 0) {
            return await sock.sendMessage(from, { text: '❌ No non-admin members found to kick.' }, { quoted: msg });
        }

        await sock.sendMessage(from, { text: `⏳ *KICKALL STARTED (V4)*\n\nTarget: ${participantsToKick.length} members\nMethod: Safe Batch Processing\n\n_Please wait, this will take some time to prevent ban..._` }, { quoted: msg });

        let kickedCount = 0;
        let errorCount = 0;
        const batchSize = 2; // Even smaller batch for maximum safety

        for (let i = 0; i < participantsToKick.length; i += batchSize) {
            const batch = participantsToKick.slice(i, i + batchSize);
            try {
                await sock.groupParticipantsUpdate(from, batch, 'remove');
                kickedCount += batch.length;
                await delay(3000); // 3s delay between batches
            } catch (err) {
                console.error(`Failed to kick batch:`, err.message);
                errorCount += batch.length;
                await delay(4000);
            }
        }

        await sock.sendMessage(from, { 
            text: `✅ *KICKALL SUCCESSFUL*\n\n📊 *Final Report:*\nTotal Targeted: ${participantsToKick.length}\nSuccessfully Kicked: ${kickedCount}\nFailed/Errors: ${errorCount}\n\n_Note: All admins were safely skipped._` 
        }, { quoted: msg });

    } catch (e) {
        await sock.sendMessage(from, { text: '❌ Critical Error: ' + e.message }, { quoted: msg });
    }
}

module.exports = kickallCommand;
