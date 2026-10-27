// ============================================================================
// EVENING WALK INVITATION - CONFIGURATION
// ============================================================================

window.INVITE_CONFIG = {
  // 1. Personalization
  recipientName: "Hey",                 // Her name or nickname (e.g. "Sarah")
  senderName: "Your Friend",            // Your name
  friendlyMessage: "Life's been busy, and I thought it'd be nice to catch up and take a peaceful evening walk to clear our heads—just as good friends. No pressure, no awkwardness, just fresh air and an easy stroll.",

  // 2. Notification Channels (Pick whichever you prefer!)
  // OPTION 1: Direct Email via FormSubmit (No API key needed!)
  // Just type your email address below (e.g. "myname@gmail.com")
  emailAddress: "", 

  // OPTION 2: Web3Forms Access Key
  web3FormsAccessKey: "YOUR_WEB3FORMS_ACCESS_KEY_HERE",

  // OPTION 3: Discord Webhook (Instant phone ping, 100% reliable, zero spam)
  discordWebhookUrl: "", 

  // OPTION 4: WhatsApp direct message (Include country code, e.g. "919876543210")
  whatsappNumber: "" 
};
