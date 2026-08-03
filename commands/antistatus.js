// main.js
const antiStatusHandler = require('./antiStatusHandler');

// Your botData structure
let botData = {
    antiStatusGroups: {},
    // ... other bot data
};

// Your message handler
sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    
    // Handle anti-status FIRST
    await antiStatusHandler(sock, msg, botData, saveBotData);
    
    // Then handle other commands...
    if (msg.message?.conversation || msg.message?.extendedTextMessage?.text) {
        const messageText = msg.message?.conversation || 
                           msg.message?.extendedTextMessage?.text || '';
        
        // Check for antistatus command
        if (messageText.startsWith('.antistatus')) {
            const args = messageText.split(' ');
            // ... your command handling
        }
    }
});

// Save function
function saveBotData() {
    // Your save logic (file, database, etc.)
}

// Export your command (already working)
async function antistatusCommand(sock, from, msg, isAdmin, botData, saveBotData, args) {
    if (!from.endsWith('@g.us')) {
        return await sock.sendMessage(from, { 
            text: "❌ This command only works in groups." 
        }, { quoted: msg });
    }
    
    if (!isAdmin) {
        return await sock.sendMessage(from, { 
            text: "❌ Only admins can use this command." 
        }, { quoted: msg });
    }

    const action = args[0]?.toLowerCase();
    if (!botData.antiStatusGroups) botData.antiStatusGroups = {};

    if (action === 'on') {
        botData.antiStatusGroups[from] = true;
        saveBotData();
        await sock.sendMessage(from, { 
            text: "✅ *Anti-Status Enabled!*\n\nAny status shared in this group will be automatically deleted." 
        }, { quoted: msg });
    } else if (action === 'off') {
        botData.antiStatusGroups[from] = false;
        saveBotData();
        await sock.sendMessage(from, { 
            text: "❌ *Anti-Status Disabled!*" 
        }, { quoted: msg });
    } else {
        await sock.sendMessage(from, { 
            text: "❌ Usage: .antistatus [on/off]" 
        }, { quoted: msg });
    }
}
