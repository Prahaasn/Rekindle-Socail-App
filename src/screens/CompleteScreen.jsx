import { useState } from 'react'
import Logo from '../components/Logo'
import { PROMPTS } from '../lib/prompts'

export default function CompleteScreen({ gameState, onReset }) {
  const [showResponses, setShowResponses] = useState(false)

  const getResponsePairs = () => {
    const pairs = []
    for (let i = 0; i < PROMPTS.length; i++) {
      const response1 = gameState.responses[i * 2]
      const response2 = gameState.responses[i * 2 + 1]
      if (response1 || response2) {
        pairs.push({
          prompt: PROMPTS[i],
          responses: [
            { name: gameState.names[0], text: response1 },
            { name: gameState.names[1], text: response2 }
          ]
        })
      }
    }
    return pairs
  }

  return (
    <div className="screen complete-screen">
      <div className="complete-content">
        <Logo size="medium" />

        <div className="complete-message">
          <span className="complete-emoji">💝</span>
          <h2>Journey Complete</h2>
          <p>
            {gameState.names[0]} and {gameState.names[1]} spent 7 days reconnecting.
          </p>
        </div>

        <div className="complete-actions">
          <button
            className="primary-button"
            onClick={() => setShowResponses(!showResponses)}
          >
            {showResponses ? 'Hide Responses' : 'View Responses'}
          </button>

          <button className="secondary-button" onClick={onReset}>
            Start New Journey
          </button>
        </div>

        {showResponses && (
          <div className="responses-list">
            {getResponsePairs().map((pair, index) => (
              <div key={index} className="response-pair">
                <div className="response-prompt">
                  <span className="response-emoji">{pair.prompt.emoji}</span>
                  <span className="response-day">Day {pair.prompt.day}</span>
                  <p>{pair.prompt.prompt}</p>
                </div>

                {pair.responses.map((response, rIndex) => (
                  response.text && (
                    <div key={rIndex} className="response-item">
                      <strong>{response.name}:</strong>
                      <p>{response.text}</p>
                    </div>
                  )
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
