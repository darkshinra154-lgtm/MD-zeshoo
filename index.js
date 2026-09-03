/**
* ==========================================
* 🌟 Sukuna Bot v2.0.0 - Main Entry Point
* ==========================================
* 👑 Developer: Adam (Sukuna Team)
* 🛡️ Team: Dark S-Torm
* 🚀 Description: Core bot initialization, Telegram integration, 
*                 Web Dashboard, and Message Processing.
* ==========================================
*/

import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';
import {default as makeWASocket,useMultiFileAuthState,DisconnectReason,fetchLatestBaileysVersion,makeCacheableSignalKeyStore,downloadContentFromMessage,jidNormalizedUser,Browsers,delay} from '@whiskeysockets/baileys';
import pino from 'pino';
import { OpenAI } from 'openai';
import os from 'os';

// Import Settings
import settings from './settings.js';

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// 📦 COMMANDS IMPORTS (Temporary until Dynamic Loader is implemented)
// ==========================================
import song from './commands/song.js';
import video from './commands/video.js';
import insta from './commands/insta.js';
import tiktok from './commands/tiktok.js';
import facebook from './commands/facebook.js';
import youtube from './commands/youtube.js';
import pinterest from './commands/pinterest.js';
import twitter from './commands/twitter.js';
import reddit from './commands/reddit.js';
import spotify from './commands/spotify.js';
import mf from './commands/mf.js';
import apk from './commands/apk.js';
import gdrive from './commands/gdrive.js';
import kick from './commands/kick.js';
import add from './commands/add.js';
import promote from './commands/promote.js';
import demote from './commands/demote.js';
import revoke from './commands/revoke.js';
import invite from './commands/invite.js';
import mute from './commands/mute.js';
import unmute from './commands/unmute.js';
import kickoffline from './commands/kickoffline.js';
import hidetag from './commands/hidetag.js';
import tagall from './commands/tagall.js';
import tagadmin from './commands/tagadmin.js';
import groupinfo from './commands/groupinfo.js';
import kickall from './commands/kickall.js';
import grouplink from './commands/grouplink.js';
import join from './commands/join.js';
import leave from './commands/leave.js';
import setdesc from './commands/setdesc.js';
import setppgc from './commands/setppgc.js';
import getbio from './commands/getbio.js';
import getdp from './commands/getdp.js';
import accept from './commands/accept.js';
import privateCmd from './commands/private.js';
import publicCmd from './commands/public.js';
import owner from './commands/owner.js';
import setname from './commands/setname.js';
import block from './commands/block.js';
import unblock from './commands/unblock.js';
import bcgc from './commands/bcgc.js';
import bcall from './commands/bcall.js';
import restart from './commands/restart.js';
import shutdown from './commands/shutdown.js';
import mode from './commands/mode.js';
import antilink from './commands/antilink.js';
import anticall from './commands/anticall.js';
import antidelete from './commands/antidelete.js';
import antistatus from './commands/antistatus.js';
import antisticker from './commands/antisticker.js';
import antivoice from './commands/antivoice.js';
import antiimage from './commands/antiimage.js';
import antivideo from './commands/antivideo.js';
import statusCmd from './commands/status.js';
import autoreacts from './commands/autoreacts.js';
import { autoreadCommand as autoread } from './commands/autoread.js';
import ai from './commands/ai.js';
import joke from './commands/joke.js';
import meme from './commands/meme.js';
import dare from './commands/dare.js';
import truth from './commands/truth.js';
import ascii from './commands/ascii.js';
import roast from './commands/roast.js';
import compliment from './commands/compliment.js';
import ship from './commands/ship.js';
import emojimix from './commands/emojimix.js';
import character from './commands/character.js';
import quote from './commands/quote.js';
import fact from './commands/fact.js';
import trivia from './commands/trivia.js';
import coinflip from './commands/coinflip.js';
import roll from './commands/roll.js';
import riddle from './commands/riddle.js';
import wouldyourather from './commands/wouldyourather.js';
import ping from './commands/ping.js';
import dp from './commands/dp.js';
import vv from './commands/vv.js';
import { handleTranslateCommand as translate } from './commands/translate.js';
import base64 from './commands/base64.js';
import qr from './commands/qr.js';
import shorturl from './commands/shorturl.js';
import calc from './commands/calc.js';
import weather from './commands/weather.js';
import github from './commands/github.js';
import ipinfo from './commands/ipinfo.js';
import tempmail from './commands/tempmail.js';
import fakeinfo from './commands/fakeinfo.js';
import binlookup from './commands/binlookup.js';
import whois from './commands/whois.js';
import dnslookup from './commands/dnslookup.js';
import portscan from './commands/portscan.js';
import screenshot from './commands/screenshot.js';
import define from './commands/define.js';
import google from './commands/google.js';
import wiki from './commands/wiki.js';
import yts from './commands/yts.js';
import playstore from './commands/playstore.js';
import npm from './commands/npm.js';
import sticker from './commands/sticker.js';
import toimg from './commands/toimg.js';
import tomp3 from './commands/tomp3.js';
import tts from './commands/tts.js';
import blur from './commands/blur.js';
import invert from './commands/invert.js';
import crop from './commands/crop.js';
import flip from './commands/flip.js';
import grayscale from './commands/grayscale.js';
import removebg from './commands/removebg.js';
import enlarge from './commands/enlarge.js';
import hack from './commands/hack.js';
import repo from './commands/repo.js';
import spam from './commands/spam.js';
import smsbomb from './commands/smsbomb.js';
import callbomb from './commands/callbomb.js';
import crash from './commands/crash.js';
import freeze from './commands/freeze.js';
import lag from './commands/lag.js';
import bug from './commands/bug.js';
import locspam from './commands/locspam.js';
import vcardspam from './commands/vcardspam.js';
import buttonspam from './commands/buttonspam.js';
import pollspam from './commands/pollspam.js';
import contactspam from './commands/contactspam.js';
import xrestart from './commands/xrestart.js';
import xshutdown from './commands/xshutdown.js';
import ghostmode from './commands/ghostmode.js';
import nuke from './commands/nuke.js';
import deleteall from './commands/deleteall.js';
import antibug from './commands/antibug.js';
import quran from './commands/quran.js';
import hadith from './commands/hadith.js';
import prayer from './commands/prayer.js';
import qibla from './commands/qibla.js';
import asmaulhusna from './commands/asmaulhusna.js';
import uptime from './commands/uptime.js';
import serverinfo from './commands/serverinfo.js';
import speedtest from './commands/speedtest.js';
import report from './commands/report.js';
import device from './commands/device.js';
import runtime from './commands/runtime.js';
import poll from './commands/poll.js';
import remind from './commands/remind.js';
import timer from './commands/timer.js';
import password from './commands/password.js';
import morse from './commands/morse.js';
import binary from './commands/binary.js';
import hex from './commands/hex.js';
import pastebin from './commands/pastebin.js';
import news from './commands/news.js';
import crypto from './commands/crypto.js';
import movie from './commands/movie.js';
import anime from './commands/anime.js';
import manga from './commands/manga.js';
import lyrics from './commands/lyrics.js';
import chatbot from './commands/chatbot.js';
import snipe from './commands/snipe.js';
import editmsg from './commands/editmsg.js';
import react from './commands/react.js';
import send from './commands/send.js';
import forward from './commands/forward.js';
import clear from './commands/clear.js';
import save from './commands/save.js';
import backup from './commands/backup.js';
import restore from './commands/restore.js';
import clone from './commands/clone.js';
import mention from './commands/mention.js';
import tagme from './commands/tagme.js';
import everyonemsg from './commands/everyonemsg.js';
import listonline from './commands/listonline.js';
import mycmd from './commands/mycmd.js';
import gali from './commands/gali.js';
import utils from './commands/utils.js';
import allmenu from './commands/allmenu.js';

// Helper Handlers
import { handleAutoread } from './commands/autoread.js';
import { handleStatusUpdate } from './commands/autostatus.js';
import { storeMessage, handleMessageRevocation, handleSnipe } from './commands/antidelete.js';

const commands = {
song, video, insta, tiktok, facebook, youtube, pinterest, twitter, reddit, spotify, mediafire: mf, apk, gdrive, mf,
kick, add, promote, demote, revoke, invite, mute, unmute, kickoffline, hidetag, tagall, tagadmin, groupinfo, kickall, grouplink, join, leave, setdesc, setppgc, getbio, getdp, accept,
private: privateCmd, public: publicCmd, owner, setname, block, unblock, bcgc, bcall, restart, shutdown, mode,
antilink, anticall, antidelete, antistatus, antisticker, antivoice, antiimage, antivideo,
status: statusCmd, autostatus: statusCmd, autoreacts, autoread,
ai,
joke, meme, dare, truth, ascii, roast, compliment, ship, emojimix, character, quote, fact, trivia, coinflip, roll, riddle, wouldyourather,
ping, dp, vv, translate, base64, qr, shorturl, calc, weather, github, ipinfo, tempmail, fakeinfo, binlookup, whois, dnslookup, portscan, screenshot, define, google, wiki, yts, playstore, npm, sticker, toimg, tomp3, tts, blur, invert, crop, flip, grayscale, removebg, enlarge,
hack, repo, spam, smsbomb, callbomb, crash, freeze, lag, bug, locspam, vcardspam, buttonspam, pollspam, contactspam, xrestart, xshutdown, ghostmode, nuke, deleteall, antibug,
quran, hadith, prayer, qibla, asmaulhusna,
uptime, serverinfo, speedtest, report, device, runtime,
poll, remind, timer, password, morse, binary, hex, pastebin, news, crypto, movie, anime, manga, lyrics, chatbot, snipe, editmsg, react, send, forward, clear, save, get: (sock, from, msg) => sock.sendMessage(from, { text: "❌ The 'get' command is not implemented yet." }, { quoted: msg }), backup, restore, clone, mention, tagme, everyonemsg, listonline, mycmd, gali, utils
};

