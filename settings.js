/**
 * ==========================================
 * 🌟 Sukuna Bot v2.0.0 - Settings Configuration
 * ==========================================
 * 👑 Developer: Adam (Sukuna Team)
 * 🛡️ Team: Dark S-Torm
 * 🚀 Description: Core settings and global variables for dynamic updates.
 * ==========================================
 */

export default {
    // 🖼️ صورة البداية (يمكن تغييرها لاحقاً لصورة خاصة بسوكونا)
    startimage: 'https://files.catbox.moe/qwvzbn.png',
    
    // 👑 رقم المالك (مطابق لملف .env)
    ownerNumber: process.env.OWNER_NUMBER || '249115077208',
    
    // 🤖 اسم البوت الجديد
    botName: 'Sukuna Bot',
    
    // 👤 اسم المطور
    ownerName: 'Adam',
    
    // 🔗 رابط قناة الواتساب (يُفضل تحديثه برابط قناتكم لاحقاً)
    whatsappChannel: 'https://whatsapp.com/channel/0029Vb8vvB1Fcow4AY0NeC1p',
    
    // 📱 معرف المالك في تليجرام (مطابق لملف .env)
    tgOwnerId: process.env.OWNER_TELEGRAM_ID || '7374743956',
    
    // ⭐ قائمة المستخدمين المميزين
    premiumUsers: [],
    
    // 🔗 قائمة الأرقام المتصلة
    connectedBots: [],
    
    // 📦 إصدار البوت
    version: '2.0.0',
    
    // ⚙️ بادئة الأوامر (يمكن جعلها ديناميكية لاحقاً عبر متغيرات البيئة)
    prefix: '.'
};