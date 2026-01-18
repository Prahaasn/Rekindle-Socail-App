import Icon from './Icons'
import FireAnimation from './FireAnimation'

const states = {
  noJourneys: {
    icon: 'flame',
    title: 'No active journeys',
    description: 'Start a new 7-day journey to reconnect with someone special',
    showFire: true
  },
  noPeople: {
    icon: 'contact',
    title: 'No people yet',
    description: 'Add someone you want to reconnect with',
    showFire: false
  },
  noHistory: {
    icon: 'heart',
    title: 'No completed journeys',
    description: 'Your finished journeys will appear here',
    showFire: false
  }
}

export default function EmptyState({ type = 'noJourneys', action, actionLabel }) {
  const state = states[type] || states.noJourneys

  return (
    <div className="empty-state">
      {state.showFire ? (
        <div className="empty-state-fire">
          <FireAnimation size="medium" />
        </div>
      ) : (
        <div className="empty-state-icon">
          <Icon name={state.icon} size={48} />
        </div>
      )}
      <h3 className="empty-state-title">{state.title}</h3>
      <p className="empty-state-description">{state.description}</p>
      {action && (
        <button className="primary-button empty-state-action" onClick={action}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
