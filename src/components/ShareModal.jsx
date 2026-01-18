import { useState, memo, useCallback } from 'react'

const ShareModal = memo(function ShareModal({ url, partnerName, onClose }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for iOS
      const textArea = document.createElement('textarea')
      textArea.value = url
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      textArea.style.top = '0'
      textArea.setAttribute('readonly', '')
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (e) {
        console.error('Copy failed', e)
      }

      document.body.removeChild(textArea)
    }
  }, [url])

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2 className="modal-title">Send to {partnerName}</h2>
        <p className="modal-description">
          Copy this link and send it to {partnerName} so they can respond.
        </p>

        <div className="share-url-container">
          <input
            type="text"
            readOnly
            value={url}
            className="share-url-input"
          />
          <button
            onClick={handleCopy}
            className={`copy-button ${copied ? 'copied' : ''}`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <button className="modal-close-button" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  )
})

export default ShareModal
