import './PromptCard.css'

const dayWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']

export default function PromptCard({ prompt }) {
  return (
    <div className="prompt-card">
      <span className="prompt-emoji">{prompt.emoji}</span>
      <p className="prompt-text">"{prompt.prompt}"</p>
      <div className="prompt-divider" />
      <p className="prompt-day">
        day {dayWords[prompt.day - 1]} · {prompt.theme}
      </p>
    </div>
  )
}
