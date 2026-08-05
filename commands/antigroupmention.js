async function antigroupmentionCommand(sock, from, msg, isAdmin, botData, saveBotData, args) {
    if (!isAdmin || !from.endsWith('@g.us')) return await sock.sendMessage(from, { text: "❌ Only admin can use this command in groups." }, { quoted: msg });
    
    if (!botData.antigroupmentionGroups) botData.antigroupmentionGroups = {};
    
    const action = args[0]?.toLowerCase();
    if (action === 'on' || action === 'delete') {
        botData.antigroupmentionGroups[from] = true;
        saveBotData();
        await sock.sendMessage(from, { text: "✅ Anti-GroupMention (Delete) Enabled!" }, { quoted: msg });
    } else if (action === 'off') {
        botData.antigroupmentionGroups[from] = false;
        saveBotData();
        await sock.sendMessage(from, { text: "❌ Anti-GroupMention Disabled!" }, { quoted: msg });
    } else {
        await sock.sendMessage(from, { text: "❌ Usage: .antigroupmention [on/off]" }, { quoted: msg });
    }
}

module.exports = antigroupmentionCommand;
