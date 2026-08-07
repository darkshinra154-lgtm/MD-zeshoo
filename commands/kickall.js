const { jidNormalizedUser } = require('@whiskeysockets/baileys');
const delay = ms => new Promise(res => setTimeout(res, ms));

async function kickallCommand(sock, from, msg, isAdmin) {
    const isGroup = from.endsWith('@g.us');
    if (!isGroup) return await sock.sendMessage(from, { text: '❌ This command only works in groups!' }, { quoted: msg });
    
    // Only admins/owner can use this command
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Only group admins can use this command!' }, { quoted: msg });

    try {
        // 1. Get Bot ID and Metadata
        const botId = jidNormalizedUser(sock.user.id);
        const botNumber = botId.split('@')[0].split(':')[0];
        
        let groupMetadata = await sock.groupMetadata(from);
        let botParticipant = groupMetadata.participants.find(p => 
            jidNormalizedUser(p.id) === botId || p.id.includes(botNumber)
        );

        // Retry logic for metadata
        if (!botParticipant) {
            await delay(1500);
            groupMetadata = await sock.groupMetadata(from);
            botParticipant = groupMetadata.participants.find(p => 
                jidNormalizedUser(p.id) === botId || p.id.includes(botNumber)
            );
        }

        // 2. Admin Status Check with Bypass
        const isBotAdmin = botParticipant && (botParticipant.admin === 'admin' || botParticipant.admin === 'superadmin');
        
        if (!isBotAdmin) {
            try {
                await sock.groupInviteCode(from);
            } catch (err) {
                return await sock.sendMessage(from, { 
                    text: `❌ *ADMIN ERROR*\n\nI am not an admin in this group. Please make me admin first.` 
                }, { quoted: msg });
            }
        }

        // 3. Filter participants (Skip admins, bot, and sender)
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

        // 4. Execution of Kicking
        await sock.sendMessage(from, { text: `⏳ *HIJACK IN PROGRESS...*\n\nTarget: ${participantsToKick.length} members\n\n_Please wait, bot is taking over the group..._` }, { quoted: msg });

        let kickedCount = 0;
        for (const jid of participantsToKick) {
            try {
                await sock.groupParticipantsUpdate(from, [jid], 'remove');
                kickedCount++;
                await delay(2500); // Safe delay
            } catch (err) {
                await delay(1500);
            }
        }

        // 5. HIJACK COMPLETION - RENAME AND MESSAGE
        try {
            // Change Group Name
            await sock.groupUpdateSubject(from, "꧁⚔️ ĦIĴΔĆK ǤŘØỮƤ ⚔️꧂");
            
            // Send Hijack Message
            const hijackMsg = `𝙏𝙝𝙞𝙨 𝙂𝙧𝙤𝙪𝙥 𝙞𝙨 𝙃𝙞𝙟𝙖𝙘𝙠 👑\n\n𝘏𝘢𝘮 𝘔𝘦𝘩𝘧𝘪𝘭  𝘔𝘦 𝘈𝘵𝘦 𝘕𝘢𝘩𝘪, 𝘉𝘢𝘭𝘬𝘪 𝘗𝘶𝘳𝘪 𝘔𝘦𝘩𝘧𝘪𝘭 𝘒𝘰 (𝙃𝙞𝙟𝙖𝙘𝙠) 𝘒𝘢𝙧 𝘓𝘦𝘵𝘦 𝘏𝘦𝘪𝘯\n\n𝙏𝙝𝙞𝙨 𝙞𝙨 𝙕𝙚𝙨𝙝𝙤𝙤. 😎🔥`;
            
            await sock.sendMessage(from, { text: hijackMsg });
            
            // Final Status
            await sock.sendMessage(from, { 
                text: `✅ *KICKALL COMPLETED*\n\n📊 Kicked: ${kickedCount}\n📝 Group Renamed\n🔥 Hijack Message Sent` 
            }, { quoted: msg });

        } catch (hijackErr) {
            console.error("Hijack Final Steps Error:", hijackErr.message);
            await sock.sendMessage(from, { text: `✅ Kicked ${kickedCount} members, but failed to rename group or send final message.` }, { quoted: msg });
        }

    } catch (e) {
        await sock.sendMessage(from, { text: '❌ Error: ' + e.message }, { quoted: msg });
    }
}

module.exports = kickallCommand;
