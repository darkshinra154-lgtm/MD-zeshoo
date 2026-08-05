async function antistatusCommand(sock, from, msg, isAdmin, botData, saveBotData, args) {
    if (!from.endsWith('@g.us')) return await sock.sendMessage(from, { text: "❌ This command only works in groups." }, { quoted: msg });
    if (!isAdmin) return await sock.sendMessage(from, { text: "❌ Only admins can use this command." }, { quoted: msg });

    const action = args[0]?.toLowerCase();
    if (!botData.antiStatusGroups) botData.antiStatusGroups = {};

    if (['delete', 'kick', 'warn', 'on'].includes(action)) {
        const mode = action === 'on' ? 'delete' : action;
        botData.antiStatusGroups[from] = mode;
        saveBotData();
        await sock.sendMessage(from, { 
            text: `✅ *Anti-Status Enabled!*\n\n*Mode:* ${mode.toUpperCase()}\n\nAny status shared in this group will be handled according to the selected mode.` 
        }, { quoted: msg });
    } else if (action === 'off') {
        botData.antiStatusGroups[from] = false;
        saveBotData();
        await sock.sendMessage(from, { text: "❌ *Anti-Status Disabled!*" }, { quoted: msg });
    } else {
        await sock.sendMessage(from, { 
            text: "❌ *Usage:* .antistatus [delete/kick/warn/off]\n\nExample: `.antistatus kick`" 
        }, { quoted: msg });
    }
}

module.exports = antistatusCommand;
