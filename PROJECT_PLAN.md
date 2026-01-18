# REKINDLE — Complete Project Plan

## 🎯 Overview

**What:** A 7-day turn-based relationship reconnection game
**How:** React web app with URL-based state sharing
**Style:** Warm, nostalgic, pixel-art accents, definitely NOT AI-looking

---

## 📐 Architecture

### State Management
- Game state encoded in URL (base64 JSON)
- localStorage for draft responses
- No backend required — fully client-side

### URL Structure
```
https://rekindle.app/?s=BASE64_ENCODED_STATE
```

### State Object
```typescript
{
  day: 1-7,
  turn: 'sender' | 'receiver',
  responses: string[],
  startedAt: timestamp,
  names: [string, string]
}
```

---

## 🎨 Design System

### Color Palette (Warm Candlelight)
```
--ember-900: #1a0f0a      // Deepest brown-black
--ember-800: #2d1810      // Dark warm brown
--ember-700: #4a2515      // Rich brown
--ember-600: #6b3a1f      // Warm brown
--ember-500: #8b4513      // Saddle brown
--amber-500: #f59e0b      // Bright amber
--amber-400: #fbbf24      // Light amber
--amber-300: #fcd34d      // Pale amber
--coral-500: #f97316      // Warm coral
--coral-400: #fb923c      // Light coral
--cream-100: #fef7ed      // Warm white
--cream-200: #fde9d4      // Light cream
--cream-300: #fad6b0      // Peachy cream
```

### Typography
- **Display:** "Playfair Display" — elegant serif for headings
- **Body:** "Inter" — clean, readable sans-serif
- **Pixel:** Custom pixel font for fire and accents

### Visual Elements
1. **Pixel Fire Animation** — Minecraft-style flames under logo
2. **Paper Texture** — Subtle grain overlay
3. **Soft Shadows** — Warm-tinted, diffused
4. **Rounded Cards** — Organic, not sharp
5. **Progress Journey** — Visual timeline of 7 days

---

## 📁 File Structure

```
rekindle/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Main app + routing
│   ├── index.css             # Global styles + animations
│   │
│   ├── components/
│   │   ├── PixelFire.jsx     # Minecraft fire animation
│   │   ├── Logo.jsx          # Rekindle logo + fire
│   │   ├── PromptCard.jsx    # Daily prompt display
│   │   ├── ResponseInput.jsx # Text input for responses
│   │   ├── ProgressJourney.jsx # Day 1-7 timeline
│   │   ├── ShareModal.jsx    # Copy link modal
│   │   └── Button.jsx        # Styled button component
│   │
│   ├── screens/
│   │   ├── LandingScreen.jsx # Welcome + start game
│   │   ├── GameScreen.jsx    # Main gameplay
│   │   ├── WaitingScreen.jsx # Waiting for partner
│   │   └── CompleteScreen.jsx # Journey finished
│   │
│   ├── hooks/
│   │   └── useGameState.js   # State encoding/decoding
│   │
│   └── lib/
│       ├── prompts.js        # 7 daily prompts
│       ├── stateEncoder.js   # URL encoding helpers
│       └── constants.js      # App constants
```

---

## 🔥 The Pixel Fire Animation

### Concept
- 8x8 pixel grid animation
- 3-4 colors: dark red, orange, yellow, white tips
- Randomized flicker pattern
- CSS-only (no canvas needed)
- Loops seamlessly

### Implementation
- CSS custom properties for pixel colors
- Keyframe animations with steps()
- Multiple flame columns with offset timing
- Subtle glow effect underneath

---

## 📱 Screens & User Flow

### Screen 1: Landing
```
┌─────────────────────────┐
│                         │
│      🔥 rekindle 🔥      │
│    [pixel fire anim]    │
│                         │
│   "7 days to reconnect" │
│                         │
│   Your name: [______]   │
│   Their name: [______]  │
│                         │
│   [ Begin Journey → ]   │
│                         │
└─────────────────────────┘
```

