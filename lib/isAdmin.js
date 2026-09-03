/**
 * ==========================================
 * 🌟 Sukuna Bot v2.0.0 - Helper Function
 * ==========================================
 * 👑 Developer: Adam (Sukuna Team)
 * 🛡️ Team: Dark S-Torm
 * 🚀 Description: Checks if a participant is an admin in a WhatsApp group.
 * ==========================================
 */

/**
 * Checks if a user is an admin or superadmin in a group.
 * @param {Object} sock - The Baileys socket instance.
 * @param {string} chatId - The group JID (must end with @g.us).
 * @param {string} senderId - The participant's JID to check.
 * @returns {Promise<boolean>} - True if admin/superadmin or if it's a private chat, false otherwise.
 */
async function isAdmin(sock, chatId, senderId) {
    // In private chats, everyone is considered an "admin" of their own chat
    if (!chatId.endsWith('@g.us')) return true;
    
    try {
        const groupMetadata = await sock.groupMetadata(chatId);
        const participant = groupMetadata.participants.find(p => p.id === senderId);
        return participant && (participant.admin === 'admin' || participant.admin === 'superadmin');
    } catch (e) {
        // If metadata fetching fails, default to false for safety
        return false;
    }
}

export default isAdmin;