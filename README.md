# 💀 ZESHOO WEB PAIR MD 💀

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=00F2FF&center=true&vCenter=true&width=435&lines=ULTIMATE+WHATSAPP+BOT;POWERED+BY+ZESHOO;HIJACK+MODE+ENABLED;V4.0.0+VERSION+RELEASED" alt="Typing SVG" />
</p>
<div align="center">
  <img src="https://files.catbox.moe/qwvzbn.png" width="250" height="250" alt="ZESHOO Bot Logo">
  
<p align="center">
  <a href="https://chat.whatsapp.com/FF9iAfHMQ8fJM7n2xv0hay?s=cl&p=a&ilr=1">
    <img src="https://img.shields.io/badge/WhatsApp-Join_Group-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" />
  </a>
  <a href="https://whatsapp.com/channel/0029Vb8vvB1Fcow4AY0NeC1p">
    <img src="https://img.shields.io/badge/WhatsApp-Join_Channel-128C7E?style=for-the-badge&logo=whatsapp&logoColor=white" />
  </a>

  <h3>🚀 The Most Powerful WhatsApp Automation Bot 🚀</h3>
</div>

---

# 👀 Visitors

<p align="center">
<img src="https://komarev.com/ghpvc/?username=TristanCage&style=for-the-badge&color=whitegreen"/>
</p>

---
    
