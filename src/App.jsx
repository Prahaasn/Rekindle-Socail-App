import { useState } from 'react'
import { useGameState } from './hooks/useGameState'
import IntroSequence from './components/IntroSequence'
import LandingScreen from './screens/LandingScreen'
import GameScreen from './screens/GameScreen'
import WaitingScreen from './screens/WaitingScreen'
import CompleteScreen from './screens/CompleteScreen'

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

  const hasStarted = gameState.names[0] && gameState.names[1]

  // Show intro sequence on first load (only if game hasn't started)
  if (showIntro && !hasStarted) {
    return <IntroSequence onComplete={() => setShowIntro(false)} />
  }

  if (!hasStarted) {
    return <LandingScreen onStart={startGame} />
  }

  if (isComplete) {
    return <CompleteScreen gameState={gameState} onReset={resetGame} />
  }

  const isMyTurn = true

  if (isMyTurn) {
    return (
      <GameScreen
        gameState={gameState}
        currentPlayerName={currentPlayerName}
        partnerName={partnerName}
        onSubmitResponse={submitResponse}
        getShareUrl={getShareUrl}
      />
    )
  }

  return (
    <WaitingScreen
      gameState={gameState}
      partnerName={partnerName}
      getShareUrl={getShareUrl}
    />
  )
}
