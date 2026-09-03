/**
 * ==========================================
 * 🌟 Sukuna Bot v2.0.0 - Media Helper
 * ==========================================
 * 👑 Developer: Adam (Sukuna Team)
 * 🛡️ Team: Dark S-Torm
 * 🚀 Description: Converts audio buffers to MP3 format using FFmpeg.
 * ==========================================
 */

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';
import fsSync from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import crypto from 'crypto';

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set FFmpeg path
ffmpeg.setFfmpegPath(ffmpegStatic);

/**
 * Convert audio buffer to MP3
 * @param {Buffer} buffer - The input audio buffer.
 * @param {string} ext - The original file extension.
 * @returns {Promise<Buffer>} - The converted MP3 buffer.
 */
async function toAudio(buffer, ext) {
    const tmpDir = path.join(__dirname, '../temp');
    
    // Ensure temp directory exists
    if (!fsSync.existsSync(tmpDir)) {
        await fs.mkdir(tmpDir, { recursive: true });
    }
    
    const id = crypto.randomBytes(8).toString('hex');
    const inputPath = path.join(tmpDir, `${id}_in.${ext}`);
    const outputPath = path.join(tmpDir, `${id}_out.mp3`);
    
    try {
        await fs.writeFile(inputPath, buffer);
        
        await new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .toFormat('mp3')
                .on('end', resolve)
                .on('error', reject)
                .save(outputPath);
        });
        
        const outputBuffer = await fs.readFile(outputPath);
        return outputBuffer;
    } finally {
        // Cleanup temporary files
        try {
            if (fsSync.existsSync(inputPath)) await fs.unlink(inputPath);
            if (fsSync.existsSync(outputPath)) await fs.unlink(outputPath);
        } catch (e) {
            console.error('[Sukuna Bot] Cleanup error in toAudio:', e);
        }
    }
}

export { toAudio };