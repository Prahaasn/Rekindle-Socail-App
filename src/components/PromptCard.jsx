import Icon from './Icons'

export default function PromptCard({ prompt }) {
  return (
    <div className="prompt-card">
      <div className="prompt-icon">
        <Icon name={prompt.icon} size={28} />
      </div>
      <p className="prompt-text">{prompt.prompt}</p>
      <span className="prompt-theme">{prompt.theme}</span>
    </div>
  )
}
