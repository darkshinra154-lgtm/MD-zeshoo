async function antistickerCommand(sock, from, msg, isAdmin, botData, saveBotData, args) {
    if (!from.endsWith('@g.us')) return await sock.sendMessage(from, { text: "❌ This command only works in groups." }, { quoted: msg });
    const action = args[0]?.toLowerCase();
    if (!botData.antiStickerGroups) botData.antiStickerGroups = {};

    if (action === 'on' || action === 'delete') {
        botData.antiStickerGroups[from] = 'delete';
        saveBotData();
        await sock.sendMessage(from, { text: "✅ *Anti-Sticker Enabled (Delete Mode)!*\n\nAny sticker shared in this group will be automatically deleted." }, { quoted: msg });
    } else if (action === 'warn') {
        botData.antiStickerGroups[from] = 'warn';
        saveBotData();
        await sock.sendMessage(from, { text: "✅ *Anti-Sticker Enabled (Warn Mode)!*\n\nAny sticker shared will be deleted and the user will be warned." }, { quoted: msg });
    } else if (action === 'kick') {
        botData.antiStickerGroups[from] = 'kick';
        saveBotData();
        await sock.sendMessage(from, { text: "✅ *Anti-Sticker Enabled (Kick Mode)!*\n\nAny sticker shared will be deleted and the user will be kicked." }, { quoted: msg });
    } else if (action === 'off') {
        botData.antiStickerGroups[from] = false;
        saveBotData();
        await sock.sendMessage(from, { text: "❌ *Anti-Sticker Disabled!*" }, { quoted: msg });
    } else {
        await sock.sendMessage(from, { text: "❌ Usage:\n.antisticker on (Delete only)\n.antisticker warn (Delete + Warn)\n.antisticker kick (Delete + Kick)\n.antisticker off (Disable)" }, { quoted: msg });
    }
}
module.exports = antistickerCommand;
