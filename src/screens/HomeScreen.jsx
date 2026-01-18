import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../hooks/useAppStore'
import { useJourneyStore } from '../hooks/useJourneyStore'
import { usePeopleStore } from '../hooks/usePeopleStore'
import Logo from '../components/Logo'
import Icon from '../components/Icons'
import JourneyCard from '../components/JourneyCard'
import EmptyState from '../components/EmptyState'
import Avatar from '../components/Avatar'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function HomeScreen() {
  const navigate = useNavigate()
  const { user } = useAppStore()
  const { journeys, getActiveJourneys, createJourney } = useJourneyStore()
  const { people, getPersonById, addPerson } = usePeopleStore()

  const [showNewJourneyModal, setShowNewJourneyModal] = useState(false)
  const [newPersonName, setNewPersonName] = useState('')

  const activeJourneys = getActiveJourneys()

  const handleJourneyClick = (journey) => {
    navigate(`/journey/${journey.id}`)
  }

  const handleStartNewJourney = () => {
    if (people.length === 0) {
      setShowNewJourneyModal(true)
    } else {
      setShowNewJourneyModal(true)
    }
  }

  const handleCreateWithNewPerson = () => {
    if (newPersonName.trim()) {
      const person = addPerson(newPersonName.trim())
      const journey = createJourney(person.id)
      setShowNewJourneyModal(false)
      setNewPersonName('')
      navigate(`/journey/${journey.id}`)
    }
  }

  const handleCreateWithExistingPerson = (person) => {
    const journey = createJourney(person.id)
    setShowNewJourneyModal(false)
    navigate(`/journey/${journey.id}`)
  }

  return (
    <div className="screen home-screen">
      <header className="home-header">
        <Logo size="small" showFire={false} />
        <button
          className="icon-button"
          onClick={() => navigate('/settings')}
        >
          <Icon name="settings" size={24} />
        </button>
      </header>

      <main className="home-main">
        <h1 className="home-greeting">
          {getGreeting()}, {user.name || 'friend'}
        </h1>

        {activeJourneys.length > 0 ? (
          <>
            <section className="home-section">
              <h2 className="section-title">Active Journeys</h2>
              <div className="journey-list">
                {activeJourneys.map(journey => (
                  <JourneyCard
                    key={journey.id}
                    journey={journey}
                    person={getPersonById(journey.personId)}
                    onClick={() => handleJourneyClick(journey)}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          <EmptyState
            type="noJourneys"
            action={handleStartNewJourney}
            actionLabel="Start Your First Journey"
          />
        )}

        {activeJourneys.length > 0 && (
          <button
            className="new-journey-button"
            onClick={handleStartNewJourney}
          >
            <Icon name="plus" size={20} />
            Start New Journey
          </button>
        )}
      </main>

      {showNewJourneyModal && (
        <div className="modal-overlay" onClick={() => setShowNewJourneyModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-header">
              <h2 className="modal-title">Start a Journey</h2>
              <button className="modal-close" onClick={() => setShowNewJourneyModal(false)}>
                <Icon name="close" size={16} />
              </button>
            </div>

            <div className="modal-body">
              {people.length > 0 && (
                <div className="existing-people-list">
                  {people.map(person => (
                    <button
                      key={person.id}
                      className="person-select-button"
                      onClick={() => handleCreateWithExistingPerson(person)}
                    >
                      <Avatar person={person} size="small" />
                      <span>{person.name}</span>
                      <Icon name="chevron" size={16} />
                    </button>
                  ))}
                </div>
              )}

              {people.length > 0 && (
                <div className="modal-divider">
                  <span>or add someone new</span>
                </div>
              )}

              <div className="input-group">
                <input
                  type="text"
                  value={newPersonName}
                  onChange={(e) => setNewPersonName(e.target.value)}
                  placeholder="Their name"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="primary-button"
                onClick={handleCreateWithNewPerson}
                disabled={!newPersonName.trim()}
              >
                Start Journey
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