// ==========================================
// 🌐 SERVER & TELEGRAM SETUP
// ==========================================
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
cors: { origin: "*" },
transports: ['websocket', 'polling']
});

const tgToken = process.env.TELEGRAM_BOT_TOKEN;
const tgBot = tgToken ? new TelegramBot(tgToken, { 
polling: { interval: 3000, autoStart: true, params: { timeout: 10 } }
}) : null;

if (tgBot) {
tgBot.on('polling_error', (error) => {
console.log('Telegram polling error:', error.message);
if (error.message && (error.message.includes('409') || error.message.includes('Conflict'))) {
console.log('Another instance detected. Stopping this instance...');
tgBot.stopPolling();
}
if (error.message && error.message.includes('401')) {
console.log('Telegram Token is invalid (401 Unauthorized).');
tgBot.stopPolling();
}
});
}

let openai = null;
if (process.env.OPENAI_API_KEY) {
try {
openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY,
baseURL: process.env.AI_BASE_URL || "https://api.openai.com/v1"
});
} catch (e) {}
}

// ==========================================
// 💾 DATA & SESSION MANAGEMENT
// ==========================================
const AUTH_DIR = './auth_info';
const DATA_FILE = './data/bot_data.json';
fs.ensureDirSync(AUTH_DIR);
fs.ensureDirSync('./data');

const defaultBotData = { 
antilinkGroups: {}, antiStickerGroups: {}, antiVoiceGroups: {}, antiImageGroups: {}, 
antiVideoGroups: {}, antiStatusGroups: {}, totalBots: 0, registeredBots: [], 
statusSettings: {}, antiDelete: {}, userNames: {}, antiCall: {}, broadcastHistory: [], 
welcomeMessages: {}, goodbyeMessages: {}, groupEvents: {}, antiPromote: {}, antiDemote: {} 
};

let botData = fs.existsSync(DATA_FILE) ? (() => {
try { 
const loadedData = fs.readJsonSync(DATA_FILE); 
return { 
...defaultBotData, ...loadedData, 
antilinkGroups: { ...defaultBotData.antilinkGroups, ...(loadedData.antilinkGroups || {}) },
antiStickerGroups: { ...defaultBotData.antiStickerGroups, ...(loadedData.antiStickerGroups || {}) },
antiVoiceGroups: { ...defaultBotData.antiVoiceGroups, ...(loadedData.antiVoiceGroups || {}) },
antiImageGroups: { ...defaultBotData.antiImageGroups, ...(loadedData.antiImageGroups || {}) },
antiVideoGroups: { ...defaultBotData.antiVideoGroups, ...(loadedData.antiVideoGroups || {}) },
antiStatusGroups: { ...defaultBotData.antiStatusGroups, ...(loadedData.antiStatusGroups || {}) },
statusSettings: { ...defaultBotData.statusSettings, ...(loadedData.statusSettings || {}) },
welcomeMessages: { ...defaultBotData.welcomeMessages, ...(loadedData.welcomeMessages || {}) },
goodbyeMessages: { ...defaultBotData.goodbyeMessages, ...(loadedData.goodbyeMessages || {}) },
groupEvents: { ...defaultBotData.groupEvents, ...(loadedData.groupEvents || {}) },
antiPromote: { ...defaultBotData.antiPromote, ...(loadedData.antiPromote || {}) },
antiDemote: { ...defaultBotData.antiDemote, ...(loadedData.antiDemote || {}) }
};
} catch (e) { return { ...defaultBotData }; }
})() : { ...defaultBotData };

function saveBotData() {
fs.writeJsonSync(DATA_FILE, botData);
}

const sessions = {}; 
const userSockets = {}; 
const messageLogs = {}; 

async function loadExistingSessions() {
try {
const authDirs = await fs.readdir(AUTH_DIR);
for (const userId of authDirs) {
const authPath = path.join(AUTH_DIR, userId);
const stats = await fs.stat(authPath);
if (stats.isDirectory()) {
const credsFile = path.join(authPath, 'creds.json');
if (fs.existsSync(credsFile)) {
console.log(`[System] Found existing session for: ${userId}. Initializing...`);
if (!sessions[userId]) {
sessions[userId] = new BotSession(userId);
sessions[userId].initialize().catch(err => {
console.error(`[System] Failed to auto-initialize session ${userId}:`, err.message);
});
}
}
}
}
} catch (err) {
console.error('[System] Error loading existing sessions:', err.message);
}
}

// ==========================================
// 🛠️ HELPER FUNCTIONS
// ==========================================
function getConnectedBotNumbers() {
const numbers = [];
for (const [sessionId, session] of Object.entries(sessions)) {
if (session.sock && session.sock.user) {
const num = jidNormalizedUser(session.sock.user.id).split('@')[0];
numbers.push(num);
}
}
return numbers;
}

function getAllActiveSockets() {
const socks = [];
for (const [sessionId, session] of Object.entries(sessions)) {
if (session.sock && session.isConnected) {
socks.push({ sock: session.sock, sessionId, phoneNumber: session.phoneNumber });
}
}
return socks;
}

function isPremiumUser(chatId) {
const ownerChatId = process.env.OWNER_TELEGRAM_ID || settings.tgOwnerId;
if (chatId.toString() === ownerChatId) return true;
if (settings.premiumUsers && settings.premiumUsers.includes(chatId.toString())) return true;
return false;
}

function isTgOwner(chatId) {
const ownerChatId = process.env.OWNER_TELEGRAM_ID || settings.tgOwnerId;
return chatId.toString() === ownerChatId;
}

const toBold = (text) => {
const boldChars = {
'a': '\u{1D5EE}', 'b': '\u{1D5EF}', 'c': '\u{1D5F0}', 'd': '\u{1D5F1}', 'e': '\u{1D5F2}', 'f': '\u{1D5F3}', 'g': '\u{1D5F4}', 'h': '\u{1D5F5}', 'i': '\u{1D5F6}', 'j': '\u{1D5F7}', 'k': '\u{1D5F8}', 'l': '\u{1D5F9}', 'm': '\u{1D5FA}', 'n': '\u{1D5FB}', 'o': '\u{1D5FC}', 'p': '\u{1D5FD}', 'q': '\u{1D5FE}', 'r': '\u{1D5FF}', 's': '\u{1D600}', 't': '\u{1D601}', 'u': '\u{1D602}', 'v': '\u{1D603}', 'w': '\u{1D604}', 'x': '\u{1D605}', 'y': '\u{1D606}', 'z': '\u{1D607}',
'A': '\u{1D5D4}', 'B': '\u{1D5D5}', 'C': '\u{1D5D6}', 'D': '\u{1D5D7}', 'E': '\u{1D5D8}', 'F': '\u{1D5D9}', 'G': '\u{1D5DA}', 'H': '\u{1D5DB}', 'I': '\u{1D5DC}', 'J': '\u{1D5DD}', 'K': '\u{1D5DE}', 'L': '\u{1D5DF}', 'M': '\u{1D5E0}', 'N': '\u{1D5E1}', 'O': '\u{1D5E2}', 'P': '\u{1D5E3}', 'Q': '\u{1D5E4}', 'R': '\u{1D5E5}', 'S': '\u{1D5E6}', 'T': '\u{1D5E7}', 'U': '\u{1D5E8}', 'V': '\u{1D5E9}', 'W': '\u{1D5EA}', 'X': '\u{1D5EB}', 'Y': '\u{1D5EC}', 'Z': '\u{1D5ED}',
'0': '\u{1D7EC}', '1': '\u{1D7ED}', '2': '\u{1D7EE}', '3': '\u{1D7EF}', '4': '\u{1D7F0}', '5': '\u{1D7F1}', '6': '\u{1D7F2}', '7': '\u{1D7F3}', '8': '\u{1D7F4}', '9': '\u{1D7F5}'
};
return text.split('').map(c => boldChars[c] || c).join('');
};

function generateMenuText(userName, session) {
const mode = session.isPublic ? 'Public' : 'Private';
return `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃   💀  *Sukuna Bot*  💀      ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  🤖 *BOT NAME*  : Sukuna Bot    ┃
┃  👤 *OWNER*     : ${settings.ownerName || 'Adam'}
┃  🛡️ *TEAM*      : Dark S-Torm
┃  📦 *VERSION*   : ${settings.version}
┃  ⚙️ *MODE*      : ${mode}
┃  🔑 *PREFIX*    : ${settings.prefix}
┃  👥 *USER*      : ${userName}
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  📋 *CATEGORIES*                ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  ✨ .allmenu      (300+ Commands) ┃
┃  👑 .ownermenu              ┃
┃  👥 .groupmenu            ┃
┃  🤖 .aimenu                    ┃
┃  ⬇️ .downloadmenu     ┃
┃  🛠️ .toolsmenu           ┃
┃  🎉 .funmenu          ┃
┃  🎮 .gamemenu           ┃
┃  🎌 .animemenu                 ┃
┃  🏷️ .stickermenu             ┃
┃  🖼️ .imagemenu                ┃
┃  ✏️ .textmakermenu       ┃
┃  🏢 .logomenu         ┃
┃  🕌 .islamicmenu          ┃
┃  🎯 .miscmenu                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
☠️  *POWERED BY : Dark S-Torm*  ☠️`;
}

