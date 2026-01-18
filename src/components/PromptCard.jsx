import { memo } from 'react'

const PromptCard = memo(function PromptCard({ prompt }) {
  return (
    <div className="prompt-card">
      <div className="prompt-emoji">{prompt.emoji}</div>
      <p className="prompt-text">{prompt.prompt}</p>
      <span className="prompt-theme">{prompt.theme}</span>
    </div>
  )
})

export default PromptCard
