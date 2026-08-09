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
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zeshoo · Dragon Animation</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      background: #0b1a2f;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Segoe UI', system-ui, sans-serif;
    }
    .card {
      background: #132a3f;
      padding: 1.5rem 1.5rem 2rem;
      border-radius: 3rem 3rem 2rem 2rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 0 2px #3d7a9b inset;
      transition: 0.3s;
    }
    canvas {
      display: block;
      margin: 0 auto;
      width: 600px;
      max-width: 100%;
      height: auto;
      aspect-ratio: 600 / 400;
      background: radial-gradient(circle at 20% 30%, #1f4b66, #0a1a2a);
      border-radius: 2rem;
      box-shadow: 0 0 30px #4fa3d0aa;
      cursor: default;
      transition: 0.2s;
    }
    .title {
      text-align: center;
      margin-top: 1rem;
      color: #b3e4ff;
      font-weight: 600;
      letter-spacing: 2px;
      text-shadow: 0 0 8px #2f9ed6, 0 2px 0 #0b2a3b;
      font-size: 1.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.3rem;
    }
    .title span {
      display: inline-block;
      background: #1e3f57;
      padding: 0.1rem 1rem;
      border-radius: 40px;
      border: 1px solid #7fc1e6;
      box-shadow: inset 0 0 10px #2d7aa0;
    }
    .footer {
      color: #7faec9;
      text-align: center;
      margin-top: 0.5rem;
      font-size: 0.8rem;
      opacity: 0.8;
    }
  </style>
</head>
<body>
<div class="card">
  <canvas id="dragonCanvas" width="600" height="400"></canvas>
  <div class="title">
    <span>🐉 Zeshoo</span>
  </div>
  <div class="footer">✦ fire & flight ✦</div>
</div>
<script>
  (function() {
    const canvas = document.getElementById('dragonCanvas');
    const ctx = canvas.getContext('2d');

    // ---------- dragon parameters ----------
    const dragon = {
      // body base
      bodyX: 300, bodyY: 220,
      wingAngle: 0,
      wingSpeed: 0.035,
      tailWag: 0,
      breathGlow: 0,
      eyeBlink: 0,
      scale: 1,
    };

    // ---------- helpers ----------
    function lerp(a, b, t) { return a + (b - a) * t; }

    // ---------- draw dragon ----------
    function drawZeshoo(time) {
      ctx.clearRect(0, 0, 600, 400);

      // ---- dynamic motion ----
      const wingFlap = Math.sin(time * dragon.wingSpeed) * 0.9;
      const wingAngle = 0.4 + wingFlap * 0.7;  // 0.4 .. 1.1 rad
      const tailPhase = Math.sin(time * 0.025 + 1.2) * 0.25;
      const breathPulse = 0.7 + 0.3 * Math.sin(time * 0.05);
      const glowPulse = 0.5 + 0.5 * Math.sin(time * 0.08 + 0.7);

      // ---- body ----
      ctx.save();
      ctx.translate(dragon.bodyX, dragon.bodyY);

      // ---------- shadow ----------
      ctx.shadowColor = '#3f9fd0';
      ctx.shadowBlur = 25;

      // ---------- tail (behind body) ----------
      ctx.save();
      ctx.translate(-15, 25);
      ctx.rotate(-0.2 + tailPhase * 0.4);
      ctx.fillStyle = '#1b4d6b';
      ctx.strokeStyle = '#3b8db0';
      ctx.lineWidth = 2.5;
      // tail segments
      for (let i = 0; i < 5; i++) {
        const seg = i / 5;
        const xOff = -18 - seg * 28;
        const yOff = 6 - seg * 12 + Math.sin(seg * 8 + time * 0.02) * 4;
        ctx.beginPath();
        ctx.ellipse(xOff, yOff, 12 - seg * 2.5, 8 - seg * 1.8, 0.2, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#1f5577' : '#19445f';
        ctx.fill();
        ctx.stroke();
        // spikes
        if (i < 4) {
          ctx.beginPath();
          ctx.moveTo(xOff - 4, yOff - 9);
          ctx.lineTo(xOff - 12, yOff - 17);
          ctx.lineTo(xOff - 20, yOff - 8);
          ctx.fillStyle = '#3d7d9e';
          ctx.fill();
        }
      }
      // tail tip (flame)
      ctx.shadowBlur = 35;
      ctx.shadowColor = '#ff7733';
      ctx.beginPath();
      ctx.arc(-70, -6, 12 + 4 * Math.sin(time * 0.1), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 140, 30, ${0.6 + 0.4 * Math.sin(time * 0.07)})`;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // ---------- wings (behind body) ----------
      ctx.save();
      // left wing
      ctx.translate(-10, -8);
      ctx.rotate(-0.1 + wingAngle * 0.3);
      ctx.fillStyle = '#236582';
      ctx.strokeStyle = '#5faed9';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#4b9bc9';
      ctx.beginPath();
      ctx.ellipse(-10, -35, 38, 14, -0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // wing bones
      ctx.beginPath();
      ctx.moveTo(-10, -35);
      ctx.lineTo(-25, -55);
      ctx.lineTo(-12, -52);
      ctx.strokeStyle = '#a3d4f0';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-10, -35);
      ctx.lineTo(5, -58);
      ctx.lineTo(-5, -50);
      ctx.stroke();
      // right wing
      ctx.restore();

      ctx.save();
      ctx.translate(10, -8);
      ctx.rotate(0.1 - wingAngle * 0.3);
      ctx.fillStyle = '#236582';
      ctx.strokeStyle = '#5faed9';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#4b9bc9';
      ctx.beginPath();
      ctx.ellipse(10, -35, 38, 14, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(10, -35);
      ctx.lineTo(25, -55);
      ctx.lineTo(12, -52);
      ctx.strokeStyle = '#a3d4f0';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(10, -35);
      ctx.lineTo(-5, -58);
      ctx.lineTo(5, -50);
      ctx.stroke();
      ctx.restore();

      // ---------- main body (chest + belly) ----------
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#1f7a9e';

      // body oval
      ctx.beginPath();
      ctx.ellipse(0, 8, 45, 32, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#1d4d66';
      ctx.fill();
      ctx.strokeStyle = '#479bbf';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // belly lighter
      ctx.beginPath();
      ctx.ellipse(8, 18, 27, 18, 0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#2f6d89';
      ctx.fill();
      ctx.strokeStyle = '#67b0d4';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // ---------- neck & head ----------
      ctx.save();
      ctx.translate(16, -12);
      // neck
      ctx.beginPath();
      ctx.ellipse(8, -8, 18, 12, 0.2, 0, Math.PI * 2);
      ctx.fillStyle = '#21536d';
      ctx.fill();
      ctx.stroke();

      // head
      ctx.translate(16, -12);
      ctx.beginPath();
      ctx.ellipse(0, -2, 20, 17, 0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#1f5575';
      ctx.fill();
      ctx.strokeStyle = '#67b0d4';
      ctx.stroke();

      // snout
      ctx.beginPath();
      ctx.ellipse(16, 2, 15, 10, -0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#1f4f69';
      ctx.fill();
      ctx.stroke();

      // ---------- eyes ----------
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#cceeff';

      // left eye (dragon's left)
      ctx.beginPath();
      ctx.ellipse(6, -6, 7, 8, 0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#e8f6ff';
      ctx.fill();
      ctx.strokeStyle = '#114257';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      // pupil
      ctx.beginPath();
      ctx.arc(10, -6, 3.8, 0, Math.PI * 2);
      ctx.fillStyle = '#b32f1a';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(12, -9, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#f5f9ff';
      ctx.fill();

      // right eye
      ctx.beginPath();
      ctx.ellipse(-2, -6, 7, 8, -0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#e8f6ff';
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(2, -6, 3.8, 0, Math.PI * 2);
      ctx.fillStyle = '#b32f1a';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(4, -9, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#f5f9ff';
      ctx.fill();

      // ---------- horns ----------
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#5f9fc9';
      ctx.fillStyle = '#3a748f';
      ctx.strokeStyle = '#80c4e6';
      ctx.lineWidth = 2;
      // left horn
      ctx.beginPath();
      ctx.moveTo(-2, -16);
      ctx.lineTo(-14, -36);
      ctx.lineTo(0, -28);
      ctx.fill();
      ctx.stroke();
      // right horn
      ctx.beginPath();
      ctx.moveTo(10, -16);
      ctx.lineTo(22, -36);
      ctx.lineTo(8, -28);
      ctx.fill();
      ctx.stroke();

      // ---------- fire breath (glow) ----------
      ctx.shadowBlur = 50;
      ctx.shadowColor = '#ff8833';
      const breathSize = 8 + 6 * breathPulse;
      const gradient = ctx.createRadialGradient(30, 6, 2, 30, 6, breathSize + 12);
      gradient.addColorStop(0, `rgba(255, 200, 50, ${0.8 * glowPulse})`);
      gradient.addColorStop(0.5, `rgba(255, 100, 20, ${0.6 * glowPulse})`);
      gradient.addColorStop(1, 'rgba(200, 40, 0, 0)');
      ctx.beginPath();
      ctx.arc(30, 6, breathSize + 12, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // inner fire tongue
      ctx.shadowBlur = 45;
      ctx.shadowColor = '#ffaa33';
      ctx.beginPath();
      ctx.ellipse(34, 2, 10 + 5 * breathPulse, 6 + 3 * breathPulse, 0.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 170, 40, ${0.7 + 0.3 * glowPulse})`;
      ctx.fill();

      ctx.restore(); // head

      // ---------- legs (simple) ----------
      ctx.save();
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#2f7599';
      ctx.fillStyle = '#1e4b63';
      ctx.strokeStyle = '#529bbf';
      ctx.lineWidth = 2;
      // front left leg
      ctx.beginPath();
      ctx.ellipse(-10, 34, 8, 13, -0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // front right leg
      ctx.beginPath();
      ctx.ellipse(18, 34, 8, 13, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // back left leg
      ctx.beginPath();
      ctx.ellipse(-30, 32, 9, 12, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // back right leg
      ctx.beginPath();
      ctx.ellipse(36, 32, 9, 12, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // ---------- spikes on back ----------
      ctx.save();
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#509fc9';
      ctx.fillStyle = '#3b7d9e';
      ctx.strokeStyle = '#7fc1e6';
      ctx.lineWidth = 1.8;
      for (let i = -3; i <= 3; i++) {
        const x = i * 12 - 4;
        const y = -8 + Math.abs(i) * 2.5;
        ctx.beginPath();
        ctx.moveTo(x, y - 12);
        ctx.lineTo(x - 7, y - 2);
        ctx.lineTo(x + 7, y - 2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();

      // ---------- extra scales / details ----------
      ctx.shadowBlur = 0;
      for (let i = 0; i < 8; i++) {
        const angle = i * 0.9 + 0.3;
        const x = 18 * Math.cos(angle) - 4;
        const y = 18 * Math.sin(angle) + 6;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#367a99' : '#4c93b5';
        ctx.fill();
      }

      ctx.restore(); // body translate

      // ---------- floating embers ----------
      ctx.save();
      ctx.shadowBlur = 25;
      for (let i = 0; i < 5; i++) {
        const t = time * 0.02 + i * 1.7;
        const x = 200 + 140 * Math.sin(t * 0.5 + i);
        const y = 100 + 80 * Math.sin(t * 0.7 + i * 1.2);
        const size = 4 + 5 * (0.5 + 0.5 * Math.sin(t * 0.9));
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        const alpha = 0.3 + 0.4 * (0.5 + 0.5 * Math.sin(t * 0.3));
        ctx.fillStyle = `rgba(255, 180, 70, ${alpha})`;
        ctx.shadowColor = '#ffaa44';
        ctx.fill();
      }
      ctx.restore();

      // ---------- name label "Zeshoo" (in canvas) ----------
      ctx.save();
      ctx.shadowBlur = 22;
      ctx.shadowColor = '#3b98c9';
      ctx.font = 'bold 36px "Segoe UI", system-ui, cursive';
      ctx.fillStyle = '#deefff';
      ctx.strokeStyle = '#17506b';
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.strokeText('⚡ Zeshoo ⚡', 300, 395);
      ctx.fillText('⚡ Zeshoo ⚡', 300, 395);
      ctx.restore();
    }

    // ---------- animation loop ----------
    let startTime = performance.now();

    function animate(now) {
      const elapsed = (now - startTime) / 1000; // seconds
      drawZeshoo(elapsed);
      requestAnimationFrame(animate);
    }

    // start
    requestAnimationFrame(animate);
  })();
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
