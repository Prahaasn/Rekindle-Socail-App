import './ProgressJourney.css'

export default function ProgressJourney({ currentDay, totalDays = 7 }) {
  return (
    <div className="progress-journey">
      <div className="progress-label">Day {currentDay} of {totalDays}</div>
      <div className="progress-dots">
        {Array.from({ length: totalDays }, (_, i) => {
          const dayNum = i + 1
          const isCompleted = dayNum < currentDay
          const isActive = dayNum === currentDay

          return (
            <span
              key={i}
              className={`progress-dot ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
            />
          )
        })}
      </div>
    </div>
  )
}
