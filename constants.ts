// ==========================================
// CUSTOMIZATION SECTION
// ==========================================

export const CONTENT = {
  // Title displayed on the main card
  PROPOSAL_TEXT: "Will you be my valentine?",
  
  // Text displayed after saying Yes
  SUCCESS_TEXT: "Yayyyy! Date locked. ❤️",
  
  // Text for the buttons
  YES_BTN: "Yes 💘",
  NO_BTN: "No 🙃",
  
  // Name used in placeholders (optional)
  PARTNER_NAME: "Yash",
};

export const ASSETS = {
  // Replace these URLs with your own images hosted on GitHub or elsewhere.
  // For the sticker, a transparent PNG works best.
  STICKER_URL: `${import.meta.env.BASE_URL}IMG_4004.JPG`, // Place IMG_4004.JPG in /public so it is served at /<base>/IMG_4004.JPG
  
  // The meme GIF shown when they say YES
  MEME_URL: `${import.meta.env.BASE_URL}meme.gif`, // Place meme.gif in /public so it is served at /<base>/meme.gif
  
  // Optional background music
  MUSIC_URL: "", // e.g., assets/song.mp3
};

// Colors for the confetti hearts
export const HEART_COLORS = [
  '#ff0000', // Red
  '#ff69b4', // Hot Pink
  '#ff1493', // Deep Pink
  '#ffc0cb', // Pink
  '#db7093', // Pale Violet Red
];

// Configuration for Confetti
export const CONFETTI_CONFIG = {
  // Colors for the confetti pieces
  colors: ['#FFD700', '#FF6347', '#00BFFF', '#32CD32', '#FF69B4', '#9400D3'],
  // Number of particles to generate
  count: 80,
};
