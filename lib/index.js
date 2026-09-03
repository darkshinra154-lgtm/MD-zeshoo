/**
 * ==========================================
 * 🌟 Sukuna Bot v2.0.0 - Group Settings Manager
 * ==========================================
 * 👑 Developer: Adam (Sukuna Team)
 * 🛡️ Team: Dark S-Torm
 * 🚀 Description: Manages group settings like Welcome, Goodbye, and Antilink.
 * ==========================================
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WELCOME_FILE = path.join(__dirname, '../data/welcome_settings.json');
const GOODBYE_FILE = path.join(__dirname, '../data/goodbye_settings.json');
const ANTILINK_FILE = path.join(__dirname, '../data/antilink_settings.json');

// Helper to ensure data directory exists
const ensureDataDir = () => {
    fs.ensureDirSync(path.join(__dirname, '../data'));
};

// ==========================================
// 🎉 Welcome Functions
// ==========================================
export async function addWelcome(chatId, status, message) {
    ensureDataDir();
    let data = {};
    if (fs.existsSync(WELCOME_FILE)) data = fs.readJsonSync(WELCOME_FILE);
    data[chatId] = { status, message };
    fs.writeJsonSync(WELCOME_FILE, data);
}

export async function delWelcome(chatId) {
    if (!fs.existsSync(WELCOME_FILE)) return;
    let data = fs.readJsonSync(WELCOME_FILE);
    delete data[chatId];
    fs.writeJsonSync(WELCOME_FILE, data);
}

export async function isWelcomeOn(chatId) {
    if (!fs.existsSync(WELCOME_FILE)) return false;
    let data = fs.readJsonSync(WELCOME_FILE);
    return data[chatId] ? data[chatId].status : false;
}

export async function getWelcomeMessage(chatId) {
    if (!fs.existsSync(WELCOME_FILE)) return null;
    let data = fs.readJsonSync(WELCOME_FILE);
    return data[chatId] ? data[chatId].message : null;
}

// ==========================================
// 👋 Goodbye Functions
// ==========================================
export async function addGoodbye(chatId, status, message) {
    ensureDataDir();
    let data = {};
    if (fs.existsSync(GOODBYE_FILE)) data = fs.readJsonSync(GOODBYE_FILE);
    data[chatId] = { status, message };
    fs.writeJsonSync(GOODBYE_FILE, data);
}

export async function delGoodBye(chatId) {
    if (!fs.existsSync(GOODBYE_FILE)) return;
    let data = fs.readJsonSync(GOODBYE_FILE);
    delete data[chatId];
    fs.writeJsonSync(GOODBYE_FILE, data);
}

export async function isGoodByeOn(chatId) {
    if (!fs.existsSync(GOODBYE_FILE)) return false;
    let data = fs.readJsonSync(GOODBYE_FILE);
    return data[chatId] ? data[chatId].status : false;
}

export async function getGoodbyeMessage(chatId) {
    if (!fs.existsSync(GOODBYE_FILE)) return null;
    let data = fs.readJsonSync(GOODBYE_FILE);
    return data[chatId] ? data[chatId].message : null;
}

// ==========================================
// 🔗 Antilink Functions
// ==========================================
export async function getAntilink(chatId) {
    if (!fs.existsSync(ANTILINK_FILE)) return null;
    let data = fs.readJsonSync(ANTILINK_FILE);
    return data[chatId] || null;
}

// ==========================================
// 👑 Sudo & Warning Helpers
// ==========================================
export async function isSudo(sender) {
    // Placeholder: In a real bot, check against a list of sudo/owner numbers.
    // For now, we'll assume only the bot owner is sudo.
    return false; 
}

// Placeholders to prevent crashes in commands that expect these functions
export const incrementWarningCount = async () => 1;
export const resetWarningCount = async () => {};