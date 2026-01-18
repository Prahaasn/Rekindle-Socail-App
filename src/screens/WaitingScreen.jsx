import { useState, useCallback } from 'react'
import Logo from '../components/Logo'
import ProgressJourney from '../components/ProgressJourney'
import ShareModal from '../components/ShareModal'

export default function WaitingScreen({ gameState, partnerName, getShareUrl }) {
  const [showModal, setShowModal] = useState(false)

  const handleCopyLink = useCallback(() => {
    setShowModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setShowModal(false)
  }, [])

  return (
    <div className="screen waiting-screen">
      <div className="waiting-content">
        <Logo size="medium" />

        <p className="waiting-message">
          Waiting for {partnerName} to respond...
        </p>

        <ProgressJourney currentDay={gameState.day} />

        <button className="secondary-button" onClick={handleCopyLink}>
          Copy Link Again
        </button>
      </div>

      {showModal && (
        <ShareModal
          url={getShareUrl()}
          partnerName={partnerName}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
