import { useState } from 'react'
import Logo from '../components/Logo'

export default function LandingScreen({ onStart }) {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name1.trim() && name2.trim()) {
      onStart(name1.trim(), name2.trim())
    }
  }

  return (
    <div className="screen landing-screen">
      <div className="landing-content">
        <Logo size="large" />

        <p className="landing-tagline">7 days to reconnect</p>

        <form className="landing-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name1">Your name</label>
            <input
              id="name1"
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder="Enter your name"
              autoComplete="off"
            />
          </div>

          <div className="input-group">
            <label htmlFor="name2">Their name</label>
            <input
              id="name2"
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder="Enter their name"
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            className="primary-button"
            disabled={!name1.trim() || !name2.trim()}
          >
            Begin Journey
          </button>
        </form>
      </div>
    </div>
  )
}
