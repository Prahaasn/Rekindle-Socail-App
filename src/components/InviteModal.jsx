import { useState, useEffect } from 'react'
import { MESSAGE_VARIANTS, getRandomFooter, getRandomSuccessMessage } from '../lib/messageVariants'

export default function InviteModal({ senderName, inviteUrl, onClose }) {
  const [variantIndex, setVariantIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)
  const [footerText] = useState(getRandomFooter)
  const [successMessage, setSuccessMessage] = useState('')

  const currentVariant = MESSAGE_VARIANTS[variantIndex]
  const message = currentVariant.template(senderName)
  const fullMessage = `${message}\n\n${inviteUrl}`

  // Shuffle to next variant
  const shuffleVariant = () => {
    setVariantIndex((prev) => (prev + 1) % MESSAGE_VARIANTS.length)
  }

  // Native share API
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rekindle Invite',
          text: message,
          url: inviteUrl,
        })
        setSuccessMessage(getRandomSuccessMessage())
        setSent(true)
      } catch (err) {
        // User cancelled or error
        if (err.name !== 'AbortError') {
          console.log('Share failed:', err)
        }
      }
    } else {
      // Fallback to copy
      handleCopy()
    }
  }

  // iMessage direct share
  const handleiMessage = () => {
    const encoded = encodeURIComponent(fullMessage)
    window.location.href = `sms:&body=${encoded}`
    setSuccessMessage(getRandomSuccessMessage())
    setSent(true)
  }

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullMessage)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = fullMessage
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div className="invite-modal-overlay" onClick={onClose}>
      <div className="invite-modal" onClick={(e) => e.stopPropagation()}>
        <button className="invite-close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="invite-header">
          <span className="invite-fire-emoji">🔥</span>
          <h2 className="invite-title">Send the Invite</h2>
          <p className="invite-subtitle">You answered. Now it's their turn.</p>
        </div>

        <div className="message-preview">
          <div className="preview-header">
            <span className="preview-label">MESSAGE PREVIEW</span>
            <span className="vibe-tag">
              {currentVariant.emoji} {currentVariant.vibe}
            </span>
          </div>
          <div className="preview-content">
            <p className="preview-text">{message}</p>
            <p className="preview-link">{inviteUrl}</p>
          </div>
        </div>

        <button className="shuffle-btn" onClick={shuffleVariant}>
          🔀 Different Vibe
        </button>

        {sent ? (
          <div className="sent-confirmation">
            <span className="sent-emoji">✨</span>
            <p className="sent-message">{successMessage}</p>
          </div>
        ) : (
          <div className="share-buttons">
            <button className="share-btn imessage" onClick={handleiMessage}>
              <span className="btn-icon">📱</span>
              Share via iMessage
            </button>

            <button className="share-btn copy" onClick={handleCopy}>
              <span className="btn-icon">{copied ? '✓' : '📋'}</span>
              {copied ? 'Copied!' : 'Copy Link'}
            </button>

            <button className="share-btn more" onClick={handleNativeShare}>
              <span className="btn-icon">📲</span>
              More Options...
            </button>
          </div>
        )}

        <p className="provocative-footer">{footerText}</p>
      </div>
    </div>
  )
}
