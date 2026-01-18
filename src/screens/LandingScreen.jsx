import { useState } from 'react'
import Logo from '../components/Logo'
import Icon from '../components/Icons'

export default function LandingScreen({ onStart }) {
  const [myName, setMyName] = useState('')
  const [partnerName, setPartnerName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (myName.trim() && partnerName.trim()) {
      onStart(myName.trim(), partnerName.trim())
    }
  }

  const isValid = myName.trim() && partnerName.trim()

  return (
    <div className="screen landing-screen">
      <div className="landing-content">
        <Logo size="large" />

        <p className="landing-tagline">7 days to reconnect</p>

        <form className="landing-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              id="myName"
              type="text"
              value={myName}
              onChange={(e) => setMyName(e.target.value)}
              placeholder=" "
              autoComplete="off"
            />
            <label htmlFor="myName">Your name</label>
          </div>

          <div className="input-group">
            <input
              id="partnerName"
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder=" "
              autoComplete="off"
            />
            <label htmlFor="partnerName">Their name</label>
          </div>

          <button
            type="submit"
            className="primary-button"
            disabled={!isValid}
          >
            Begin Journey
            <Icon name="arrow" size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}
