import { useState } from 'react'
import Icon from './Icons'

export default function ShareModal({ url, partnerName, onClose }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
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
            <Icon name={copied ? 'check' : 'copy'} size={16} />
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <button className="modal-close-button" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  )
}
