import { useState } from 'react'
import Logo from '../components/Logo'
import ProgressJourney from '../components/ProgressJourney'
import InviteModal from '../components/InviteModal'

export default function WaitingScreen({ gameState, currentPlayerName, partnerName, getShareUrl }) {
  const [showModal, setShowModal] = useState(false)

  const handleCopyLink = () => {
    setShowModal(true)
  }

  return (
    <div className="screen waiting-screen">
      <div className="waiting-content">
        <Logo size="medium" />

        <p className="waiting-message">
          Waiting for {partnerName} to respond...
        </p>

        <ProgressJourney currentDay={gameState.day} />

        <button className="secondary-button" onClick={handleCopyLink}>
          Send Link Again
        </button>
      </div>

      {showModal && (
        <InviteModal
          senderName={currentPlayerName}
          inviteUrl={getShareUrl()}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
