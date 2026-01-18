import { useState } from 'react'
import Logo from '../components/Logo'

export default function InviteLandingScreen({ senderName, currentDay, onAccept }) {
  const [contact, setContact] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNotifySubmit = (e) => {
    e.preventDefault()
    if (contact.trim()) {
      // In a real app, this would send to a backend
      console.log('Notification signup:', contact)
      setSubscribed(true)
    }
  }

  return (
    <div className="screen invite-landing-screen">
      <div className="invite-landing-content">
        <Logo size="medium" />

        <div className="invite-landing-header">
          <span className="invite-landing-emoji">🔥</span>
          <h1 className="invite-landing-title">{senderName} invited you.</h1>
        </div>

        <div className="invite-card">
          <p className="invite-card-text">
            "They already answered Day {currentDay}.<br />
            Now they're waiting on you."
          </p>

          <div className="invite-progress">
            <div className="invite-progress-dots">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className={`invite-progress-dot ${day <= currentDay ? 'filled' : ''}`}
                />
              ))}
            </div>
            <span className="invite-progress-label">Day {currentDay} of 7</span>
          </div>
        </div>

        <button className="invite-cta-button" onClick={onAccept}>
          See What They Said
          <span>→</span>
        </button>

        <p className="invite-tagline">"7 questions. 7 days. no bullshit."</p>

        {/* Notification signup section */}
        <div className="notify-section">
          <div className="notify-header">
            <span className="notify-emoji">🔔</span>
            <h3 className="notify-title">Don't Ghost</h3>
          </div>
          <p className="notify-subtitle">
            Get reminded when it's your turn to answer.
          </p>

          {subscribed ? (
            <div className="sent-confirmation">
              <span className="sent-emoji">✓</span>
              <p className="sent-message">we got you. no ghosting allowed.</p>
            </div>
          ) : (
            <form className="notify-form" onSubmit={handleNotifySubmit}>
              <input
                type="text"
                placeholder="Phone or email"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="notify-input"
              />
              <button type="submit" className="notify-button" disabled={!contact.trim()}>
                Remind Me →
              </button>
            </form>
          )}
          <p className="notify-disclaimer">
            we'll only text when it's your turn. no spam. promise.
          </p>
        </div>

        <div className="invite-explainer">
          <h4 className="invite-explainer-title">What is Rekindle?</h4>
          <p className="invite-explainer-text">
            A 7-day game where two people answer meaningful questions about each other.
            One prompt per day. Take turns. Be real.
          </p>
        </div>
      </div>
    </div>
  )
}
