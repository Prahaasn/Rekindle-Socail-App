import { useGameState } from './hooks/useGameState'
import LandingScreen from './screens/LandingScreen'
import GameScreen from './screens/GameScreen'
import WaitingScreen from './screens/WaitingScreen'
import CompleteScreen from './screens/CompleteScreen'

export default function App() {
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
