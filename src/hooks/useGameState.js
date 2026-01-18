import { useState, useEffect } from 'react'
import { getStateFromUrl, createShareUrl } from '../lib/stateEncoder'

const INITIAL_STATE = {
  day: 1,
  turn: 'sender',
  names: ['Alex', 'Jordan'],
  phones: ['', ''],
  responses: [],
  startedAt: Date.now()
}

export function useGameState() {
  const [gameState, setGameState] = useState(() => {
    const urlState = getStateFromUrl()
    if (urlState) return urlState

    // Skip localStorage for testing - always start with test names
    return INITIAL_STATE
  })

  useEffect(() => {
    localStorage.setItem('rekindle_state', JSON.stringify(gameState))
  }, [gameState])

  const startGame = (name1, name2, phone2 = '') => {
    const newState = {
      ...INITIAL_STATE,
      names: [name1, name2],
      phones: ['', phone2],
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
    partnerName
  }
}
