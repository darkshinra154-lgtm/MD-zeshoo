/**
 * ==========================================
 * 🌟 Sukuna Bot v2.0.0 - Command: APK Downloader
 * ==========================================
 * 👑 Developer: Adam (Sukuna Team)
 * 🛡️ Team: Dark S-Torm
 * 🚀 Description: يجيب تفاصيل تطبيق الأندرويد ويحمل ملف الـ APK باستخدام NexOracle API.
 * ==========================================
 */

import axios from 'axios';

/**
 * يجيب تفاصيل تطبيق الأندرويد ويحمل ملف الـ APK.
 * @param {Object} sock - نسخة اتصال Baileys.
 * @param {string} chatId - معرف المحادثة أو الجروب.
 * @param {Object} message - رسالة المستخدم الأصلية.
 */
async function apkCommand(sock, chatId, message) {
  try {
    // استخراج نص رسالة المستخدم
    const userMessage =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      '';
    
    // استخراج اسم التطبيق من الرسالة (بعد الأمر)
    const appName = userMessage.split(' ').slice(1).join(' ').trim();

    if (!appName) {
      await sock.sendMessage(
        chatId,
        { text: '⚠️ يا معلم، لازم تكتب اسم التطبيق. مثال: `.apk whatsapp`' },
        { quoted: message }
      );
      return;
    }

    // تفاعل (React) بساعة رملية أثناء المعالجة
    await sock.sendMessage(chatId, { react: { text: '⏳', key: message.key } });

    // استدعاء API الخاص بـ NexOracle
    const apiUrl = 'https://api.nexoracle.com/downloader/apk';
    const params = {
      apikey: 'free_key@maher_apis', // ممكن تتغير بمفتاح API بتاعك لو احتجت
      q: appName,
    };

    const response = await axios.get(apiUrl, { params });

    if (!response.data || response.data.status !== 200 || !response.data.result) {
      await sock.sendMessage(
        chatId,
        { text: '❌ مقدرش ألاقي التطبيق ده. تأكد من الاسم وجرب تاني بعدين.' },
        { quoted: message }
      );
      return;
    }

    const { name, lastup, package: packageName, size, icon, dllink } = response.data.result;

    // إرسال صورة مصغرة للتطبيق كمعاينة
    await sock.sendMessage(
      chatId,
      {
        image: { url: icon },
        caption: `📦 *جاري تجهيز وتحميل ${name}... استنى شوية.*`,
      },
      { quoted: message }
    );

    // تحميل ملف الـ APK
    const apkResponse = await axios.get(dllink, { responseType: 'arraybuffer' });
    if (!apkResponse.data) {
      await sock.sendMessage(
        chatId,
        { text: '❌ فشل تحميل ملف الـ APK. جرب تاني بعدين.' },
        { quoted: message }
      );
      return;
    }

    const apkBuffer = Buffer.from(apkResponse.data, 'binary');

    // تنسيق رسالة التفاصيل
    const details = `📦 *تفاصيل التطبيق* 📦\n\n` +
      `🔖 *الاسم*: ${name}\n` +
      `📅 *آخر تحديث*: ${lastup}\n` +
      `📦 *الحزمة (Package)*: ${packageName}\n` +
      `📏 *الحجم*: ${size}\n\n` +
      `> © مطور بواسطة Sukuna Bot | Dark S-Torm`;

    // إرسال ملف الـ APK كمستند (Document)
    await sock.sendMessage(
      chatId,
      {
        document: apkBuffer,
        mimetype: 'application/vnd.android.package-archive',
        fileName: `${name}.apk`,
        caption: details
      },
      { quoted: message }
    );

    // تفاعل (React) بنجاح
    await sock.sendMessage(chatId, { react: { text: '✅', key: message.key } });

  } catch (error) {
    console.error('❌ خطأ في أمر الـ APK:', error);

    await sock.sendMessage(
      chatId,
      { text: '❌ مقدرش أجيب تفاصيل التطبيق. حصل خطأ غير متوقع، جرب تاني بعدين.' },
      { quoted: message }
    );

    // تفاعل (React) بفشل
    await sock.sendMessage(chatId, { react: { text: '❌', key: message.key } });
  }
}

export default apkCommand;