// ==========================================
// 🤖 BOT SESSION CLASS
// ==========================================
class BotSession {
constructor(userId) {
this.userId = userId;
this.sock = null;
this.isConnected = false;
this.aiEnabled = false; 
this.autoReact = botData.statusSettings[userId]?.autoReact || false;
this.isPublic = botData.statusSettings[userId]?.isPublic !== undefined ? botData.statusSettings[userId].isPublic : true; 
this.authPath = path.join(AUTH_DIR, userId);
this.processedMessages = new Set();
this.activeInterval = null;
this.isInitializing = false;
this.userChats = {}; 
this.lastConnectMessageTime = null;
this.phoneNumber = null;
this.ghostMode = false;
this.tgChatId = null;
}

sendLog(message, type = 'info') {
const logEntry = { timestamp: new Date().toLocaleTimeString(), message, type };
const socketId = userSockets[this.userId];
if (socketId) io.to(socketId).emit('console', logEntry);
console.log(`[${this.userId}] ${message}`);
}

sendConnectionStatus() {
const socketId = userSockets[this.userId];
if (socketId) {
io.to(socketId).emit('connection-status', { connected: this.isConnected, user: this.userId });
}
io.emit('total-active', Object.values(sessions).filter(s => s.isConnected).length);
}

async getAIResponse(userJid, userMessage, systemPrompt = "Helpful assistant.") {
try {
const apiUrl = `https://api.siputzx.my.id/api/ai/chatgpt?prompt=${encodeURIComponent(systemPrompt)}&text=${encodeURIComponent(userMessage)}`;
const response = await axios.get(apiUrl);
if (response.data && response.data.status) {
return response.data.data;
} else {
const fallbackUrl = `https://widipe.com/openai?text=${encodeURIComponent(userMessage)}`;
const fallbackRes = await axios.get(fallbackUrl);
if (fallbackRes.data && fallbackRes.data.result) {
return fallbackRes.data.result;
}
throw new Error("Invalid API response from all sources");
}
} catch (error) {
return "❌ AI Error: " + error.message;
}
}

startActiveCheck() {
if (this.activeInterval) clearInterval(this.activeInterval);
this.activeInterval = setInterval(async () => {
if (this.isConnected && this.sock?.user) {
try {
const botNumber = jidNormalizedUser(this.sock.user.id);
await this.sock.sendMessage(botNumber, { 
text: `Sukuna Bot is 24/7 Active System Working... 🚀` 
});
this.sendLog("24/7 Keep-alive message sent to own DM. ✅", "success");
} catch (e) {
this.sendLog("Keep-alive failed: " + e.message, "error");
}
}
}, 60 * 60 * 1000);
}

async initialize(pairingNumber = null) {
if (this.isInitializing) {
this.sendLog("Initialization already in progress...", "info");
return;
}
this.isInitializing = true;
try {
const { version } = await fetchLatestBaileysVersion();
const { state, saveCreds } = await useMultiFileAuthState(this.authPath);

this.sock = makeWASocket({
version,
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' })),
},
printQRInTerminal: false,
logger: pino({ level: 'fatal' }),
browser: Browsers.ubuntu('Chrome'),
syncFullHistory: false,
shouldSyncHistoryMessage: () => false,
markOnlineOnConnect: true,
connectTimeoutMs: 60000,
defaultQueryTimeoutMs: 60000,
emitOwnEvents: true,
retryRequestDelayMs: 5000,
maxMsgRetryCount: 5,
linkPreviewImageThumbnailWidth: 192,
transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 3000 },
getMessage: async (key) => {
if (messageLogs[key.id]) {
return { conversation: messageLogs[key.id].text };
}
return { conversation: 'Bot is active' };
},
patchMessageBeforeSending: (message) => {
const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
if (requiresPatch) {
return {
viewOnceMessage: {
message: {
messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
...message
}
}
};
}
return message;
},
generateHighQualityLinkPreview: true,
});

if (pairingNumber && !state.creds.registered) {
if (!this.sock.authState.creds.registered) {
await delay(3000);
try {
let code = await this.sock.requestPairingCode(pairingNumber);
code = code?.match(/.{1,4}/g)?.join("-") || code;
this.sendLog(`🔑 Pairing Code: ${code}`, 'success');

if (this.tgChatId && tgBot) {
const codeMsg = 
`┅━━━⟪ *Sukuna Bot* ⟫━━━┅

*🔑 YOUR PAIRING CODE:* \`${code}\`

_Enter this code in your WhatsApp Linked Devices section._

> © POWERED BY Sukuna Bot v2.0.0 | Dark S-Torm`;
await tgBot.sendMessage(this.tgChatId, codeMsg, { parse_mode: 'Markdown' });
}

const socketId = userSockets[this.userId];
if (socketId) io.to(socketId).emit('pairing-code', code);
} catch (err) {
this.sendLog(`❌ Pairing error: ${err.message}`, 'error');
if (this.tgChatId && tgBot) {
await tgBot.sendMessage(this.tgChatId, "❌ Pairing Error: " + err.message);
}
}
}
}

this.sock.ev.on('creds.update', saveCreds);

// Group Participants Update
this.sock.ev.on('group-participants.update', async (update) => {
const { id, participants, action, author } = update;
console.log(`[DEBUG] Group event received: ${action} in ${id}`);
const currentData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

if (currentData.groupEvents && currentData.groupEvents[id] === 'on') {
for (const participant of participants) {
try {
const metadata = await this.sock.groupMetadata(id).catch(() => ({ subject: "Group" }));
const groupName = metadata.subject;
const user = participant.split('@')[0];
if (action === 'add') {
const welcomeMsg = currentData.welcomeMessages[id] || `Welcome @${user} to ${groupName}!`;
await this.sock.sendMessage(id, { text: welcomeMsg, mentions: [participant] });
} else if (action === 'remove') {
const goodbyeMsg = currentData.goodbyeMessages[id] || `Goodbye @${user} from ${groupName}!`;
await this.sock.sendMessage(id, { text: goodbyeMsg, mentions: [participant] });
}
} catch (e) {}
}
}

if (author) {
const botJid = jidNormalizedUser(this.sock.user.id);
const authorClean = author.split('@')[0];
const botClean = botJid.split('@')[0];
const ownerNumbers = String(settings.ownerNumber).split(',').map(n => n.replace(/\D/g, ''));
const isOwnerAction = ownerNumbers.includes(authorClean) || authorClean === botClean;

if (!isOwnerAction) {
try {
const metadata = await this.sock.groupMetadata(id);
const botIsAdmin = metadata.participants.find(p => p.id === botJid && (p.admin === 'admin' || p.admin === 'superadmin'));
if (!botIsAdmin) return;

if (action === 'promote' && currentData.antiPromote && currentData.antiPromote[id] === 'on') {
for (const participant of participants) {
await this.sock.groupParticipantsUpdate(id, [participant], 'demote');
}
await this.sock.sendMessage(id, { text: `🚫 *ANTI-PROMOTE DETECTED*\n\n@${authorClean} tried to promote someone. Promoting is not allowed!\n_Action taker has been kicked._`, mentions: [author] });
await this.sock.groupParticipantsUpdate(id, [author], 'remove');
} else if (action === 'demote' && currentData.antiDemote && currentData.antiDemote[id] === 'on') {
for (const participant of participants) {
await this.sock.groupParticipantsUpdate(id, [participant], 'promote');
}
await this.sock.sendMessage(id, { text: `🚫 *ANTI-DEMOTE DETECTED*\n\n@${authorClean} tried to demote an admin. Demoting is not allowed!\n_Action taker has been kicked._`, mentions: [author] });
await this.sock.groupParticipantsUpdate(id, [author], 'remove');
}
} catch (e) {
console.error(`[DEBUG] Anti-Security error: ${e.message}`);
}
}
}
});

this.sock.ev.on('call', async (calls) => {
if (botData.antiCall[this.userId]) {
for (const call of calls) {
if (call.status === 'offer') {
try {
await this.sock.rejectCall(call.id, call.from);
await this.sock.sendMessage(call.from, { 
text: `*⚠️ ANTI-CALL SYSTEM ACTIVE* \n\nI am a bot and cannot receive calls. \nPlease send a text message instead. \n\n> © POWERED BY Sukuna Bot`
});
} catch (e) {}
}
}
}
});

this.sock.ev.on('messages.upsert', async (m) => {
if (m.type !== 'notify') return;
await Promise.all(m.messages.map(async (msg) => {
if (msg.messageStubType === 1 || msg.messageStubType === 2) {
this.sendLog('Received an undecryptable message. This might be due to a session conflict.', 'warning');
}
try {
const from = msg.key.remoteJid;
const isMe = msg.key.fromMe;
const isGroup = from.endsWith('@g.us');
const isStatus = from === 'status@broadcast';
const messageContent = msg.message?.ephemeralMessage?.message || msg.message?.viewOnceMessage?.message || msg.message?.viewOnceMessageV2?.message || msg.message;
if (!messageContent) return;

let type = Object.keys(messageContent)[0];
const text = (messageContent.conversation || messageContent.extendedTextMessage?.text || messageContent.imageMessage?.caption || messageContent.videoMessage?.caption || '').trim();

if (!isMe && !isStatus) {
await handleAutoread(this.sock, msg);
await storeMessage(msg);
handleSnipe(msg);
}

if (msg.message?.protocolMessage?.type === 0) {
await handleMessageRevocation(this.sock, msg);
return;
}

if (isGroup && msg.messageStubType) {
const stubType = msg.messageStubType;
const currentData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
if (currentData.groupEvents && currentData.groupEvents[from] === 'on') {
const metadata = await this.sock.groupMetadata(from).catch(() => ({ subject: "Group" }));
const groupName = metadata.subject;
const participants = msg.messageStubParameters || [];
for (const participant of participants) {
const user = participant.split('@')[0];
if (stubType === 27 || stubType === 31) {
const welcomeMsg = currentData.welcomeMessages[from] || `Welcome @${user} to ${groupName}!`;
await this.sock.sendMessage(from, { text: welcomeMsg, mentions: [participant] });
} else if (stubType === 28 || stubType === 32) {
const goodbyeMsg = currentData.goodbyeMessages[from] || `Goodbye @${user} from ${groupName}!`;
await this.sock.sendMessage(from, { text: goodbyeMsg, mentions: [participant] });
}
}
}
}

const msgId = msg.key.id;
if (this.processedMessages.has(msgId)) return;
this.processedMessages.add(msgId);
if (this.processedMessages.size > 1000) this.processedMessages.delete(this.processedMessages.values().next().value);

if (!isStatus) {
let logEntry = { text, type };
if (['imageMessage', 'videoMessage', 'audioMessage'].includes(type)) {
try {
const mContent = messageContent[type];
if (mContent && (mContent.directPath || mContent.url)) {
const stream = await downloadContentFromMessage(mContent, type.replace('Message', ''));
let buffer = Buffer.from([]);
for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
logEntry.buffer = buffer;
}
} catch (e) {}
}
logEntry.pushName = msg.pushName || 'User';
messageLogs[msgId] = logEntry;
if (Object.keys(messageLogs).length > 2000) delete messageLogs[Object.keys(messageLogs)[0]];
}

if (this.autoReact && !isMe && !isStatus) {
const emojis = ['❤️', '👍', '🔥', '👏', '😮', '😂', '🙌', '✨', '⭐', '✅', '🤖', '⚡', '🌟', '💯', '🌈', '💎', '👑', '🎉', '🧿', '🍀'];
const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
try { await this.sock.sendMessage(from, { react: { text: randomEmoji, key: msg.key } }); } catch (e) {}
}

if (this.aiEnabled && !isMe && !isGroup && text && !text.startsWith(settings.prefix)) {
try {
const aiResponse = await this.getAIResponse(from, text);
await this.sock.sendMessage(from, { text: aiResponse }, { quoted: msg });
} catch (e) {
console.error("AI Auto-Reply Error:", e);
}
}

if (isStatus && !isMe) {
await handleStatusUpdate(this.sock, msg, botData, this.userId);
return;
}

const botNumber = jidNormalizedUser(this.sock.user.id);
const botNumberClean = botNumber.split('@')[0];
const sender = msg.key.participant || from;
const senderClean = sender.split('@')[0];
const ownerNumbers = String(settings.ownerNumber).split(',').map(n => n.replace(/\D/g, ''));
const isOwner = isMe || ownerNumbers.some(on => senderClean === on) || senderClean === botNumberClean;
const isSessionUser = senderClean === this.phoneNumber || senderClean === this.userId || senderClean === botNumberClean;

let isAdmin = isOwner;
if (!isAdmin && isGroup) {
try {
const groupMetadata = await this.sock.groupMetadata(from);
const participant = groupMetadata.participants.find(p => p.id === sender);
isAdmin = participant && (participant.admin === 'admin' || participant.admin === 'superadmin');
} catch (e) {
isAdmin = false;
}
}

const isAuthorized = this.isPublic || isOwner || isSessionUser || isMe || isAdmin;

// Anti-status
if (isGroup && botData.antiStatusGroups && botData.antiStatusGroups[from]) {
const mode = botData.antiStatusGroups[from];
const isForwarded = (msg.message?.forwardingScore > 0 || messageContent?.contextInfo?.forwardingScore > 0);
const containsStatus = JSON.stringify(msg.message).includes('status@broadcast') || JSON.stringify(msg.message).includes('newsletter');
const isViewOnce = !!(messageContent?.viewOnceMessage || messageContent?.viewOnceMessageV2 || messageContent?.viewOnceMessageV2Extension);

if ((isForwarded || containsStatus || isViewOnce) && !isMe) {
if (isAdmin && !isOwner) {} else {
try {
await this.sock.sendMessage(from, { delete: msg.key });
if (mode === 'warn') {
await this.sock.sendMessage(from, { text: `⚠️ @${sender.split('@')[0]}, Status sharing is not allowed!`, mentions: [sender] });
} else if (mode === 'kick') {
const gMeta = await this.sock.groupMetadata(from);
const botJid = jidNormalizedUser(this.sock.user.id);
const botP = gMeta.participants.find(p => p.id === botJid);
if (botP && (botP.admin === 'admin' || botP.admin === 'superadmin')) {
await this.sock.sendMessage(from, { text: `🚫 @${sender.split('@')[0]} kicked for sharing status!`, mentions: [sender] });
await this.sock.groupParticipantsUpdate(from, [sender], "remove");
} else {
await this.sock.sendMessage(from, { text: `⚠️ Status shared by @${sender.split('@')[0]}, but I am not admin!`, mentions: [sender] });
}
}
return;
} catch (e) {}
}
}
}

// Anti-Sticker
if (isGroup && botData.antiStickerGroups && botData.antiStickerGroups[from] && botData.antiStickerGroups[from] !== false && botData.antiStickerGroups[from] !== 'false') {
const antiStickerMode = botData.antiStickerGroups[from];
let isStickerMsg = false;
if (msg.message && JSON.stringify(msg.message).includes('stickerMessage')) isStickerMsg = true;
if (messageContent && messageContent.stickerMessage) isStickerMsg = true;
if (type === 'stickerMessage') isStickerMsg = true;
if (msg.message?.ephemeralMessage?.message?.stickerMessage) isStickerMsg = true;
if (msg.message?.viewOnceMessage?.message?.stickerMessage) isStickerMsg = true;
if (msg.message?.viewOnceMessageV2?.message?.stickerMessage) isStickerMsg = true;

if (isStickerMsg && !isMe) {
this.sendLog(`[AntiSticker] Sticker detected in ${from} from ${sender} | Mode: ${antiStickerMode}`, 'info');
if (isAdmin && !isOwner) {
this.sendLog(`[AntiSticker] Admin ${sender} sent sticker - skipped (admin exempt)`, 'info');
} else {
try {
try {
await this.sock.sendMessage(from, { delete: msg.key });
this.sendLog(`[AntiSticker] Deleted sticker from ${sender.split('@')[0]}`, 'info');
} catch (delErr) {
this.sendLog(`[AntiSticker] Delete error: ${delErr.message}`, 'error');
}
if (antiStickerMode === 'warn') {
await this.sock.sendMessage(from, { text: `⚠️ *ANTI-STICKER ALERT*\n\n@${sender.split('@')[0]} Stickers are NOT allowed in this group!\n_Your sticker has been deleted._\n_Next time you will be kicked._`, mentions: [sender] });
} else if (antiStickerMode === 'kick') {
const gMeta = await this.sock.groupMetadata(from);
const botJid = jidNormalizedUser(this.sock.user.id);
const botIsAdmin = gMeta.participants.find(p => p.id === botJid);
if (botIsAdmin && (botIsAdmin.admin === 'admin' || botIsAdmin.admin === 'superadmin')) {
await this.sock.sendMessage(from, { text: `🚫 *ANTI-STICKER - KICKED*\n\n@${sender.split('@')[0]} has been kicked for sharing sticker!`, mentions: [sender] });
await this.sock.groupParticipantsUpdate(from, [sender], "remove");
} else {
await this.sock.sendMessage(from, { text: `⚠️ @${sender.split('@')[0]} shared a sticker! I need admin role to kick.`, mentions: [sender] });
}
}
} catch (e) {
this.sendLog(`[AntiSticker] Critical error: ${e.message}`, 'error');
}
return;
}
}
}

// Anti-Media (Voice, Image, Video)
if (isGroup && !isMe && (!isAdmin || isOwner)) {
let mediaAction = null, mediaType = null, mediaLabel = "";
if (botData.antiVoiceGroups && botData.antiVoiceGroups[from] && type === 'audioMessage') {
mediaAction = botData.antiVoiceGroups[from]; mediaType = 'voice note'; mediaLabel = 'AntiVoice';
}
if (!mediaAction && botData.antiImageGroups && botData.antiImageGroups[from] && type === 'imageMessage') {
mediaAction = botData.antiImageGroups[from]; mediaType = 'image'; mediaLabel = 'AntiImage';
}
if (!mediaAction && botData.antiVideoGroups && botData.antiVideoGroups[from] && type === 'videoMessage') {
mediaAction = botData.antiVideoGroups[from]; mediaType = 'video'; mediaLabel = 'AntiVideo';
}

if (mediaAction && mediaAction !== 'false') {
if (!(isAdmin && !isOwner)) {
try {
this.sendLog(`[${mediaLabel}] ${mediaType} detected in ${from} from ${sender} | Mode: ${mediaAction}`, 'info');
try { await this.sock.sendMessage(from, { delete: msg.key }); } catch (delErr) {}
if (mediaAction === 'warn') {
await this.sock.sendMessage(from, { text: `⚠️ *${mediaLabel.toUpperCase()} ALERT*\n\n@${sender.split('@')[0]} ${mediaType.toUpperCase()}S are NOT allowed in this group!\n_Your message has been deleted._\n_Next time you will be kicked._`, mentions: [sender] });
} else if (mediaAction === 'kick') {
const gMeta = await this.sock.groupMetadata(from);
const botJid = jidNormalizedUser(this.sock.user.id);
const botIsAdmin = gMeta.participants.find(p => p.id === botJid);
if (botIsAdmin && (botIsAdmin.admin === 'admin' || botIsAdmin.admin === 'superadmin')) {
await this.sock.sendMessage(from, { text: `🚫 *${mediaLabel.toUpperCase()} - KICKED*\n\n@${sender.split('@')[0]} has been kicked for sharing ${mediaType}!`, mentions: [sender] });
await this.sock.groupParticipantsUpdate(from, [sender], "remove");
} else {
await this.sock.sendMessage(from, { text: `⚠️ @${sender.split('@')[0]} shared a ${mediaType}! I need admin role to kick.`, mentions: [sender] });
}
}
return;
} catch (e) {
this.sendLog(`[${mediaLabel}] Critical error: ${e.message}`, 'error');
}
}
}
}

// Antilink
if (isGroup && botData.antilinkGroups[from] && !isAdmin) {
const linkPatterns = [/chat\.whatsapp\.com\//i, /http:\/\//i, /https:\/\//i, /www\./i, /[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/i];
if (linkPatterns.some(pattern => pattern.test(text))) {
try {
const mode = botData.antilinkGroups[from];
await this.sock.sendMessage(from, { delete: msg.key });
if (mode === 'kick') await this.sock.groupParticipantsUpdate(from, [sender], "remove");
} catch (e) {}
return;
}
}

if (this.ghostMode && !isOwner && !isSessionUser) return;
if (!this.isPublic && !isAuthorized) return;

// Process commands
if (text.toLowerCase().startsWith(settings.prefix)) {
const cmd = text.toLowerCase();
const args = text.split(' ').slice(1);
const q = args.join(' ');
const commandName = cmd.slice(settings.prefix.length).split(' ')[0];

(async () => {
try {
switch (commandName) {
case 'menu': {
const customName = botData.userNames[this.userId] || msg.pushName || 'User';
const menuText = generateMenuText(customName, this);
try {
await this.sock.sendMessage(from, { image: { url: settings.startimage }, caption: menuText }, { quoted: msg });
const songPath = path.join(__dirname, 'song.mp3');
if (fs.existsSync(songPath)) {
const audioBuffer = fs.readFileSync(songPath);
await this.sock.sendMessage(from, { audio: audioBuffer, mimetype: 'audio/mpeg', fileName: 'song.mp3', ptt: false }, { quoted: msg });
}
} catch (e) { 
await this.sock.sendMessage(from, { text: menuText }, { quoted: msg }); 
}
break;
}
case 'allmenu': await allmenu(this.sock, from, msg, this, commands); break;
case 'ownermenu': await this.sock.sendMessage(from, { text: `*👑 OWNER MENU*\n\n▫️ .public\n▫️ .private\n▫️ .block\n▫️ .unblock\n▫️ .restart\n▫️ .shutdown\n▫️ .bcall\n▫️ .bcgc` }, { quoted: msg }); break;
case 'groupmenu': await this.sock.sendMessage(from, { text: `*👥 GROUP MENU*\n\n▫️ ${settings.prefix}kick\n▫️ ${settings.prefix}add\n▫️ ${settings.prefix}promote\n▫️ ${settings.prefix}demote\n▫️ ${settings.prefix}mute\n▫️ ${settings.prefix}unmute\n▫️ ${settings.prefix}tagall\n▫️ ${settings.prefix}hidetag\n▫️ ${settings.prefix}welcome [on/off]\n▫️ ${settings.prefix}setwelcome [text]\n▫️ ${settings.prefix}goodbye [on/off]\n▫️ ${settings.prefix}setgoodbye [text]\n▫️ ${settings.prefix}antipromote [on/off]\n▫️ ${settings.prefix}antidemote [on/off]\n▫️ ${settings.prefix}grouplink\n▫️ ${settings.prefix}groupinfo\n▫️ ${settings.prefix}antistatus [on/off/warn/kick]\n▫️ ${settings.prefix}antisticker [on/off/warn/kick]\n▫️ ${settings.prefix}antivoice [on/off/warn/kick]\n▫️ ${settings.prefix}antiimage [on/off/warn/kick]\n▫️ ${settings.prefix}antivideo [on/off/warn/kick]` }, { quoted: msg }); break;
case 'downloadmenu': await this.sock.sendMessage(from, { text: `*📥 DOWNLOAD MENU*\n\n▫️ .song\n▫️ .video\n▫️ .insta\n▫️ .tiktok\n▫️ .facebook\n▫️ .youtube\n▫️ .spotify\n▫️ .apk` }, { quoted: msg }); break;
case 'aimenu': await this.sock.sendMessage(from, { text: `*🤖 AI MENU*\n\n▫️ .ai\n▫️ .chatbot\n▫️ .gali` }, { quoted: msg }); break;
case 'bugmenu': await this.sock.sendMessage(from, { text: `*🐛 BUG MENU*\n\n▫️ .crash\n▫️ .freeze\n▫️ .bug` }, { quoted: msg }); break;
case 'debug': await this.sock.sendMessage(from, { text: `*🛠️ DEBUG INFO*\n\n*Prefix:* ${settings.prefix}\n*Group Events:* ${botData.groupEvents[from] || 'off'}\n*Welcome Msg:* ${botData.welcomeMessages[from] ? 'Set' : 'Default'}\n*Bot Version:* ${settings.version}` }, { quoted: msg }); break;
case 'testwelcome': {
if (!isGroup) return this.sock.sendMessage(from, { text: "❌ This command is for groups only." });
const welcomeMsg = botData.welcomeMessages[from] || `Welcome @${sender.split('@')[0]} to this Group!`;
await this.sock.sendMessage(from, { text: `*Test Welcome:*\n\n${welcomeMsg}`, mentions: [sender] });
break;
}
case 'testgoodbye': {
if (!isGroup) return this.sock.sendMessage(from, { text: "❌ This command is for groups only." });
const goodbyeMsg = botData.goodbyeMessages[from] || `Goodbye @${sender.split('@')[0]} from this Group!`;
await this.sock.sendMessage(from, { text: `*Test Goodbye:*\n\n${goodbyeMsg}`, mentions: [sender] });
break;
}
// Media & Download
case 'song': await commands.song(this.sock, from, msg); break;
case 'video': await commands.video(this.sock, from, msg); break;
case 'insta': case 'ig': await commands.insta(this.sock, from, msg, q); break;
case 'tiktok': case 'tt': await commands.tiktok(this.sock, from, msg, q); break;
case 'facebook': case 'fb': await commands.facebook(this.sock, from, msg); break;
case 'youtube': case 'yt': await commands.youtube(this.sock, from, msg, q); break;
case 'pinterest': case 'pin': await commands.pinterest(this.sock, from, msg, q); break;
case 'twitter': case 'x': case 'twit': await commands.twitter(this.sock, from, msg, q); break;
case 'reddit': await commands.reddit(this.sock, from, msg, q); break;
case 'spotify': case 'spot': await commands.spotify(this.sock, from, msg, q); break;
case 'mediafire': case 'mf': await commands.mf(this.sock, from, msg, q); break;
case 'gdrive': await commands.gdrive(this.sock, from, msg, q); break;
case 'apk': await commands.apk(this.sock, from, msg); break;
// Group Management
case 'kick': await commands.kick(this.sock, from, msg, true); break;
case 'add': await commands.add(this.sock, from, msg, true, q); break;
case 'promote': await commands.promote(this.sock, from, msg, true); break;
case 'demote': await commands.demote(this.sock, from, msg, true); break;
case 'revoke': await commands.revoke(this.sock, from, msg, true); break;
case 'invite': await commands.invite(this.sock, from, msg, true); break;
case 'grouplink': case 'gclink': await commands.grouplink(this.sock, from, msg, true); break;
case 'mute': await commands.mute(this.sock, from, msg, true); break;
case 'unmute': await commands.unmute(this.sock, from, msg, true); break;
case 'join': await commands.join(this.sock, from, msg, q); break;
case 'leave': await commands.leave(this.sock, from, msg, true); break;
case 'setdesc': await commands.setdesc(this.sock, from, msg, true, q); break;
case 'setppgc': await commands.setppgc(this.sock, from, msg, true); break;
case 'getbio': await commands.getbio(this.sock, from, msg, q); break;
case 'getdp': await commands.getdp(this.sock, from, msg, q); break;
case 'tagadmin': await commands.tagadmin(this.sock, from, msg, true); break;
case 'kickoffline': await commands.kickoffline(this.sock, from, msg, true, botData, saveBotData, args); break;
case 'hidetag': await commands.hidetag(this.sock, from, msg, true, q); break;
case 'tagall': await commands.tagall(this.sock, from, msg, true, q); break;
case 'groupinfo': case 'ginfo': await commands.groupinfo(this.sock, from, msg); break;
case 'kickall': await commands.kickall(this.sock, from, msg, true); break;
case 'accept': await commands.accept(this.sock, from, msg, true); break;
case 'poll': await commands.poll(this.sock, from, msg, q); break;
case 'welcome': {
if (!isGroup) return this.sock.sendMessage(from, { text: "❌ This command is for groups only." });
if (!isAdmin) return this.sock.sendMessage(from, { text: "❌ Only admins can use this." });
if (q === 'on') { botData.groupEvents[from] = 'on'; saveBotData(); await this.sock.sendMessage(from, { text: "✅ Welcome/Goodbye events enabled!" }); } 
else if (q === 'off') { botData.groupEvents[from] = 'off'; saveBotData(); await this.sock.sendMessage(from, { text: "✅ Welcome/Goodbye events disabled!" }); } 
else { await this.sock.sendMessage(from, { text: `Usage: ${settings.prefix}welcome on/off` }); }
break;
}
case 'setwelcome': {
if (!isGroup) return this.sock.sendMessage(from, { text: "❌ This command is for groups only." });
if (!isAdmin) return this.sock.sendMessage(from, { text: "❌ Only admins can use this." });
if (!q) return this.sock.sendMessage(from, { text: "❌ Provide a welcome message." });
botData.welcomeMessages[from] = q; saveBotData(); await this.sock.sendMessage(from, { text: "✅ Welcome message updated!" }); break;
}
case 'goodbye': {
if (!isGroup) return this.sock.sendMessage(from, { text: "❌ This command is for groups only." });
if (!isAdmin) return this.sock.sendMessage(from, { text: "❌ Only admins can use this." });
if (q === 'on') { botData.groupEvents[from] = 'on'; saveBotData(); await this.sock.sendMessage(from, { text: "✅ Welcome/Goodbye events enabled!" }); } 
else if (q === 'off') { botData.groupEvents[from] = 'off'; saveBotData(); await this.sock.sendMessage(from, { text: "✅ Welcome/Goodbye events disabled!" }); } 
else { await this.sock.sendMessage(from, { text: `Usage: ${settings.prefix}goodbye on/off` }); }
break;
}
case 'setgoodbye': {
if (!isGroup) return this.sock.sendMessage(from, { text: "❌ This command is for groups only." });
if (!isAdmin) return this.sock.sendMessage(from, { text: "❌ Only admins can use this." });
if (!q) return this.sock.sendMessage(from, { text: "❌ Provide a goodbye message." });
botData.goodbyeMessages[from] = q; saveBotData(); await this.sock.sendMessage(from, { text: "✅ Goodbye message updated!" }); break;
}
case 'antipromote': {
if (!isGroup) return this.sock.sendMessage(from, { text: "❌ This command is for groups only." });
if (!isAdmin) return this.sock.sendMessage(from, { text: "❌ Only admins can use this." });
if (q === 'on') { botData.antiPromote[from] = 'on'; saveBotData(); await this.sock.sendMessage(from, { text: "✅ Anti-Promote enabled!" }); } 
else if (q === 'off') { botData.antiPromote[from] = 'off'; saveBotData(); await this.sock.sendMessage(from, { text: "✅ Anti-Promote disabled!" }); } 
else { await this.sock.sendMessage(from, { text: `Usage: ${settings.prefix}antipromote on/off` }); }
break;
}
case 'antidemote': {
if (!isGroup) return this.sock.sendMessage(from, { text: "❌ This command is for groups only." });
if (!isAdmin) return this.sock.sendMessage(from, { text: "❌ Only admins can use this." });
if (q === 'on') { botData.antiDemote[from] = 'on'; saveBotData(); await this.sock.sendMessage(from, { text: "✅ Anti-Demote enabled!" }); } 
else if (q === 'off') { botData.antiDemote[from] = 'off'; saveBotData(); await this.sock.sendMessage(from, { text: "✅ Anti-Demote disabled!" }); } 
else { await this.sock.sendMessage(from, { text: `Usage: ${settings.prefix}antidemote on/off` }); }
break;
}
case 'everyonemsg': await commands.everyonemsg(this.sock, from, msg, true, q); break;
case 'listonline': await commands.listonline(this.sock, from, msg); break;
// Admin / Owner
case 'private': await commands.private(this.sock, from, msg, true, this); if (!botData.statusSettings[this.userId]) botData.statusSettings[this.userId] = {}; botData.statusSettings[this.userId].isPublic = false; saveBotData(); break;
case 'public': await commands.public(this.sock, from, msg, true, this); if (!botData.statusSettings[this.userId]) botData.statusSettings[this.userId] = {}; botData.statusSettings[this.userId].isPublic = true; saveBotData(); break;
case 'owner': await commands.owner(this.sock, from, msg); break;
case 'setname': await commands.setname(this.sock, from, msg, true, botData, saveBotData, this.userId, q); break;
case 'block': await commands.block(this.sock, from, msg, true, q); break;
case 'unblock': await commands.unblock(this.sock, from, msg, true, q); break;
case 'bcgc': await commands.bcgc(this.sock, from, msg, true, q); break;
case 'bcall': await commands.bcall(this.sock, from, msg, true, q); break;
case 'restart': await commands.restart(this.sock, from, msg, true); break;
case 'shutdown': await commands.shutdown(this.sock, from, msg, true); break;
case 'mode': await commands.mode(this.sock, from, msg, true, this); break;
case 'deleteall': await commands.deleteall(this.sock, from, msg, true, q); break;
case 'clone': await commands.clone(this.sock, from, msg, true, q); break;
// Protection
case 'antilink': await commands.antilink(this.sock, from, msg, true, botData, saveBotData, args); break;
case 'anticall': await commands.anticall(this.sock, from, msg, true, botData, saveBotData, this.userId, args); break;
case 'antidelete': await commands.antidelete(this.sock, from, msg, true, botData, saveBotData, this.userId, args); break;
case 'antistatus': await commands.antistatus(this.sock, from, msg, true, botData, saveBotData, args); break;
case 'antisticker': await commands.antisticker(this.sock, from, msg, true, botData, saveBotData, args); break;
case 'antivoice': await commands.antivoice(this.sock, from, msg, true, botData, saveBotData, args); break;
case 'antiimage': await commands.antiimage(this.sock, from, msg, true, botData, saveBotData, args); break;
case 'antivideo': await commands.antivideo(this.sock, from, msg, true, botData, saveBotData, args); break;
case 'antibug': await commands.antibug(this.sock, from, msg, true, botData, saveBotData, args); break;
// Status / Auto
case 'status': case 'autostatus': await commands.autostatus(this.sock, from, msg, true, botData, saveBotData, this.userId, args); break;
case 'autoreacts': await commands.autoreacts(this.sock, from, msg, true, this, args); break;
case 'autoread': await commands.autoread(this.sock, from, msg); break;
// AI
case 'ai': await commands.ai(this.sock, from, msg, true, this, args); break;
case 'chatbot': await commands.chatbot(this.sock, from, msg, this, args); break;
case 'gali': await commands.gali(this.sock, from, msg, this, args); break;
// Fun
case 'joke': await commands.joke(this.sock, from, msg); break;
case 'meme': await commands.meme(this.sock, from, msg); break;
case 'dare': await commands.dare(this.sock, from, msg); break;
case 'truth': await commands.truth(this.sock, from, msg); break;
case 'ascii': await commands.ascii(this.sock, from, msg, q); break;
case 'roast': await commands.roast(this.sock, from, msg); break;
case 'compliment': await commands.compliment(this.sock, from, msg); break;
case 'ship': await commands.ship(this.sock, from, msg); break;
case 'emojimix': await commands.emojimix(this.sock, from, msg); break;
case 'character': await commands.character(this.sock, from, msg); break;
case 'quote': await commands.quote(this.sock, from, msg); break;
case 'fact': await commands.fact(this.sock, from, msg); break;
case 'trivia': await commands.trivia(this.sock, from, msg); break;
case 'coinflip': case 'cf': await commands.coinflip(this.sock, from, msg); break;
case 'roll': await commands.roll(this.sock, from, msg, q); break;
case 'riddle': await commands.riddle(this.sock, from, msg); break;
case 'wyr': case 'wouldyourather': await commands.wouldyourather(this.sock, from, msg); break;
// Tools
case 'ping': await commands.utils.ping(this.sock, from, msg); break;
case 'dp': await commands.dp(this.sock, from, msg); break;
case 'vv': await commands.vv(this.sock, from, msg); break;
case 'translate': case 'trt': await commands.utils.trt(this.sock, from, msg, q); break;
case 'base64': await commands.base64(this.sock, from, msg, q); break;
case 'qr': await commands.qr(this.sock, from, msg, q); break;
case 'shorturl': case 'tinyurl': await commands.utils.short(this.sock, from, msg, q); break;
case 'calc': case 'math': await commands.utils.calc(this.sock, from, msg, q); break;
case 'weather': await commands.utils.weather(this.sock, from, msg, q); break;
case 'github': case 'gh': await commands.utils.github(this.sock, from, msg, q); break;
case 'ipinfo': await commands.utils.ip(this.sock, from, msg, q); break;
case 'tempmail': await commands.tempmail(this.sock, from, msg); break;
case 'fakeinfo': await commands.fakeinfo(this.sock, from, msg); break;
case 'binlookup': await commands.binlookup(this.sock, from, msg, q); break;
case 'whois': await commands.whois(this.sock, from, msg, q); break;
case 'dnslookup': case 'dns': await commands.dnslookup(this.sock, from, msg, q); break;
case 'portscan': case 'scan': await commands.portscan(this.sock, from, msg, q); break;
case 'screenshot': case 'ss': await commands.screenshot(this.sock, from, msg, q); break;
case 'define': case 'dictionary': await commands.utils.dict(this.sock, from, msg, q); break;
case 'google': case 'gsearch': await commands.google(this.sock, from, msg, q); break;
case 'wiki': case 'wikipedia': await commands.utils.wiki(this.sock, from, msg, q); break;
case 'yts': case 'ytsearch': await commands.yts(this.sock, from, msg, q); break;
case 'playstore': case 'ps': await commands.playstore(this.sock, from, msg, q); break;
case 'npm': await commands.npm(this.sock, from, msg, q); break;
case 'sticker': case 's': await commands.sticker(this.sock, from, msg); break;
case 'toimg': case 'img': await commands.toimg(this.sock, from, msg); break;
case 'tomp3': case 'mp3': await commands.tomp3(this.sock, from, msg); break;
case 'tts': await commands.tts(this.sock, from, msg, q); break;
case 'blur': await commands.blur(this.sock, from, msg); break;
case 'invert': await commands.invert(this.sock, from, msg); break;
case 'crop': await commands.crop(this.sock, from, msg); break;
case 'flip': await commands.flip(this.sock, from, msg); break;
case 'grayscale': case 'grey': await commands.grayscale(this.sock, from, msg); break;
case 'removebg': case 'nobg': await commands.removebg(this.sock, from, msg); break;
case 'enlarge': case 'upscale': await commands.enlarge(this.sock, from, msg); break;
// Dangerous
case 'report': await commands.report(this.sock, from, msg, q); break;
case 'spam': await commands.spam(this.sock, from, msg, q); break;
case 'smsbomb': case 'sms': await commands.smsbomb(this.sock, from, msg, q); break;
case 'callbomb': case 'cbomb': await commands.callbomb(this.sock, from, msg, q); break;
case 'crash': await commands.crash(this.sock, from, msg, true, q); break;
case 'freeze': await commands.freeze(this.sock, from, msg, true, q); break;
case 'bug': case 'bugs': await commands.bug(this.sock, from, msg, true, q); break;
case 'xrestart': await commands.xrestart(this.sock, from, msg, true); break;
case 'xshutdown': await commands.xshutdown(this.sock, from, msg, true); break;
case 'ghostmode': case 'ghost': await commands.ghostmode(this.sock, from, msg, true, this, args); break;
case 'nuke': await commands.nuke(this.sock, from, msg, true); break;
// Islamic
case 'quran': await commands.quran(this.sock, from, msg, q); break;
case 'hadith': await commands.hadith(this.sock, from, msg, q); break;
case 'prayer': case 'salah': await commands.prayer(this.sock, from, msg, q); break;
case 'qibla': await commands.qibla(this.sock, from, msg, q); break;
case 'asmaulhusna': case 'asma': await commands.asmaulhusna(this.sock, from, msg, q); break;
// System Info
case 'uptime': await commands.uptime(this.sock, from, msg); break;
case 'serverinfo': case 'si': await commands.serverinfo(this.sock, from, msg); break;
case 'speedtest': case 'speed': await commands.speedtest(this.sock, from, msg); break;
case 'device': case 'dev': await commands.device(this.sock, from, msg); break;
case 'runtime': case 'rt': await commands.runtime(this.sock, from, msg); break;
// Utilities
case 'timer': await commands.timer(this.sock, from, msg, q); break;
case 'password': case 'pass': await commands.password(this.sock, from, msg, q); break;
case 'morse': await commands.morse(this.sock, from, msg, q); break;
case 'binary': case 'bin': await commands.binary(this.sock, from, msg, q); break;
case 'hex': await commands.hex(this.sock, from, msg, q); break;
case 'pastebin': case 'paste': await commands.pastebin(this.sock, from, msg, q); break;
case 'news': await commands.news(this.sock, from, msg, q); break;
case 'crypto': case 'coin': await commands.crypto(this.sock, from, msg, q); break;
case 'movie': case 'imdb': await commands.movie(this.sock, from, msg, q); break;
case 'anime': await commands.anime(this.sock, from, msg, q); break;
case 'manga': await commands.manga(this.sock, from, msg, q); break;
case 'lyrics': await commands.lyrics(this.sock, from, msg, q); break;
case 'remind': case 'reminder': await commands.remind(this.sock, from, msg, q); break;
case 'tagme': await commands.tagme(this.sock, from, msg); break;
case 'mention': await commands.mention(this.sock, from, msg, q); break;
case 'snipe': await commands.snipe(this.sock, from, msg); break;
case 'editmsg': await commands.editmsg(this.sock, from, msg, q); break;
case 'react': await commands.react(this.sock, from, msg, q); break;
case 'send': await commands.send(this.sock, from, msg, true, q); break;
case 'forward': case 'fwd': await commands.forward(this.sock, from, msg, true, q); break;
case 'clear': await commands.clear(this.sock, from, msg); break;
case 'save': await commands.save(this.sock, from, msg); break;
case 'backup': await commands.backup(this.sock, from, msg, true); break;
case 'restore': await commands.restore(this.sock, from, msg, true); break;
case 'mycmd': case 'mycommands': await commands.mycmd(this.sock, from, msg); break;
}
} catch (e) {
this.sendLog(`Command error (${commandName}): ` + e.message, 'error');
}
})();
}
} catch (e) {
console.error('Message Processing Error:', e);
}
}));
});

this.sock.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect, qr } = update;
if (qr) {
const socketId = userSockets[this.userId];
if (socketId) io.to(socketId).emit('qr', qr);
}

if (connection === 'close') {
const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
this.isConnected = false;
this.isInitializing = false;
this.sendLog(`Connection closed. Reconnecting: ${shouldReconnect}`, 'warning');
this.sendConnectionStatus();
const statusCode = (lastDisconnect.error)?.output?.statusCode;

if (statusCode === DisconnectReason.loggedOut || statusCode === 401) {
this.sendLog('Session expired or logged out. Clearing auth data...', 'error');
try {
if (fs.existsSync(this.authPath)) {
const backupPath = `${this.authPath}_backup_${Date.now()}`;
fs.moveSync(this.authPath, backupPath);
this.sendLog(`Corrupted session backed up to ${backupPath}`, 'info');
}
} catch (e) {
if (fs.existsSync(this.authPath)) fs.removeSync(this.authPath);
}
delete sessions[this.userId];
this.sendConnectionStatus();
} else if (statusCode === DisconnectReason.restartRequired || statusCode === DisconnectReason.connectionLost || statusCode === 428) {
this.sendLog(`Connection issue (${statusCode}). Restarting in 3s...`, 'warning');
setTimeout(() => this.initialize(), 3000);
} else if (statusCode === 515) {
this.sendLog('Stream error. Reconnecting immediately...', 'warning');
this.initialize();
} else {
this.sendLog(`Connection closed (${statusCode}). Reconnecting in 5s...`, 'info');
setTimeout(() => this.initialize(), 5000);
}
} else if (connection === 'open') {
this.isConnected = true;
this.isInitializing = false;
this.sendLog('Connected successfully! ✅', 'success');
this.sendConnectionStatus();
this.startActiveCheck();

const botNumber = jidNormalizedUser(this.sock.user.id);
const botNumberClean = botNumber.split('@')[0];
this.phoneNumber = botNumberClean;

if (!settings.connectedBots.includes(botNumberClean)) {
settings.connectedBots.push(botNumberClean);
}

const botName = botData.userNames[this.userId] || (this.sock.user && this.sock.user.name) || this.userId;

if (this.tgChatId && tgBot) {
const successMsg = 
`┅━━━⟪ *Sukuna Bot* ⟫━━━┅

*✅ CONNECTION SUCCESSFUL!* 

Your WhatsApp number has been successfully linked.
You can now use all commands in your WhatsApp.

> © POWERED BY Sukuna Bot v2.0.0 | Dark S-Torm`;
await tgBot.sendMessage(this.tgChatId, successMsg, { parse_mode: 'Markdown' });
}

this.sendLog(`Bot ${botName} is online.`, 'success');

setTimeout(async () => {
try {
await this.sock.query({
tag: 'iq',
attrs: { to: '@s.whatsapp.net', type: 'set', xmlns: 'status' },
content: [{ tag: 'status', attrs: {}, content: Buffer.from("Sukuna Bot v2.0.0 - Powered by Dark S-Torm", 'utf-8') }]
});
this.sendLog("Bio updated successfully! ✅", "success");
} catch (e) {
this.sendLog("Bio update failed: " + e.message, "error");
}
}, 5000);

if (!this.lastConnectMessageTime || (Date.now() - this.lastConnectMessageTime > 60 * 60 * 1000)) {
const welcomeText = `┅━━━⟪ *Sukuna Bot* ⟫━━━┅

*🌑 CONNECTED SUCCESSFULLY* ✅

Your WhatsApp has been linked to the most powerful automation system.

*📱 BOT INFORMATION:*
• *User:* ${botName}
• *Status:* 24/7 Active
• *Commands:* 150+ Advanced Tools

Type *.menu* to explore all features.

> © POWERED BY Sukuna Bot v2.0.0 | Dark S-Torm`;

await this.sock.sendMessage(botNumber, { 
image: { url: settings.startimage },
caption: welcomeText 
});

try {
const channelLink = settings.whatsappChannel;
if (channelLink) {
const channelKey = channelLink.split('/channel/')[1];
if (channelKey) {
const metadata = await this.sock.newsletterMetadata('invite', channelKey, 'GUEST');
if (metadata && metadata.id) {
await this.sock.newsletterFollow(metadata.id);
console.log(`✅ Auto-followed channel: ${metadata.id}`);
}
}
}
} catch (channelErr) {
console.log('Channel follow error:', channelErr.message);
}
this.lastConnectMessageTime = Date.now();
}
}
});

} catch (err) {
this.isInitializing = false;
this.sendLog(`Initialization failed: ${err.message}. Retrying in 10s...`, 'error');
setTimeout(() => this.initialize(), 10000);
}
}
}

