import { useNavigate } from 'react-router-dom'
import { useJourneyStore } from '../hooks/useJourneyStore'
import { usePeopleStore } from '../hooks/usePeopleStore'
import Avatar from '../components/Avatar'
import Icon from '../components/Icons'
import EmptyState from '../components/EmptyState'

function formatDate(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export default function HistoryScreen() {
  const navigate = useNavigate()
  const { getCompletedJourneys } = useJourneyStore()
  const { getPersonById } = usePeopleStore()

  const completedJourneys = getCompletedJourneys()

  const handleJourneyClick = (journey) => {
    navigate(`/journey/${journey.id}`)
  }

  return (
    <div className="screen history-screen">
      <header className="history-header">
        <h1 className="screen-title">History</h1>
      </header>

      <main className="history-main">
        {completedJourneys.length > 0 ? (
          <div className="history-list">
            {completedJourneys.map(journey => {
              const person = getPersonById(journey.personId)
              return (
                <div
                  key={journey.id}
                  className="history-card"
                  onClick={() => handleJourneyClick(journey)}
                >
                  <Avatar person={person} size="medium" />
                  <div className="history-card-content">
                    <h3 className="history-card-name">{person?.name || 'Unknown'}</h3>
                    <p className="history-card-date">
                      Completed {formatDate(journey.completedAt)}
                    </p>
                    <div className="history-card-badge">
                      <Icon name="check" size={14} />
                      7 days complete
                    </div>
                  </div>
                  <Icon name="chevron" size={20} className="history-card-arrow" />
                </div>
              )
            })}
          </div>
        ) : (
          <EmptyState
            type="noHistory"
            action={() => navigate('/')}
            actionLabel="Start a Journey"
          />
        )}
      </main>
    </div>
  )
}