### Screen 2: Game (Your Turn)
```
┌─────────────────────────┐
│  rekindle    Day 3 of 7 │
│  ● ● ● ○ ○ ○ ○          │
├─────────────────────────┤
│                         │
│  ┌─────────────────┐    │
│  │  💭              │    │
│  │                 │    │
│  │  "What's a      │    │
│  │   moment you    │    │
│  │   wish you      │    │
│  │   could redo?"  │    │
│  │                 │    │
│  └─────────────────┘    │
│                         │
│  ┌─────────────────┐    │
│  │ Type your       │    │
│  │ response...     │    │
│  └─────────────────┘    │
│                         │
│  [ Send to Partner → ]  │
│                         │
└─────────────────────────┘
```

### Screen 3: Waiting
```
┌─────────────────────────┐
│                         │
│      🔥 rekindle 🔥      │
│                         │
│   "Waiting for Sarah    │
│    to respond..."       │
│                         │
│   Day 3 of 7            │
│   ● ● ● ○ ○ ○ ○         │
│                         │
│   [ Copy Link Again ]   │
│                         │
└─────────────────────────┘
```

### Screen 4: Complete
```
┌─────────────────────────┐
│                         │
│      🔥 rekindle 🔥      │
│                         │
│   "Journey Complete"    │
│          💝             │
│                         │
│   You and Sarah spent   │
│   7 days reconnecting.  │
│                         │
│   [ View Responses ]    │
│   [ Start New Journey ] │
│                         │
└─────────────────────────┘
```

---

## 🛠 Implementation Steps

### Phase 1: Project Setup (5 min)
1. Create Vite + React project
2. Install dependencies
3. Set up file structure
4. Configure basic routing

### Phase 2: Design System (15 min)
1. Create CSS variables
2. Import fonts
3. Build base components (Button, Card)
4. Add grain texture overlay

### Phase 3: Pixel Fire (20 min)
1. Build pixel grid structure
2. Create flame color palette
3. Animate with CSS keyframes
4. Add glow effect

### Phase 4: Core Components (20 min)
1. Logo with fire
2. PromptCard
3. ResponseInput
4. ProgressJourney timeline

### Phase 5: State Management (15 min)
1. URL encoder/decoder
2. useGameState hook
3. Share link generation

### Phase 6: Screens (20 min)
1. LandingScreen
2. GameScreen
3. WaitingScreen
4. CompleteScreen

### Phase 7: Polish (15 min)
1. Animations and transitions
2. Mobile responsiveness
3. Error states
4. Final testing

---

## 📋 The 7 Prompts

```javascript
const PROMPTS = [
  {
    day: 1,
    emoji: "🌅",
    prompt: "What's something you miss about us?",
    theme: "remembering"
  },
  {
    day: 2,
    emoji: "💭",
    prompt: "Share a genuine compliment you've been holding back.",
    theme: "appreciation"
  },
  {
    day: 3,
    emoji: "🔄",
    prompt: "What's a moment you wish you could redo together?",
    theme: "reflection"
  },
  {
    day: 4,
    emoji: "✨",
    prompt: "What's something you admire about them now?",
    theme: "growth"
  },
  {
    day: 5,
    emoji: "🤫",
    prompt: "Share something you've never told them.",
    theme: "vulnerability"
  },
  {
    day: 6,
    emoji: "🌱",
    prompt: "What would you want to rebuild together?",
    theme: "future"
  },
  {
    day: 7,
    emoji: "💝",
    prompt: "Say what you feel — no filters.",
    theme: "honesty"
  }
];
```

---

## ✨ Key Design Decisions (Anti-AI Aesthetic)

### DO:
- ✅ Warm colors (amber, coral, cream)
- ✅ Pixel art elements (fire, icons)
- ✅ Serif fonts for headings
- ✅ Paper/grain textures
- ✅ Organic, rounded shapes
- ✅ Personality in micro-copy
- ✅ Intentional imperfection

### DON'T:
- ❌ Blue/purple gradients
- ❌ Generic sans-serif everywhere
- ❌ Stark white backgrounds
- ❌ Perfect geometric shapes
- ❌ Stock illustration style
- ❌ Robotic, formal copy
- ❌ Over-polished minimalism

---

## 🚀 Deployment

For hackathon demo:
1. Build with `npm run build`
2. Deploy to Vercel/Netlify (drag & drop)
3. Share URL with judges

The URL-based state means:
- No backend needed
- Works offline after load
- Shareable via any messenger
- Instant deployment

---

Ready to build? Let's go! 🔥
