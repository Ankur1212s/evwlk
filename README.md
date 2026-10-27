# 🌇 Cinematic Evening Walk Invitation

A breathtaking, cinematic interactive website designed to invite a friend for an evening walk under the sunset sky, collect her personalized preferences (vibe, drinks/treats, time, custom notes), and send you an instant notification when she accepts!

---

## ✨ Features

- **Cinematic Visuals & Audio**:
  - Live animated twilight sky with twinkling stars and drifting golden embers.
  - Authentic film grain and deep twilight aurora gradients.
  - Built-in Web Audio API ambient lofi synthesizer (no external MP3 downloads required; works in every browser).
  - Cinematic letterboxing & smooth scene transitions.
- **Thoughtful Customizer**:
  - **Walk Vibe**: Golden Sunset, Starlit Stroll, Coffee & Talks, or Quiet Reset.
  - **Treat on you**: Coffee / Chai, Boba / Iced Latte, Ice Cream, or Pastry.
  - **Preferred Time Picker** & custom note / song request for the playlist.
- **Playful Interactions**:
  - A humorous, dodging *"Maybe another time"* button that gently slides away with cute cheeky messages when she tries to hover or tap it.
  - Stardust confetti celebration burst on acceptance.
  - An official personalized **"Boarding Pass to an Evening Walk"** generated on completion.
- **Instant Response Notification**:
  - **Option 1 (Recommended - Free Email)**: Direct email straight to your inbox via [Web3Forms](https://web3forms.com) with all her choices and note.
  - **Option 2 (Discord Webhook)**: Instant push notification to your phone/PC Discord channel.
  - **Option 3 (WhatsApp)**: 1-click button to send the confirmation directly to your WhatsApp.

---

## 🚀 Quick Setup (3 Minutes)

### 1. Personalize the Invitation
Open `config.js` and edit the values:
```javascript
window.INVITE_CONFIG = {
  recipientName: "Elena",     // Her name
  senderName: "Alex",         // Your name
  customNote: "I was thinking we both deserve a relaxing evening...",
  
  // Choose your notification method:
  web3FormsAccessKey: "YOUR_KEY_HERE", // Get free key at https://web3forms.com
  discordWebhookUrl: "",               // Or your Discord webhook
  whatsappNumber: "1234567890"         // Optional: your phone number with country code
};
```

### 2. How to Get Notified on Her Response

#### Option A: Email Notification (Free & takes 30 seconds)
1. Go to [https://web3forms.com](https://web3forms.com).
2. Enter your email address and click **"Create Access Key"**.
3. Copy the access key you receive and paste it in `config.js` into `web3FormsAccessKey`.
4. Done! Every time she submits, you will receive an email with:
   - Walk vibe chosen
   - Drink/treat chosen
   - Preferred time
   - Her special message/song request

#### Option B: Discord Notification (Instant phone push notification)
1. In any Discord server you own, create a channel (e.g. `#notifications`).
2. Go to **Channel Settings** -> **Integrations** -> **Webhooks** -> **New Webhook**.
3. Click **Copy Webhook URL** and paste it into `discordWebhookUrl` in `config.js`.

---

## 🌐 How to Preview Locally
Simply double-click `index.html` in file explorer or right-click -> Open with Chrome / Edge / Firefox!

---

## 🚢 Deploying to Vercel (When You Are Ready)

Because this project is built with clean modern web standards and zero complex server dependencies:

### Method 1: Vercel Dashboard (Easiest - 1 minute)
1. Push this folder to a GitHub repository (or zip the folder).
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New Project"** -> Import your GitHub repository.
4. Framework preset: **Other** (Static HTML).
5. Click **Deploy**! You will immediately get a live link like `https://evening-walk-invite.vercel.app` to share with her.

### Method 2: Vercel CLI
If you have Vercel CLI installed:
```bash
vercel deploy --prod
```

