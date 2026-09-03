/**
 * ==========================================
 * 🌟 Sukuna Bot v2.0.0 - Image Upload Utility
 * ==========================================
 * 👑 Developer: Adam (Sukuna Team)
 * 🛡️ Team: Dark S-Torm
 * 🚀 Description: Handles image uploading to external services (e.g., Telegra.ph).
 * ==========================================
 */

import axios from 'axios';
import FormData from 'form-data';

/**
 * Uploads an image buffer to Telegra.ph
 * @param {Buffer} buffer - The image buffer to upload
 * @returns {Promise<string>} The URL of the uploaded image
 */
async function uploadImage(buffer) {
    try {
        const form = new FormData();
        form.append('file', buffer, 'tmp.jpg');
        
        const res = await axios.post('https://telegra.ph/upload', form, {
            headers: form.getHeaders()
        });
        
        return 'https://telegra.ph' + res.data[0].src;
    } catch (e) {
        throw new Error('Failed to upload image: ' + e.message);
    }
}

export default uploadImage;