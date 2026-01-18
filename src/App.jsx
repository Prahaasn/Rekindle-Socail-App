import { useGameState } from './hooks/useGameState'
import LandingScreen from './screens/LandingScreen'
import GameScreen from './screens/GameScreen'
import WaitingScreen from './screens/WaitingScreen'
import CompleteScreen from './screens/CompleteScreen'
import InviteLandingScreen from './screens/InviteLandingScreen'

export default function App() {
  const {
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
  } = useGameState()

  const hasStarted = gameState.names[0] && gameState.names[1]

  if (!hasStarted) {
    return <LandingScreen onStart={startGame} />
  }

  // Show invite landing page for new visitors from a shared link
  if (isFromInviteLink) {
    // The sender's name is whoever sent the invite (the partner from the current player's perspective)
    const senderName = partnerName
    return (
      <InviteLandingScreen
        senderName={senderName}
        currentDay={gameState.day}
        onAccept={acceptInvite}
      />
    )
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
      currentPlayerName={currentPlayerName}
      partnerName={partnerName}
      getShareUrl={getShareUrl}
    />
  )
}