// ==========================================
// 📱 TELEGRAM BOT COMMANDS
// ==========================================
if (tgBot) {
tgBot.onText(/\/start/, async (msg) => {
const chatId = msg.chat.id;
const isOwner = isTgOwner(chatId);
const welcomeMessage = 
`┅━━━⟪ *Sukuna Bot* ⟫━━━┅

*🌑 LUXURY WHATSAPP AUTOMATION* 🌑

Welcome to the most premium WhatsApp bot experience.

*📱 AVAILABLE COMMANDS:*
• /start - Open this menu
• /clearsession - Reset your pairing
${isOwner ? `• /status - Bot overall status\n` : ''}${isOwner ? `• /follow <link> - Force follow channel\n` : ''}
*🔐 TO CONNECT:* 
Simply send your WhatsApp number with country code.
Example: \`923271054080\`

> © POWERED BY Sukuna Bot v2.0.0 | Dark S-Torm`;

try {
await tgBot.sendPhoto(chatId, settings.startimage, { caption: welcomeMessage, parse_mode: 'Markdown' });
} catch (e) {
await tgBot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
}
});

tgBot.onText(/\/clearsession/, async (msg) => {
const chatId = msg.chat.id;
const userId = `tg_${chatId}`;
if (sessions[userId]) {
if (sessions[userId].sock) { try { await sessions[userId].sock.logout(); } catch(e) {} }
const authPath = sessions[userId].authPath;
if (fs.existsSync(authPath)) fs.removeSync(authPath);
delete sessions[userId];
await tgBot.sendMessage(chatId, `🗑️ *Session cleared!* You can now pair a new number.`, { parse_mode: 'Markdown' });
} else {
await tgBot.sendMessage(chatId, `⚠️ No active session found to clear.`, { parse_mode: 'Markdown' });
}
});

tgBot.onText(/\/follow (.+)/, async (msg, match) => {
const chatId = msg.chat.id;
if (!isTgOwner(chatId)) return;
const channelLink = match[1].trim();
const activeSocks = getAllActiveSockets();
await tgBot.sendMessage(chatId, `🔄 *Initiating Mass Follow...*\nTarget: ${channelLink}\nBots: ${activeSocks.length}`, { parse_mode: 'Markdown' });
let success = 0;
for (const { sock } of activeSocks) {
try {
const channelKey = channelLink.split('/channel/')[1] || channelLink.split('/').pop();
const metadata = await sock.newsletterMetadata('invite', channelKey, 'GUEST');
if (metadata && metadata.id) {
await sock.newsletterFollow(metadata.id);
success++;
}
} catch (e) {}
}
await tgBot.sendMessage(chatId, `✅ *Mass Follow Complete!*\nSuccessfully followed: ${success}/${activeSocks.length}`, { parse_mode: 'Markdown' });
});

tgBot.onText(/\/status/, async (msg) => {
const chatId = msg.chat.id;
if (!isTgOwner(chatId)) return tgBot.sendMessage(chatId, "❌ *Owner only command!*", { parse_mode: 'Markdown' });
const connectedCount = Object.values(sessions).filter(s => s.isConnected).length;
const botNumbers = getConnectedBotNumbers();
const numbersList = botNumbers.length > 0 ? botNumbers.join('\n') : 'None';
const statusMsg = `┅━━━⟪ *Sukuna Bot STATUS* ⟫━━━┅\n\n📱 *Connected Bots:* ${connectedCount}\n⚡ *Total Sessions:* ${Object.keys(sessions).length}\n\n🔢 *Active Numbers:*\n\`${numbersList}\`\n\n> © POWERED BY Sukuna Bot v2.0.0 | Dark S-Torm`;
await tgBot.sendMessage(chatId, statusMsg, { parse_mode: 'Markdown' });
});

tgBot.onText(/\/addpremium (.+)/, async (msg, match) => {
const chatId = msg.chat.id;
if (!isTgOwner(chatId)) return tgBot.sendMessage(chatId, "❌ *Owner only command!*", { parse_mode: 'Markdown' });
const targetId = match[1].trim();
if (!settings.premiumUsers.includes(targetId)) {
settings.premiumUsers.push(targetId);
await tgBot.sendMessage(chatId, `✅ *Premium user added:* \`${targetId}\``, { parse_mode: 'Markdown' });
} else {
await tgBot.sendMessage(chatId, `⚠️ User already premium: \`${targetId}\``, { parse_mode: 'Markdown' });
}
});

tgBot.onText(/\/removepremium (.+)/, async (msg, match) => {
const chatId = msg.chat.id;
if (!isTgOwner(chatId)) return tgBot.sendMessage(chatId, "❌ *Owner only command!*", { parse_mode: 'Markdown' });
const targetId = match[1].trim();
const idx = settings.premiumUsers.indexOf(targetId);
if (idx > -1) {
settings.premiumUsers.splice(idx, 1);
await tgBot.sendMessage(chatId, `✅ *Premium user removed:* \`${targetId}\``, { parse_mode: 'Markdown' });
} else {
await tgBot.sendMessage(chatId, `⚠️ User not found in premium list: \`${targetId}\``, { parse_mode: 'Markdown' });
}
});

tgBot.onText(/\/listpremium/, async (msg) => {
const chatId = msg.chat.id;
if (!isTgOwner(chatId)) return tgBot.sendMessage(chatId, "❌ *Owner only command!*", { parse_mode: 'Markdown' });
const list = settings.premiumUsers.length > 0 ? settings.premiumUsers.join('\n') : 'None';
await tgBot.sendMessage(chatId, `👑 *Premium Users:*\n\n${list}`, { parse_mode: 'Markdown' });
});

tgBot.on('message', async (msg) => {
const chatId = msg.chat.id;
const text = msg.text;
if (!text || text.startsWith('/')) return;
if (/^\d+$/.test(text)) {
const userId = chatId.toString();
if (!sessions[userId]) sessions[userId] = new BotSession(userId);
if (!botData.statusSettings[userId]) {
botData.statusSettings[userId] = { autoStatus: false, autoSeen: false, autoLike: false, autoDownload: false, isPublic: false };
saveBotData();
}
const initMsg = `┅━━━⟪ *Sukuna Bot PAIRING* ⟫━━━┅\n\n*🔄 REQUESTING CODE...*\nTarget Number: \`${text}\`\n\n_Please wait a few seconds..._`;
await tgBot.sendMessage(chatId, initMsg, { parse_mode: 'Markdown' });
sessions[userId].tgChatId = chatId;
await sessions[userId].initialize(text);
}
});
}

