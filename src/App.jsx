import { useState, useEffect } from 'react'
import { useGameState } from './hooks/useGameState'
import IntroSequence from './components/IntroSequence'
import LandingScreen from './screens/LandingScreen'
import GameScreen from './screens/GameScreen'
import WaitingScreen from './screens/WaitingScreen'
import CompleteScreen from './screens/CompleteScreen'
import { getStateFromUrl } from './lib/stateEncoder'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)

  const {
    gameState,
    startGame,
    submitResponse,
    getShareUrl,
    resetGame,
    isComplete,
    currentPlayerName,
    partnerName
  } = useGameState()

  // Check for existing state in URL - skip intro if coming from shared link
  useEffect(() => {
    const urlState = getStateFromUrl()
    if (urlState) {
      setShowIntro(false)
    }
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  const hasStarted = gameState.names[0] && gameState.names[1]

  // Render intro sequence
  if (showIntro) {
    return (
      <div className="app">
        <IntroSequence onComplete={handleIntroComplete} />
      </div>
    )
  }

  // Main app content
  if (!hasStarted) {
    return (
      <div className="app">
        <LandingScreen onStart={startGame} />
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="app">
        <CompleteScreen gameState={gameState} onReset={resetGame} />
      </div>
    )
  }

  const isMyTurn = true

  if (isMyTurn) {
    return (
      <div className="app">
        <GameScreen
          gameState={gameState}
          currentPlayerName={currentPlayerName}
          partnerName={partnerName}
          onSubmitResponse={submitResponse}
          getShareUrl={getShareUrl}
        />
      </div>
    )
  }

  return (
    <div className="app">
      <WaitingScreen
        gameState={gameState}
        partnerName={partnerName}
        getShareUrl={getShareUrl}
      />
    </div>
  )
}
