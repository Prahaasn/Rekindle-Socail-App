import { useState } from 'react'
import Logo from '../components/Logo'
import PromptCard from '../components/PromptCard'
import ProgressJourney from '../components/ProgressJourney'
import ShareModal from '../components/ShareModal'
import { PROMPTS } from '../lib/prompts'

export default function GameScreen({
  gameState,
  currentPlayerName,
  partnerName,
  onSubmitResponse,
  getShareUrl
}) {
  const [response, setResponse] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [shareUrl, setShareUrl] = useState('')

  const currentPrompt = PROMPTS[gameState.day - 1]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (response.trim()) {
      const newState = onSubmitResponse(response.trim())
      const url = getShareUrl()
      setShareUrl(url)
      setShowModal(true)
      setResponse('')
    }
  }

  return (
    <div className="screen game-screen">
      <header className="game-header">
        <Logo size="small" showFire={false} />
        <ProgressJourney currentDay={gameState.day} />
      </header>

      <main className="game-main">
        <p className="turn-indicator">{currentPlayerName}'s turn</p>

        <PromptCard prompt={currentPrompt} />

        <form className="response-form" onSubmit={handleSubmit}>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Type your response..."
            rows={4}
            className="response-input"
          />

          <button
            type="submit"
            className="primary-button"
            disabled={!response.trim()}
          >
            Send to {partnerName}
          </button>
        </form>
      </main>

      {showModal && (
        <ShareModal
          url={shareUrl}
          partnerName={partnerName}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