<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zeshoo - Dragon Animation</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #0a1a2e;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: Arial, sans-serif;
        }
        .container {
            background: #132a3f;
            padding: 20px;
            border-radius: 30px;
            box-shadow: 0 0 50px #1f6b8a;
            border: 2px solid #3d7a9b;
        }
        canvas {
            display: block;
            margin: 0 auto;
            border-radius: 20px;
            background: radial-gradient(circle, #1a4a66, #07131f);
            width: 600px;
            height: 400px;
        }
        h1 {
            text-align: center;
            color: #b3e4ff;
            font-size: 28px;
            margin-top: 10px;
            text-shadow: 0 0 20px #2f9ed6;
            letter-spacing: 3px;
        }
        h1 span {
            background: #1e3f57;
            padding: 5px 25px;
            border-radius: 50px;
            border: 1px solid #7fc1e6;
        }
    </style>
</head>
<body>
    <div class="container">
        <canvas id="dragonCanvas" width="600" height="400"></canvas>
        <h1><span>🐉 Zeshoo</span></h1>
    </div>

    <script>
        const canvas = document.getElementById('dragonCanvas');
        const ctx = canvas.getContext('2d');
        
        let frame = 0;

        function animate() {
            frame++;
            ctx.clearRect(0, 0, 600, 400);
            
            // Dragon position (center)
            const cx = 300;
            const cy = 210;
            
            // Animation values
            const wingAngle = Math.sin(frame * 0.04) * 0.6;
            const tailWave = Math.sin(frame * 0.03) * 0.3;
            const fireSize = 8 + Math.sin(frame * 0.06) * 4;
            
            // ---- TAIL ----
            ctx.save();
            ctx.translate(cx - 30, cy + 20);
            ctx.rotate(-0.3 + tailWave);
            
            for (let i = 0; i < 4; i++) {
                const x = -20 - i * 25;
                const y = Math.sin(i * 0.8 + frame * 0.04) * 5;
                ctx.beginPath();
                ctx.ellipse(x, y, 15 - i * 2, 10 - i * 1.5, 0, 0, Math.PI * 2);
                ctx.fillStyle = i % 2 === 0 ? '#1f5577' : '#19445f';
                ctx.fill();
                ctx.strokeStyle = '#3b8db0';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
            // Tail fire
            ctx.shadowBlur = 40;
            ctx.shadowColor = '#ff7733';
            ctx.beginPath();
            ctx.arc(-95, -2, 12 + Math.sin(frame * 0.07) * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 140, 30, ${0.6 + Math.sin(frame * 0.05) * 0.3})`;
            ctx.fill();
            ctx.restore();
            
            // ---- WINGS ----
            ctx.save();
            // Left wing
            ctx.translate(cx - 15, cy - 5);
            ctx.rotate(-0.2 + wingAngle);
            ctx.shadowBlur = 25;
            ctx.shadowColor = '#4b9bc9';
            ctx.fillStyle = '#236582';
            ctx.strokeStyle = '#5faed9';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(-15, -35, 40, 14, -0.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            // Wing bones
            ctx.beginPath();
            ctx.moveTo(-15, -35);
            ctx.lineTo(-30, -55);
            ctx.lineTo(-10, -50);
            ctx.strokeStyle = '#a3d4f0';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-15, -35);
            ctx.lineTo(0, -58);
            ctx.lineTo(-5, -48);
            ctx.stroke();
            ctx.restore();
            
            ctx.save();
            // Right wing
            ctx.translate(cx + 15, cy - 5);
            ctx.rotate(0.2 - wingAngle);
            ctx.shadowBlur = 25;
            ctx.shadowColor = '#4b9bc9';
            ctx.fillStyle = '#236582';
            ctx.strokeStyle = '#5faed9';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(15, -35, 40, 14, 0.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(15, -35);
            ctx.lineTo(30, -55);
            ctx.lineTo(10, -50);
            ctx.strokeStyle = '#a3d4f0';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(15, -35);
            ctx.lineTo(0, -58);
            ctx.lineTo(5, -48);
            ctx.stroke();
            ctx.restore();
            
            // ---- BODY ----
            ctx.save();
            ctx.translate(cx, cy);
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#1f7a9e';
            
            // Main body
            ctx.beginPath();
            ctx.ellipse(0, 10, 50, 35, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#1d4d66';
            ctx.fill();
            ctx.strokeStyle = '#479bbf';
            ctx.lineWidth = 2.5;
            ctx.stroke();
            
            // Belly
            ctx.beginPath();
            ctx.ellipse(5, 20, 30, 20, 0.1, 0, Math.PI * 2);
            ctx.fillStyle = '#2f6d89';
            ctx.fill();
            ctx.strokeStyle = '#67b0d4';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
            // ---- LEGS ----
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#2f7599';
            ctx.fillStyle = '#1e4b63';
            ctx.strokeStyle = '#529bbf';
            ctx.lineWidth = 2;
            
            // Front legs
            ctx.beginPath();
            ctx.ellipse(-15, 38, 9, 14, -0.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(20, 38, 9, 14, 0.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // Back legs
            ctx.beginPath();
            ctx.ellipse(-35, 36, 10, 13, -0.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(40, 36, 10, 13, 0.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // ---- BACK SPIKES ----
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#509fc9';
            ctx.fillStyle = '#3b7d9e';
            ctx.strokeStyle = '#7fc1e6';
            ctx.lineWidth = 1.5;
            for (let i = -3; i <= 3; i++) {
                const x = i * 13;
                const y = -12 + Math.abs(i) * 3;
                ctx.beginPath();
                ctx.moveTo(x, y - 14);
                ctx.lineTo(x - 8, y - 2);
                ctx.lineTo(x + 8, y - 2);
                ctx.fill();
                ctx.stroke();
            }
            
            ctx.restore(); // End body
            
            // ---- HEAD ----
            ctx.save();
            ctx.translate(cx + 35, cy - 15);
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#3b8db0';
            
            // Neck
            ctx.beginPath();
            ctx.ellipse(0, -5, 18, 14, 0.2, 0, Math.PI * 2);
            ctx.fillStyle = '#21536d';
            ctx.fill();
            ctx.strokeStyle = '#67b0d4';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Head
            ctx.translate(15, -8);
            ctx.beginPath();
            ctx.ellipse(0, 0, 22, 18, 0.1, 0, Math.PI * 2);
            ctx.fillStyle = '#1f5575';
            ctx.fill();
            ctx.stroke();
            
            // Snout
            ctx.beginPath();
            ctx.ellipse(15, 3, 16, 11, -0.1, 0, Math.PI * 2);
            ctx.fillStyle = '#1f4f69';
            ctx.fill();
            ctx.stroke();
            
            // ---- EYES ----
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#cceeff';
            
            // Left eye
            ctx.beginPath();
            ctx.ellipse(5, -4, 7, 9, 0.1, 0, Math.PI * 2);
            ctx.fillStyle = '#e8f6ff';
            ctx.fill();
            ctx.strokeStyle = '#114257';
            ctx.lineWidth = 1.8;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(9, -4, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#b32f1a';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(11, -7, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
            
            // Right eye
            ctx.beginPath();
            ctx.ellipse(-5, -4, 7, 9, -0.1, 0, Math.PI * 2);
            ctx.fillStyle = '#e8f6ff';
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(-1, -4, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#b32f1a';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(1, -7, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
            
            // ---- HORNS ----
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#5f9fc9';
            ctx.fillStyle = '#3a748f';
            ctx.strokeStyle = '#80c4e6';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-5, -15);
            ctx.lineTo(-18, -38);
            ctx.lineTo(-2, -28);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(10, -15);
            ctx.lineTo(23, -38);
            ctx.lineTo(7, -28);
            ctx.fill();
            ctx.stroke();
            
            // ---- FIRE BREATH ----
            ctx.shadowBlur = 60;
            ctx.shadowColor = '#ff8833';
            const gradient = ctx.createRadialGradient(32, 5, 2, 32, 5, fireSize + 15);
            gradient.addColorStop(0, `rgba(255, 200, 50, ${0.7 + Math.sin(frame * 0.05) * 0.2})`);
            gradient.addColorStop(0.5, `rgba(255, 100, 20, 0.6)`);
            gradient.addColorStop(1, 'rgba(200, 40, 0, 0)');
            ctx.beginPath();
            ctx.arc(32, 5, fireSize + 15, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            ctx.shadowBlur = 50;
            ctx.shadowColor = '#ffaa33';
            ctx.beginPath();
            ctx.ellipse(36, 2, 12 + Math.sin(frame * 0.05) * 3, 7 + Math.sin(frame * 0.05) * 2, 0.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 170, 40, ${0.6 + Math.sin(frame * 0.05) * 0.2})`;
            ctx.fill();
            
            ctx.restore(); // End head
            
            // ---- FLOATING EMBERS ----
            ctx.save();
            ctx.shadowBlur = 30;
            for (let i = 0; i < 6; i++) {
                const t = frame * 0.02 + i * 1.5;
                const x = 180 + 200 * Math.sin(t * 0.6 + i);
                const y = 80 + 150 * Math.sin(t * 0.8 + i * 1.2);
                const size = 3 + Math.sin(t * 0.7) * 3;
                ctx.beginPath();
                ctx.arc(x, y, size + 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 180, 70, ${0.3 + Math.sin(t * 0.4) * 0.2})`;
                ctx.shadowColor = '#ffaa44';
                ctx.fill();
            }
            ctx.restore();
            
            // ---- NAME "Zeshoo" ----
            ctx.save();
            ctx.shadowBlur = 25;
            ctx.shadowColor = '#3b98c9';
            ctx.font = 'bold 34px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#deefff';
            ctx.strokeStyle = '#17506b';
            ctx.lineWidth = 3;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.strokeText('⚡ Zeshoo ⚡', 300, 395);
            ctx.fillText('⚡ Zeshoo ⚡', 300, 395);
            ctx.restore();
            
            requestAnimationFrame(animate);
        }
        
        animate();
    </script>
</body>
</html>
## 🎭 ANIMATION 🎭
```text
  ______  ______  _____  _    _  ____   ____  
 |___  / |  ____|/ ____|| |  | |/ __ \ / __ \ 
    / /  | |__  | (___  | |__| | |  | | |  | |
   / /   |  __|  \___ \ |  __  | |  | | |  | |
  / /__  | |____ ____) || |  | | |__| | |__| |
 /_____| |______|_____/ |_|  |_|\____/ \____/ 
                                               
     🔥 ZESHOO WEB PAIR MD IS ALIVE 🔥
```

---

### 🚀 V4.0.0 NEW FEATURES
| Feature | Description | Status |
| :--- | :--- | :--- |
| **🛡️ Anti-Media** | Delete/Warn/Kick on Voice, Image, Video | ✅ Active |
| **💀 Hijack Mode** | Kick All + Demote Admins + Rename Group | ✅ Active |
| **⚡ Super Logic** | 100% Accurate Admin Detection (V5) | ✅ Active |
| **🎨 New Menus** | Updated UI for All & Group Menus | ✅ Active |

---

### 📊 BOT STATISTICS
<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=zeshoo&show_icons=true&theme=tokyonight" alt="Zeshoo Stats" />
</p>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=zeshoo-mini-bot&label=BOT%20VIEWS&color=00F2FF&style=flat" alt="Views" />
</p>

---

5. **Pairing:**
   - Open the web interface or use the Telegram bot to get the pairing code.
   - Enter the code in WhatsApp > Linked Devices.

---

### ⚠️ IMPORTANT WARNING
This bot is created for educational purposes only. This is NOT an official WhatsApp bot. Using this bot may lead to your WhatsApp account being banned. Use it at your own risk.

---
<div align="center">
  <p>Developed with ❤️ by <b>ZESHOO</b></p>
  <a href="https://whatsapp.com/channel/0029Vb8vvB1Fcow4AY0NeC1p">
    <img src="https://img.shields.io/badge/Join-Our%20Channel-25D366?style=for-the-badge&logo=whatsapp" alt="WhatsApp Channel">
  </a>
</div>
