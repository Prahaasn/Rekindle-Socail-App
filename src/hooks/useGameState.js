import { useState, useEffect } from 'react'
import { getStateFromUrl, createShareUrl } from '../lib/stateEncoder'

const INITIAL_STATE = {
  day: 1,
  turn: 'sender',
  names: ['', ''],
  responses: [],
  startedAt: null
}

export function useGameState() {
  // Track if this session came from an invite link (new visitor)
  const [isFromInviteLink, setIsFromInviteLink] = useState(false)

  const [gameState, setGameState] = useState(() => {
    const urlState = getStateFromUrl()
    const saved = localStorage.getItem('rekindle_state')

    // Check if this is a new visitor from an invite link
    // (has URL state but different from localStorage, or no localStorage)
    if (urlState) {
      const savedState = saved ? JSON.parse(saved) : null
      const isDifferentGame = !savedState || savedState.startedAt !== urlState.startedAt

      if (isDifferentGame) {
        // This is a new invite - will be marked as such after render
        return urlState
      }
      return urlState
    }

    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        return INITIAL_STATE
      }
    }
    return INITIAL_STATE
  })

  // Check if user arrived from invite link (run once on mount)
  useEffect(() => {
    const urlState = getStateFromUrl()
    const saved = localStorage.getItem('rekindle_state')

    if (urlState) {
      const savedState = saved ? JSON.parse(saved) : null
      const isDifferentGame = !savedState || savedState.startedAt !== urlState.startedAt

      if (isDifferentGame) {
        setIsFromInviteLink(true)
      }
    }
  }, [])

  // Mark invite as accepted (clears the invite landing screen)
  const acceptInvite = () => {
    setIsFromInviteLink(false)
  }

  useEffect(() => {
    localStorage.setItem('rekindle_state', JSON.stringify(gameState))
  }, [gameState])

  const startGame = (name1, name2) => {
    const newState = {
      ...INITIAL_STATE,
      names: [name1, name2],
      startedAt: Date.now()
    }
    setGameState(newState)
    return newState
  }

  const submitResponse = (response) => {
    const newResponses = [...gameState.responses, response]
    const responsesPerDay = 2
    const totalResponses = newResponses.length
    const newDay = Math.floor(totalResponses / responsesPerDay) + 1
    const newTurn = gameState.turn === 'sender' ? 'receiver' : 'sender'

    const newState = {
      ...gameState,
      responses: newResponses,
      day: Math.min(newDay, 7),
      turn: newTurn
    }
    setGameState(newState)
    return newState
  }

  const getShareUrl = () => {
    return createShareUrl(gameState)
  }

  const resetGame = () => {
    localStorage.removeItem('rekindle_state')
    setGameState(INITIAL_STATE)
    window.history.replaceState({}, '', window.location.pathname)
  }

  const isComplete = gameState.responses.length >= 14

  const currentPlayerIndex = gameState.turn === 'sender' ? 0 : 1
  const currentPlayerName = gameState.names[currentPlayerIndex]
  const partnerName = gameState.names[currentPlayerIndex === 0 ? 1 : 0]

  return {
    gameState,
    startGame,
    submitResponse,
    getShareUrl,
    resetGame,
    isComplete,
    currentPlayerName,
    partnerName,
    isFromInviteLink,
    acceptInvite
  }
}
