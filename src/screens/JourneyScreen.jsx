import { useParams, useNavigate } from 'react-router-dom'
import { useJourneyStore } from '../hooks/useJourneyStore'
import { usePeopleStore } from '../hooks/usePeopleStore'
import { createShareUrl } from '../lib/stateEncoder'
import GameScreen from './GameScreen'
import WaitingScreen from './WaitingScreen'
import CompleteScreen from './CompleteScreen'

export default function JourneyScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getJourneyById, submitResponse, getCurrentPrompt } = useJourneyStore()
  const { getPersonById } = usePeopleStore()

  const journey = getJourneyById(id)

  if (!journey) {
    return (
      <div className="screen">
        <p>Journey not found</p>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    )
  }

  const person = getPersonById(journey.personId)
  const currentPrompt = getCurrentPrompt(journey)

  // Build a gameState object compatible with existing screens
  const gameState = {
    day: journey.currentDay,
    turn: journey.currentTurn,
    names: [person?.name || 'You', person?.name || 'Partner'],
    responses: journey.responses
  }

  const handleSubmitResponse = (responseText) => {
    submitResponse(journey.id, responseText)
    return journey
  }

  const getShareUrl = () => {
    return createShareUrl(gameState)
  }

  const handleReset = () => {
    navigate('/')
  }

  const handleBack = () => {
    navigate('/')
  }

  // Determine which screen to show
  if (journey.status === 'completed') {
    return (
      <CompleteScreen
        gameState={gameState}
        onReset={handleReset}
        onBack={handleBack}
      />
    )
  }

  if (journey.status === 'waiting') {
    return (
      <WaitingScreen
        gameState={gameState}
        partnerName={person?.name || 'Partner'}
        getShareUrl={getShareUrl}
        onBack={handleBack}
      />
    )
  }

  // Active - show game screen
  return (
    <GameScreen
      gameState={gameState}
      currentPlayerName="You"
      partnerName={person?.name || 'Partner'}
      onSubmitResponse={handleSubmitResponse}
      getShareUrl={getShareUrl}
      onBack={handleBack}
    />
  )
}
