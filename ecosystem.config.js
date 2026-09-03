/**
 * ==========================================
 * 🌟 Sukuna Bot v2.0.0 - PM2 Ecosystem Configuration
 * ==========================================
 * 👑 Developer: Adam (Sukuna Team)
 * 🛡️ Team: Dark S-Torm
 * 🚀 Description: PM2 process management configuration for production deployment.
 * ==========================================
 */

export default {
  apps: [{
    name: 'sukuna-bot-md',
    script: './index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    time: true
  }]
};