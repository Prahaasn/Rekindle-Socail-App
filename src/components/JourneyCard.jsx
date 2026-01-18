import Avatar from './Avatar'
import Icon from './Icons'

function getStatusText(journey, personName) {
  if (journey.status === 'completed') {
    return 'Journey complete'
  }
  if (journey.status === 'waiting') {
    return `Waiting for ${personName}...`
  }
  return 'Your turn'
}

export default function JourneyCard({ journey, person, onClick }) {
  const statusText = getStatusText(journey, person?.name)

  return (
    <div className="journey-card" onClick={onClick}>
      <Avatar person={person} size="medium" />

      <div className="journey-card-content">
        <h3 className="journey-card-name">{person?.name || 'Unknown'}</h3>
        <p className="journey-card-status">
          Day {journey.currentDay} of 7 &bull; {statusText}
        </p>
        <div className="journey-card-progress">
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className={`progress-dot-small ${i < journey.currentDay ? 'filled' : ''} ${i === journey.currentDay - 1 && journey.status === 'active' ? 'current' : ''}`}
            />
          ))}
        </div>
      </div>

      <Icon name="chevron" size={20} className="journey-card-arrow" />
    </div>
  )
}
