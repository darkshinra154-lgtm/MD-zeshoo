/**
 * ==========================================
 * 🌟 Sukuna Bot v2.0.0 - Helper Function
 * ==========================================
 * 👑 Developer: Adam (Sukuna Team)
 * 🛡️ Team: Dark S-Torm
 * 🚀 Description: Checks if a given sender ID is the bot owner.
 * ==========================================
 */

import settings from '../settings.js';

/**
 * Checks if the sender is the bot owner.
 * @param {string} senderId - The sender's JID (e.g., '249115077208@s.whatsapp.net').
 * @returns {boolean} - True if the sender is the owner, false otherwise.
 */
function isOwner(senderId) {
    if (!senderId) return false;
    
    // استخراج الرقم النظيف من الـ JID
    const senderClean = senderId.split('@')[0];
    
    // دعم أرقام مالكة متعددة مفصولة بفاصلة (كما هو محدد في settings)
    const ownerNumbers = String(settings.ownerNumber)
        .split(',')
        .map(num => num.replace(/\D/g, ''));
        
    return ownerNumbers.includes(senderClean);
}

export default isOwner;