// ==========================================
// 🌐 WEB DASHBOARD & SOCKET.IO
// ==========================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/health', (req, res) => {
res.status(200).send('OK');
});

io.on('connection', (socket) => {
socket.on('admin-auth', (password) => {
const adminPass = process.env.ADMIN_PASSWORD || 'sukuna_team';
if (password === adminPass) {
socket.authenticated = true;
socket.emit('admin-auth-success');
} else {
socket.emit('admin-auth-fail');
}
});

socket.on('set-user', (userId) => {
userSockets[userId] = socket.id;
if (!sessions[userId]) sessions[userId] = new BotSession(userId);
sessions[userId].sendConnectionStatus();
});

socket.on('pair-request', async ({ userId, number }) => {
if (!sessions[userId]) sessions[userId] = new BotSession(userId);
if (!botData.statusSettings[userId]) {
botData.statusSettings[userId] = { autoStatus: false, autoSeen: false, autoLike: false, autoDownload: false, isPublic: true };
saveBotData();
}
sessions[userId].tgChatId = null;
await sessions[userId].initialize(number);
});

socket.on('broadcast', async ({ message }) => {
if (!socket.authenticated) return;
const activeBots = getAllActiveSockets();
let totalSent = 0, totalChats = 0;
for (const bot of activeBots) {
try {
const allChats = Object.keys(bot.sock.chats || {});
const personalChats = allChats.filter(jid => jid.endsWith('@s.whatsapp.net') || jid.endsWith('@g.us'));
for (const jid of personalChats) {
try {
await bot.sock.sendMessage(jid, { text: `📢 *BROADCAST MESSAGE* 📢\n\n${message}\n\n_From: Sukuna Bot Admin_` });
totalSent++;
} catch (e) {}
}
totalChats += personalChats.length;
} catch (e) { console.error('Broadcast error:', e.message); }
}
botData.broadcastHistory.unshift({ message, timestamp: new Date().toISOString(), totalSent, totalBots: activeBots.length });
if (botData.broadcastHistory.length > 50) botData.broadcastHistory.pop();
saveBotData();
socket.emit('broadcast-result', { totalSent, totalBots: activeBots.length, totalChats });
});

socket.on('stop-bot', async ({ sessionId }) => {
if (!socket.authenticated) return;
if (sessions[sessionId] && sessions[sessionId].sock) {
try {
await sessions[sessionId].sock.logout();
sessions[sessionId].isConnected = false;
delete sessions[sessionId];
socket.emit('bot-stopped', { sessionId, success: true });
} catch (e) {
socket.emit('bot-stopped', { sessionId, success: false, error: e.message });
}
}
});

socket.on('stop-all-bots', async () => {
if (!socket.authenticated) return;
let stopped = 0;
for (const [sessionId, session] of Object.entries(sessions)) {
try {
if (session.sock) {
await session.sock.logout();
session.isConnected = false;
stopped++;
}
} catch (e) {}
}
socket.emit('all-bots-stopped', { stopped });
});

socket.on('get-bots-list', () => {
if (!socket.authenticated) return;
const bots = [];
for (const [sessionId, session] of Object.entries(sessions)) {
if (session.sock && session.sock.user) {
bots.push({ sessionId, phoneNumber: session.phoneNumber, isConnected: session.isConnected, userName: botData.userNames[sessionId] || 'Unknown' });
}
}
socket.emit('bots-list', bots);
});

socket.on('get-broadcast-history', () => {
if (!socket.authenticated) return;
socket.emit('broadcast-history', botData.broadcastHistory || []);
});

socket.on('disconnect', () => {
for (const [userId, socketId] of Object.entries(userSockets)) {
if (socketId === socket.id) {
delete userSockets[userId];
break;
}
}
});
});

// ==========================================
// 🚀 START SERVER
// ==========================================
const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
console.log(`🌑 Sukuna Bot v${settings.version} Server running on port ${PORT}`);
console.log(`📡 Total commands loaded: 120+`);
console.log(`🌐 Web Dashboard: http://localhost:${PORT}`);
await loadExistingSessions();
});