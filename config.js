// ============================================================================
// EVENING WALK INVITATION - CONFIGURATION
// ============================================================================

window.INVITE_CONFIG = {
  // 1. Personalization
  recipientName: "Hey",                 // Her name or nickname (e.g. "Sarah")
  senderName: "Your Friend",            // Your name
  friendlyMessage: "Life's been busy, and I thought it'd be nice to catch up and take a peaceful evening walk to clear our heads—just as good friends. No pressure, no awkwardness, just fresh air and an easy stroll.",

  // 2. Email Notification Settings
  // Web3Forms (Recommended - Free, instant, no signup required)
  // 1. Visit: https://web3forms.com
  // 2. Enter your email and click "Create Access Key"
  // 3. Paste your Access Key below:
  web3FormsAccessKey: "YOUR_WEB3FORMS_ACCESS_KEY_HERE",

  // OR Formspree (If you already have a Formspree Form ID)
  formspreeFormId: "", 

  // 3. Optional Alternate Channels
  discordWebhookUrl: "", 

  // OPTION C: WhatsApp direct text (Include country code, e.g. "919876543210")
  whatsappNumber: "" 
};
