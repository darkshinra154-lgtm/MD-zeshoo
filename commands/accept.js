/**
 * ==========================================
 * 🌟 Sukuna Bot v2.0.0 - Command: Accept
 * ==========================================
 * 👑 Developer: Adam (Sukuna Team)
 * 🛡️ Team: Dark S-Torm
 * 🚀 Description: يوافق تلقائياً على طلبات الانضمام المعلقة في الجروب.
 * ==========================================
 */

/**
 * يوافق على طلبات الانضمام المعلقة في الجروب.
 * @param {Object} sock - نسخة اتصال Baileys.
 * @param {string} from - معرف الجروب (JID).
 * @param {Object} msg - رسالة المستخدم الأصلية.
 * @param {boolean} isAdmin - هل المستخدم أدمن؟
 */
async function acceptCommand(sock, from, msg, isAdmin) {
    // التحقق من أن الأمر يُستخدم في الجروبات فقط
    if (!from.endsWith('@g.us')) {
        return sock.sendMessage(from, { text: '❌ الأمر ده بيشتغل في الجروبات بس يا معلم.' }, { quoted: msg });
    }

    try {
        // جلب قائمة طلبات الانضمام المعلقة
        const response = await sock.groupRequestParticipantsList(from);
        
        if (!response || response.length === 0) {
            return sock.sendMessage(from, { text: '✅ مفيش طلبات انضمام معلقة في الجروب ده حالياً.' }, { quoted: msg });
        }

        await sock.sendMessage(from, { text: `⏳ لقيت ${response.length} طلبات انضمام معلقة. جاري الموافقة عليهم تلقائياً...` }, { quoted: msg });

        let acceptedCount = 0;
        for (const participant of response) {
            try {
                // الموافقة على الطلب
                await sock.groupRequestParticipantsUpdate(from, [participant.jid], 'approve');
                acceptedCount++;
                
                // تأخير بسيط (ثانيتين) لمنع الحظر المؤقت من واتساب (Rate Limiting)
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (err) {
                console.error(`فشل في الموافقة على ${participant.jid}:`, err.message);
            }
        }

        await sock.sendMessage(from, { text: `✅ تم الموافقة على ${acceptedCount} طلب انضمام بنجاح.` }, { quoted: msg });

    } catch (e) {
        console.error('خطأ في أمر القبول (Accept):', e);
        await sock.sendMessage(from, { text: `❌ حصل خطأ أثناء المعالجة: ${e.message}` }, { quoted: msg });
    }
}

export default acceptCommand;