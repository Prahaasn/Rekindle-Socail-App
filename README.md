# 🔥 Rekindle

A beautiful 7-day relationship reconnection game. No backend needed — state passes through shareable URLs.

![Rekindle Preview](https://via.placeholder.com/600x400/1a0f0a/fbbf24?text=🔥+Rekindle](https://prahaasn.github.io/rekindle-website/))

## ✨ Features

- **7 meaningful prompts** — one per day, designed for reconnection
- **Pixel fire animation** — Minecraft-style warmth, not generic AI aesthetics
- **URL-based state** — share a link, no backend required
- **Warm design** — amber/coral palette, not the typical blue tech look
- **Mobile-first** — works great on phones

---

## 🚀 Quick Start (5 minutes)

### Step 1: Install Node.js (if you don't have it)

Download from [nodejs.org](https://nodejs.org/) — get the LTS version.

### Step 2: Set up the project

```bash
# Create project folder and navigate into it
mkdir rekindle
cd rekindle

# Initialize npm and install dependencies
npm init -y
npm install react react-dom react-router-dom
npm install -D vite @vitejs/plugin-react
```

### Step 3: Copy all the files

Copy each file from this project into your `rekindle` folder, maintaining this structure:

```
rekindle/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── PixelFire.jsx
    │   ├── Logo.jsx
    │   ├── PromptCard.jsx
    │   ├── ProgressJourney.jsx
    │   └── ShareModal.jsx
    ├── screens/
    │   ├── LandingScreen.jsx
    │   ├── GameScreen.jsx
    │   ├── WaitingScreen.jsx
    │   └── CompleteScreen.jsx
    └── lib/
        ├── prompts.js
        └── stateEncoder.js
```

### Step 4: Run it!

```bash
npm run dev
```

Open http://localhost:3000 in your browser 🎉

---

## 📁 File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | HTML shell + font imports |
| `vite.config.js` | Build configuration |
| `src/index.css` | All styles + pixel fire CSS |
| `src/App.jsx` | Main app + screen routing |
| `src/components/PixelFire.jsx` | Minecraft-style fire animation |
| `src/components/Logo.jsx` | Logo with fire underneath |
| `src/components/PromptCard.jsx` | Daily prompt display |
| `src/components/ProgressJourney.jsx` | 7-day timeline dots |
| `src/components/ShareModal.jsx` | Copy link modal |
| `src/screens/LandingScreen.jsx` | Enter names, start game |
| `src/screens/GameScreen.jsx` | Answer prompts |
| `src/screens/WaitingScreen.jsx` | Waiting for partner |
| `src/screens/CompleteScreen.jsx` | Journey finished |
| `src/lib/prompts.js` | The 7 prompts |
| `src/lib/stateEncoder.js` | URL encoding utilities |

---

## 🎨 Design Decisions (Anti-AI Aesthetic)

This app intentionally avoids the "AI-generated" look:

### ✅ What we DO:
- Warm amber/coral colors (like candlelight)
- Pixel art fire (retro, personal)
- Serif font for headings (Playfair Display)
- Subtle grain texture
- Organic animations
- Personality in copy

### ❌ What we DON'T do:
- Blue/purple gradients
- Stark white backgrounds  
- Generic sans-serif everywhere
- Over-polished minimalism
- Stock illustration style

---

## 🔧 How State Sharing Works

1. User answers a prompt
2. App creates new state object:
   ```js
   { day: 2, turn: 'receiver', names: [...], responses: [...] }
   ```
3. State is JSON-encoded → base64 encoded
4. Added to URL as `?s=ENCODED_STATE`
5. User shares link to partner
6. Partner opens link → state is decoded
7. Game continues from that point

No backend needed — the URL IS the database!

---

## 📱 Testing Multiplayer

Since there's no backend, test like this:

1. Open app, enter two names
2. Answer day 1 prompt
3. Copy the share link
4. Open link in new incognito window
5. Now you're "the other person"
6. Answer as them, copy new link
7. Paste in original window
8. Continue back and forth

---

## 🚀 Deployment

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag /dist folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Push /dist to gh-pages branch
```

---

## 📋 The 7 Prompts

| Day | Emoji | Prompt | Theme |
|-----|-------|--------|-------|
| 1 | 🌅 | What's something you miss about us? | Remembering |
| 2 | 💭 | Share a genuine compliment you've been holding back. | Appreciation |
| 3 | 🔄 | What's a moment you wish you could redo together? | Reflection |
| 4 | ✨ | What's something you admire about them now? | Growth |
| 5 | 🤫 | Share something you've never told them. | Vulnerability |
| 6 | 🌱 | What would you want to rebuild together? | Future |
| 7 | 💝 | Say what you feel — no filters. | Honesty |

---

## 🛠 Customization

### Change Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --amber-400: #fbbf24;  /* Main accent */
  --coral-500: #f97316;  /* Button gradient */
  --ember-900: #1a0f0a;  /* Background */
}
```

### Change Prompts
Edit `src/lib/prompts.js`:
```js
export const PROMPTS = [
  { day: 1, emoji: "🌅", prompt: "Your prompt here", theme: "yourtheme" },
  // ...
]
```

### Change Fire Speed
Edit animation intervals in `src/components/PixelFire.jsx`:
```js
setInterval(() => {
  setPatternIndex(prev => (prev + 1) % FIRE_PATTERNS.length)
}, 150)  // Change 150 to speed up/slow down
```

---

## 📄 License

MIT — do whatever you want with it!

---

Built with ❤️ and 🔥 for hackathons
