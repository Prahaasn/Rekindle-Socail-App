import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePeopleStore } from '../hooks/usePeopleStore'
import { useJourneyStore } from '../hooks/useJourneyStore'
import Icon from '../components/Icons'
import Avatar from '../components/Avatar'
import EmptyState from '../components/EmptyState'

export default function PeopleScreen() {
  const navigate = useNavigate()
  const { people, addPerson, deletePerson, searchPeople } = usePeopleStore()
  const { getJourneysForPerson, createJourney } = useJourneyStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newPersonName, setNewPersonName] = useState('')
  const [selectedPerson, setSelectedPerson] = useState(null)

  const displayedPeople = searchQuery ? searchPeople(searchQuery) : people

  const getPersonStats = (personId) => {
    const journeys = getJourneysForPerson(personId)
    const active = journeys.find(j => j.status === 'active' || j.status === 'waiting')
    const completed = journeys.filter(j => j.status === 'completed').length
    return { total: journeys.length, active, completed }
  }

  const handleAddPerson = () => {
    if (newPersonName.trim()) {
      addPerson(newPersonName.trim())
      setShowAddModal(false)
      setNewPersonName('')
    }
  }

  const handlePersonClick = (person) => {
    setSelectedPerson(person)
  }

  const handleStartJourney = (person) => {
    const journey = createJourney(person.id)
    navigate(`/journey/${journey.id}`)
  }

  const handleDeletePerson = (personId) => {
    deletePerson(personId)
    setSelectedPerson(null)
  }

  return (
    <div className="screen people-screen">
      <header className="people-header">
        <h1 className="screen-title">People</h1>
        <button
          className="icon-button-filled"
          onClick={() => setShowAddModal(true)}
        >
          <Icon name="plus" size={20} />
        </button>
      </header>

      <div className="search-container">
        <Icon name="search" size={18} className="search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search people..."
          className="search-input"
        />
      </div>

      <main className="people-main">
        {displayedPeople.length > 0 ? (
          <div className="people-list">
            {displayedPeople.map(person => {
              const stats = getPersonStats(person.id)
              return (
                <div
                  key={person.id}
                  className="person-card"
                  onClick={() => handlePersonClick(person)}
                >
                  <Avatar person={person} size="medium" />
                  <div className="person-card-content">
                    <h3 className="person-card-name">{person.name}</h3>
                    <p className="person-card-stats">
                      {stats.total === 0 && 'No journeys yet'}
                      {stats.total > 0 && `${stats.total} journey${stats.total > 1 ? 's' : ''}`}
                      {stats.active && ' • Active'}
                      {stats.completed > 0 && !stats.active && ` • ${stats.completed} completed`}
                    </p>
                  </div>
                  <Icon name="chevron" size={20} className="person-card-arrow" />
                </div>
              )
            })}
          </div>
        ) : (
          <EmptyState
            type="noPeople"
            action={() => setShowAddModal(true)}
            actionLabel="Add Someone"
          />
        )}
      </main>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Add Person</h2>
            <p className="modal-description">
              Add someone you want to reconnect with.
            </p>

            <div className="input-group">
              <input
                type="text"
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
                placeholder=" "
                autoComplete="off"
                autoFocus
              />
              <label>Their name</label>
            </div>

            <button
              className="primary-button"
              onClick={handleAddPerson}
              disabled={!newPersonName.trim()}
            >
              Add Person
            </button>

            <button
              className="modal-close-button"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {selectedPerson && (
        <div className="modal-overlay" onClick={() => setSelectedPerson(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="person-detail-header">
              <Avatar person={selectedPerson} size="large" />
              <h2 className="modal-title">{selectedPerson.name}</h2>
            </div>

            <div className="person-actions">
              <button
                className="primary-button"
                onClick={() => handleStartJourney(selectedPerson)}
              >
                <Icon name="flame" size={20} />
                Start New Journey
              </button>

              <button
                className="danger-button"
                onClick={() => handleDeletePerson(selectedPerson.id)}
              >
                <Icon name="trash" size={20} />
                Remove Person
              </button>
            </div>

            <button
              className="modal-close-button"
              onClick={() => setSelectedPerson(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
