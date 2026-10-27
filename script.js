/* ============================================================================
   MESMERISING EVENING WALK INVITATION - SCRIPT ENGINE
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.INVITE_CONFIG || {};

  // Inject custom friend config
  document.querySelectorAll('.val-recipient').forEach(el => el.textContent = config.recipientName || 'Hey');
  document.querySelectorAll('.val-sender').forEach(el => el.textContent = config.senderName || 'Your Friend');

  if (config.friendlyMessage) {
    const msgEl = document.getElementById('friendly-message-text');
    if (msgEl) msgEl.textContent = config.friendlyMessage;
  }

  // --------------------------------------------------------------------------
  // 1. SCENE TRANSITIONS
  // --------------------------------------------------------------------------
  let currentScene = 1;
  const scenes = {
    1: document.getElementById('scene-intro'),
    2: document.getElementById('scene-schedule'),
    3: document.getElementById('scene-confirmed')
  };

  function goToScene(index) {
    const cur = scenes[currentScene];
    const nxt = scenes[index];
    if (!nxt) return;

    if (cur) {
      cur.style.opacity = '0';
      cur.style.transform = 'translateY(-14px) scale(0.98)';
      setTimeout(() => {
        cur.classList.remove('active');
        nxt.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        currentScene = index;
      }, 350);
    } else {
      nxt.classList.add('active');
      currentScene = index;
    }
  }

  document.getElementById('btn-to-schedule')?.addEventListener('click', () => {
    goToScene(2);
  });

  // --------------------------------------------------------------------------
  // 3. DATE & TIME PICKER WITH SHORTCUT PRESETS
  // --------------------------------------------------------------------------
  const dateInput = document.getElementById('walk-date');
  const timeInput = document.getElementById('walk-time');
  const chipTomorrow = document.getElementById('chip-tomorrow');
  const chipWeekend = document.getElementById('chip-this-weekend');
  const chipNextWeek = document.getElementById('chip-next-week');
  const chips = document.querySelectorAll('.preset-chip');

  // Helper to format Date to YYYY-MM-DD
  function toDateStr(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const now = new Date();
  if (dateInput) {
    // Set min to today so past dates can't be chosen
    dateInput.min = toDateStr(now);

    // Default to tomorrow
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    dateInput.value = toDateStr(tomorrow);
  }

  function setActiveChip(activeChip) {
    chips.forEach(c => c.classList.remove('active'));
    if (activeChip) activeChip.classList.add('active');
  }

  chipTomorrow?.addEventListener('click', () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (dateInput) dateInput.value = toDateStr(d);
    if (timeInput) timeInput.value = "18:30";
    setActiveChip(chipTomorrow);
  });

  chipWeekend?.addEventListener('click', () => {
    const d = new Date();
    const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday
    const daysUntilSat = (6 - dayOfWeek + 7) % 7 || 7;
    d.setDate(d.getDate() + daysUntilSat);
    if (dateInput) dateInput.value = toDateStr(d);
    if (timeInput) timeInput.value = "18:00";
    setActiveChip(chipWeekend);
  });

  chipNextWeek?.addEventListener('click', () => {
    const d = new Date();
    const dayOfWeek = d.getDay();
    const daysUntilMon = (8 - dayOfWeek) % 7 || 7;
    d.setDate(d.getDate() + daysUntilMon);
    if (dateInput) dateInput.value = toDateStr(d);
    if (timeInput) timeInput.value = "18:30";
    setActiveChip(chipNextWeek);
  });

  // If user manually changes date or time, clear active chip highlighting
  dateInput?.addEventListener('input', () => setActiveChip(null));
  timeInput?.addEventListener('input', () => setActiveChip(null));

  function getFormattedDateTime() {
    const dateVal = dateInput?.value;
    const timeVal = timeInput?.value;

    if (!dateVal) return "Tomorrow Evening (~6:30 PM)";

    try {
      const [y, m, d] = dateVal.split('-').map(Number);
      const chosenDate = new Date(y, m - 1, d);
      const dateString = chosenDate.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      let timeString = timeVal || "18:30";
      // Convert 24h to 12h with AM/PM
      const [h, min] = timeString.split(':').map(Number);
      const period = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      const formattedTime = `${h12}:${String(min).padStart(2, '0')} ${period}`;

      return `${dateString} at ${formattedTime}`;
    } catch (e) {
      return `${dateVal} at ${timeVal}`;
    }
  }

  // --------------------------------------------------------------------------
  // 4. DRAMATIC PLAYFUL "DECLINE MISSION" DODGING BUTTON
  // --------------------------------------------------------------------------
  const btnDodge = document.getElementById('btn-dodge');
  const btnAccept = document.getElementById('btn-accept');

  const dramaticMessages = [
    "⚠️ Warning: Sunset will take this personally",
    "🛑 Mission abort rejected by Command Center",
    "🏃 Button is currently fleeing the scene!",
    "📉 Declining decreases daily happiness by 42%",
    "✨ Plot twist: 0% awkwardness guaranteed",
    "🍃 Critical alert: Fresh air emergency!",
    "🥺 Just 20 minutes between good friends!"
  ];
  let dodgeCount = 0;

  function handleDodge(e) {
    e.preventDefault();
    dodgeCount++;
    btnDodge.textContent = dramaticMessages[dodgeCount % dramaticMessages.length];

    // Playful dramatic displacement
    const offsetX = (Math.random() - 0.5) * 70;
    const offsetY = (Math.random() - 0.5) * 40;
    btnDodge.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

    // Make the YES button more prominent
    if (btnAccept) {
      const scale = 1 + Math.min(dodgeCount * 0.04, 0.22);
      btnAccept.style.transform = `scale(${scale})`;
    }
  }

  if (btnDodge) {
    btnDodge.addEventListener('mouseenter', handleDodge);
    btnDodge.addEventListener('touchstart', handleDodge, { passive: false });
    btnDodge.addEventListener('click', handleDodge);
  }

  // --------------------------------------------------------------------------
  // 5. DRAMATIC ACCEPT & SEND NOTIFICATION
  // --------------------------------------------------------------------------
  if (btnAccept) {
    btnAccept.addEventListener('click', async () => {
      const customNoteInput = document.getElementById('preferred-spot-input');
      const spotNote = customNoteInput ? customNoteInput.value.trim() : '';
      const chosenDateTime = getFormattedDateTime();

      btnAccept.disabled = true;
      btnAccept.innerHTML = `<span>Ratifying Protocol... 🌇</span>`;

      // Dramatic Cinematic Flash
      const flash = document.getElementById('flash-overlay');
      if (flash) {
        flash.classList.add('active');
        setTimeout(() => flash.classList.remove('active'), 500);
      }

      // Dramatic Confetti Burst
      launchConfetti();

      // Dispatch Notifications
      await sendNotification({
        recipient: config.recipientName,
        time: chosenDateTime,
        note: spotNote,
        timestamp: new Date().toLocaleString()
      });

      // Update Pass Ticket
      const passTimeEl = document.getElementById('pass-time');
      if (passTimeEl) passTimeEl.textContent = chosenDateTime;

      const passNoteRow = document.getElementById('pass-note-row');
      const passNoteVal = document.getElementById('pass-note-val');
      if (spotNote && passNoteRow && passNoteVal) {
        passNoteVal.textContent = `"${spotNote}"`;
        passNoteRow.style.display = 'flex';
      }

      // Slam down the official Ratified Stamp
      setTimeout(() => {
        const stamp = document.getElementById('stamp-seal');
        if (stamp) stamp.classList.add('stamped');
      }, 400);

      // Configure WhatsApp direct button if number exists
      const whatsappBtn = document.getElementById('btn-whatsapp');
      if (whatsappBtn && config.whatsappNumber) {
        const cleanPhone = config.whatsappNumber.replace(/[^0-9]/g, '');
        const text = encodeURIComponent(`Hey ${config.senderName}! Walk protocol accepted 🌇\n• Rendezvous: ${chosenDateTime}${spotNote ? `\n• Note: ${spotNote}` : ''}`);
        whatsappBtn.href = `https://wa.me/${cleanPhone}?text=${text}`;
        whatsappBtn.style.display = 'flex';
      }

      // Move to confirmed scene
      goToScene(3);
    });
  }

  async function sendNotification(data) {
    const jobs = [];

    // 1. Web3Forms Email Notification
    if (config.web3FormsAccessKey && config.web3FormsAccessKey !== "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
      const emailJob = fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: config.web3FormsAccessKey,
          subject: `✨ Evening Walk Confirmed with ${data.recipient}!`,
          from_name: "Evening Walk Invite",
          message: `Great news!\n\n${data.recipient} accepted your evening walk invitation!\n\n` +
                   `• Rendezvous Date & Time: ${data.time}\n` +
                   `• Preferred Spot / Note: ${data.note || 'None'}\n` +
                   `• Confirmed at: ${data.timestamp}`
        })
      }).catch(err => console.log('Web3Forms Notice:', err));
      jobs.push(emailJob);
    }

    // 2. Formspree Email Notification (Alternative)
    if (config.formspreeFormId && config.formspreeFormId.trim() !== "") {
      const formspreeUrl = `https://formspree.io/f/${config.formspreeFormId.replace('https://formspree.io/f/', '')}`;
      const formspreeJob = fetch(formspreeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          recipient: data.recipient,
          walkTime: data.time,
          spotOrNote: data.note || 'None',
          confirmedAt: data.timestamp
        })
      }).catch(err => console.log('Formspree Notice:', err));
      jobs.push(formspreeJob);
    }

    // Discord Webhook
    if (config.discordWebhookUrl && config.discordWebhookUrl.startsWith("http")) {
      const discordJob = fetch(config.discordWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Evening Walk Bot 🌇",
          embeds: [{
            title: "🎉 Walk Confirmed!",
            description: `**${data.recipient}** accepted the evening walk!`,
            color: 16557673, // Sunset coral
            fields: [
              { name: "⏰ Preferred Time", value: data.time, inline: false },
              { name: "📍 Spot / Note", value: data.note || "No specific note", inline: false }
            ],
            footer: { text: `Time: ${data.timestamp}` }
          }]
        })
      }).catch(err => console.log('Notice:', err));
      jobs.push(discordJob);
    }

    try {
      await Promise.all(jobs);
    } catch (e) {
      console.log('Done:', e);
    }
  }

  // --------------------------------------------------------------------------
  // 6. HIGH-PERFORMANCE TWILIGHT CANVAS PARTICLES (Zero GC Stutter)
  // --------------------------------------------------------------------------
  const skyCanvas = document.getElementById('canvas-sky');
  if (skyCanvas) {
    const ctx = skyCanvas.getContext('2d');
    let width = skyCanvas.width = window.innerWidth;
    let height = skyCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = skyCanvas.width = window.innerWidth;
      height = skyCanvas.height = window.innerHeight;
    }, { passive: true });

    const particles = [];
    // Lightweight stars
    for (let i = 0; i < 22; i++) {
      particles.push({
        type: 'star',
        x: Math.random() * width,
        y: Math.random() * height * 0.7,
        r: Math.random() * 1.3 + 0.5,
        alpha: Math.random(),
        delta: (Math.random() * 0.015 + 0.005)
      });
    }

    // Lightweight fireflies
    for (let i = 0; i < 8; i++) {
      particles.push({
        type: 'firefly',
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1.2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.3 + 0.2),
        alpha: Math.random() * 0.7 + 0.3,
        color: Math.random() > 0.5 ? '252, 163, 105' : '255, 117, 85'
      });
    }

    // High performance shooting star
    let shootingStar = null;
    function spawnShootingStar() {
      shootingStar = {
        x: Math.random() * width * 0.7,
        y: Math.random() * (height * 0.3),
        length: 65,
        speed: 10,
        alpha: 1,
        angle: Math.PI / 4
      };
      setTimeout(spawnShootingStar, 6000 + Math.random() * 6000);
    }
    setTimeout(spawnShootingStar, 3000);

    function renderSky() {
      ctx.clearRect(0, 0, width, height);

      // Render shooting star
      if (shootingStar) {
        ctx.strokeStyle = `rgba(255, 235, 180, ${shootingStar.alpha})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
          shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
        );
        ctx.stroke();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.alpha -= 0.024;
        if (shootingStar.alpha <= 0) shootingStar = null;
      }

      // Fast render loop (No radial gradients allocated on heap)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.type === 'star') {
          p.alpha += p.delta;
          if (p.alpha > 0.95 || p.alpha < 0.1) p.delta = -p.delta;
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(p.alpha)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'firefly') {
          p.x += p.vx;
          p.y += p.vy;

          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          // Zero-allocation soft glow
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(renderSky);
    }
    renderSky();
  }

  // --------------------------------------------------------------------------
  // 7. CONFETTI CELEBRATION
  // --------------------------------------------------------------------------
  function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const bits = [];
    const colors = ['#fca369', '#ff7555', '#d64d7c', '#ffffff', '#ffd166'];

    for (let i = 0; i < 70; i++) {
      bits.push({
        x: canvas.width / 2,
        y: canvas.height * 0.65,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.75) * 14,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        alpha: 1
      });
    }

    function step() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      bits.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;
        b.vy += 0.22;
        b.vx *= 0.98;
        b.rotation += b.rotSpeed;
        b.alpha -= 0.008;

        if (b.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.rotate((b.rotation * Math.PI) / 180);
          ctx.fillStyle = b.color;
          ctx.globalAlpha = Math.max(0, b.alpha);
          ctx.fillRect(-b.size / 2, -b.size / 2, b.size, b.size);
          ctx.restore();
        }
      });

      if (alive) {
        requestAnimationFrame(step);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    step();
  }
});
