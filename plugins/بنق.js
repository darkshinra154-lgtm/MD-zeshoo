/**
 * ═══════════════════════════════════════════════════════
 * 🧪 PING & SYSTEM TEST | أمر اختبار النظام
 * ═══════════════════════════════════════════════════════
 * 👑 المطور: آدم (شادو) | Adam (Shadow)
 * 🤖 البوت: سوكونا × ZESHOO | Sukuna Hybrid
 * 🏷️ الحقوق: ${global.author}
 * 📜 الوصف: اختبار سريع لصحة النظام وعرض معلوماته الأساسية
 * ═══════════════════════════════════════════════════════
 */

import { performance } from 'perf_hooks'

let handler = async (m, { conn, usedPrefix, command, isOwner }) => {
  // 🚀 دعم البيئة الجديدة (ZESHOO يستخدم sock، وسوكونا يستخدم conn)
  const bot = conn || m.sock || m.conn
  if (!bot) return m.reply('⚠️ تعذر الوصول لاتصال البوت.')

  // ⏱️ قياس سرعة الاستجابة
  const start = performance.now()
  const pingMsg = await bot.sendMessage(m.chat, { text: '⏳ جاري القياس...' }, { quoted: m })
  const end = performance.now()
  const speed = (end - start).toFixed(2)

  // 📊 معلومات النظام
  const uptime = process.uptime()
  const days = Math.floor(uptime / 86400)
  const hours = Math.floor((uptime % 86400) / 3600)
  const minutes = Math.floor((uptime % 3600) / 60)
  const seconds = Math.floor(uptime % 60)
  const uptimeText = `${days}d ${hours}h ${minutes}m ${seconds}s`

  const totalPlugins = Object.keys(global.plugins || {}).length
  const botName = global.botname || global.botName || 'ZESHOO MINI'
  const authorName = global.author || global.ownerName || 'Adam (Shadow)'
  const prefix = usedPrefix || global.prefix || '.'

  // 🎭 نص الرد بالزخارف الأسطورية
  let text = `⊱⊹•─๋︩︪═╾═─•┈⧽┊🎭┊⧼┈•─═╼═─๋︩︪•⊹⊰\n`
  text += `*⌗› نـظـام الـتـشـغـيـل نـشـط ⚡ ˼˹*\n`
  text += `*⋄⊹•─๋︩︪╾─•┈ ⧼ ⇊ ⧽ ┈•─╼─๋︩︪•⊹⋄*\n\n`

  text += `> *˼‏🤖˹ مـعـلـومـات الـبـوت╿↶*\n`
  text += `╮─ׅ ─๋︩︪─┈ ─๋︩︪─═⊏═┈ ─๋︩︪─ ∙ ∙ ⊰ـ\n`
  text += `│┊🪪 *الـاسـم:* ${botName}\n`
  text += `│┊👑 *الـمـطـور:* ${authorName}\n`
  text += `│┊🔌 *الـبـيـنـق:* \`${speed}ms\` ⚡\n`
  text += `│┊⏱️ *وقـت الـتـشـغـيـل:* ${uptimeText}\n`
  text += `│┊📦 *الـبـلـجـنـات:* \`${totalPlugins}\` بلجن\n`
  text += `│┊⚙️ *الـبـادئـة:* \`${prefix}\`\n`
  text += `╯─ׅ ─๋︩︪─┈ ─๋︩︪─═⊏═┈ ─๋︩︪─ ∙ ∙ ⊰ـ\n\n`

  text += `> *˼‏✅˹ حـالـة الـنـظـام╿↶*\n`
  text += `╮─ׅ ─๋︩︪─┈ ─๋︩︪─═⊏═┈ ─๋︩︪─ ∙ ∙ ⊰ـ\n`
  text += `│┊🟢 *الـواتـسـاب:* مـتـصـل\n`
  text += `│┊🟢 *نـظـام الـبـلـجـنـات:* نـشـط\n`
  text += `│┊🟢 *الـجـسـر WA↔TG:* ${global.waBridge?.enabled ? 'مفعّل' : 'موقوف'}\n`
  text += `│┊👤 *صـلاحـيـاتـك:* ${isOwner ? 'مـطـور 👑' : 'عـضـو 🎭'}\n`
  text += `╯─ׅ ─๋︩︪─┈ ─๋︩︪─═⊏═┈ ─๋︩︪─ ∙ ∙ ⊰ـ\n\n`

  text += `*~❍━═══━⚞💎≽━═══━❍~*\n`
  text += `> 🕸 *${botName} | Powered by ${authorName}*\n`
  text += `*~❍━═══━⚞💎≽━═══━❍~*`

  // 🗑️ حذف رسالة القياس الأولية وإرسال النتيجة النهائية
  try {
    await bot.sendMessage(m.chat, { delete: pingMsg.key })
  } catch (e) {}

  await bot.sendMessage(m.chat, { text }, { quoted: m })
}

handler.help = ['ping', 'alive', 'test']
handler.tags = ['main']
handler.command = ['ping', 'alive', 'test', 'بنق', 'اختبار']
handler.description = 'اختبار سرعة استجابة البوت وعرض حالته ومعلوماته الأساسية.'

export default handler
