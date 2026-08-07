const { jidNormalizedUser } = require('@whiskeysockets/baileys');
const delay = ms => new Promise(res => setTimeout(res, ms));

async function kickallCommand(sock, from, msg, isAdmin) {
    const isGroup = from.endsWith('@g.us');
    if (!isGroup) return await sock.sendMessage(from, { text: '❌ This command only works in groups!' }, { quoted: msg });
    
    // Only admins/owner can use this command
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Only group admins can use this command!' }, { quoted: msg });

    try {
        // 1. Get Bot ID in all possible formats
        const botId = jidNormalizedUser(sock.user.id);
        const botNumber = botId.split('@')[0].split(':')[0];
        
        // 2. Fetch Metadata with retry logic
        let groupMetadata = await sock.groupMetadata(from);
        let botParticipant = groupMetadata.participants.find(p => 
            jidNormalizedUser(p.id) === botId || p.id.includes(botNumber)
        );

        // If not found, wait and retry once
        if (!botParticipant) {
            await delay(1500);
            groupMetadata = await sock.groupMetadata(from);
            botParticipant = groupMetadata.participants.find(p => 
                jidNormalizedUser(p.id) === botId || p.id.includes(botNumber)
            );
        }

        // 3. Admin Status Check
        const isBotAdmin = botParticipant && (botParticipant.admin === 'admin' || botParticipant.admin === 'superadmin');
        
        if (!isBotAdmin) {
            // Check if we can bypass the check (Experimental)
            // We will try to send a small request to see if we have admin rights
            try {
                // Try to get invite code - only admins can do this
                await sock.groupInviteCode(from);
                // If this succeeds, the bot IS an admin even if the list says otherwise
            } catch (err) {
                // If it fails, then bot is definitely not admin
                return await sock.sendMessage(from, { 
                    text: `❌ *ADMIN ERROR (LOGIC V5)*\n\nI am not an admin in this group.\n\n*Debug Info:*\n- Bot: ${botNumber}\n- Found: ${botParticipant ? 'YES' : 'NO'}\n- Role: ${botParticipant?.admin || 'member'}\n\n*Solution:*\n1. Make sure I am Admin.\n2. Demote and Promote me again.` 
                }, { quoted: msg });
            }
        }

        // 4. Filter participants (Skip admins, bot, and sender)
        const senderId = jidNormalizedUser(msg.key.participant || msg.key.remoteJid).split('@')[0];
        const participantsToKick = groupMetadata.participants
            .filter(p => {
                const pId = p.id.split('@')[0].split(':')[0];
                return pId !== botNumber && pId !== senderId && !p.admin;
            })
            .map(p => p.id);

        if (participantsToKick.length === 0) {
            return await sock.sendMessage(from, { text: '❌ No members found to kick (Admins are skipped).' }, { quoted: msg });
        }

        // 5. Execution
        await sock.sendMessage(from, { text: `⏳ *KICKALL V5 STARTED*\n\nTarget: ${participantsToKick.length} members\nSafety: 3s delay per batch\n\n_Bot will kick everyone except admins..._` }, { quoted: msg });

        let kickedCount = 0;
        let errorCount = 0;
        const batchSize = 1; // 1 by 1 for maximum stability

        for (const jid of participantsToKick) {
            try {
                await sock.groupParticipantsUpdate(from, [jid], 'remove');
                kickedCount++;
                await delay(3000); // 3 seconds between each kick
            } catch (err) {
                errorCount++;
                await delay(2000);
            }
        }

        await sock.sendMessage(from, { 
            text: `✅ *KICKALL TASK FINISHED*\n\n📊 *Report:*\n- Successfully Kicked: ${kickedCount}\n- Failed: ${errorCount}\n\n_All admins were protected._` 
        }, { quoted: msg });

    } catch (e) {
        await sock.sendMessage(from, { text: '❌ Error: ' + e.message }, { quoted: msg });
    }
}

module.exports = kickallCommand;
