/**
 * Message variants for the viral invite system.
 * Each variant has a different "vibe" to match the user's personality.
 */

export const MESSAGE_VARIANTS = [
  {
    id: 'callout',
    vibe: 'Spicy',
    emoji: '🌶️',
    template: (name) => `yo ${name} literally just answered a question about you.\nwanna know what they said? 🔥`,
  },
  {
    id: 'dare',
    vibe: 'Challenge',
    emoji: '💪',
    template: (name) => `${name} started something. Now it's on you.\n7 days to say what you actually feel.\nno pressure lol`,
  },
  {
    id: 'mystery',
    vibe: 'Mysterious',
    emoji: '👀',
    template: (name) => `this is either gonna be really sweet or really awkward.\n${name} invited you to rekindle.\nonly one way to find out 👀`,
  },
  {
    id: 'direct',
    vibe: 'Direct',
    emoji: '💯',
    template: (name) => `${name} wants to reconnect. 7 days. 7 questions. No hiding.\nYou in or nah?`,
  },
  {
    id: 'guilt',
    vibe: 'Guilt Trip',
    emoji: '😬',
    template: (name) => `${name} just said something real about you.\nyou gonna leave them on read?`,
  },
  {
    id: 'bold',
    vibe: 'Bold',
    emoji: '🔥',
    template: (name) => `${name} is trying to reconnect with you.\nthey answered first. your move.\n(don't be scared)`,
  },
]

export const PROVOCATIVE_FOOTERS = [
  "no balls, you won't send it",
  "bet you're too scared",
  "what's the worst that could happen?",
  "you've been staring at this for too long. just send it.",
  "they're literally waiting",
  "don't overthink it",
  "fortune favors the bold or whatever",
]

export const SUCCESS_MESSAGES = [
  "sent. no turning back now 🔥",
  "it's out there. manifesting a response.",
  "brave. very brave.",
  "okay it's done. go touch grass.",
  "the die is cast.",
]

/**
 * Get a random footer message
 */
export function getRandomFooter() {
  return PROVOCATIVE_FOOTERS[Math.floor(Math.random() * PROVOCATIVE_FOOTERS.length)]
}

/**
 * Get a random success message
 */
export function getRandomSuccessMessage() {
  return SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)]
}
