import { memo } from 'react'

const ProgressJourney = memo(function ProgressJourney({ currentDay, totalDays = 7 }) {
  return (
    <div className="progress-journey">
      <div className="progress-label">Day {currentDay} of {totalDays}</div>
      <div className="progress-dots">
        {Array.from({ length: totalDays }, (_, i) => (
          <span
            key={i}
            className={`progress-dot ${i < currentDay ? 'filled' : 'empty'}`}
          >
            {i < currentDay ? '●' : '○'}
          </span>
        ))}
      </div>
    </div>
  )
})

export default ProgressJourney
