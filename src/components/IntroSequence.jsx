import { useState, useEffect, useCallback } from 'react'

export default function IntroSequence({ onComplete }) {
  const [phase, setPhase] = useState('text') // 'text' | 'heart' | 'transition' | 'done'

  useEffect(() => {
    const timers = [
      // Phase 1 → Phase 2 at 2s
      setTimeout(() => setPhase('heart'), 2000),
      // Phase 2 → Phase 3 at 4.5s
      setTimeout(() => setPhase('transition'), 4500),
      // Phase 3 → Complete at 5.5s
      setTimeout(() => {
        setPhase('done')
        onComplete()
      }, 5500),
    ]

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  // Handle skip via click/tap
  const handleSkip = useCallback(() => {
    setPhase('done')
    onComplete()
  }, [onComplete])

  // Handle skip via keyboard
  useEffect(() => {
    const handleKeyDown = () => {
      handleSkip()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSkip])

  if (phase === 'done') return null

  return (
    <div
      className={`intro-container ${phase === 'transition' ? 'transitioning' : ''}`}
      onClick={handleSkip}
      role="button"
      tabIndex={0}
      aria-label="Skip intro"
    >
      {phase === 'text' && (
        <h1 className="intro-text">rekindle.</h1>
      )}

      {phase === 'heart' && (
        <div className="intro-heart" aria-label="Heart">
          <span className="intro-heart-emoji">💝</span>
          <div className="intro-heart-glow" />
        </div>
      )}

      <p className="intro-skip-hint">tap to skip</p>
    </div>
  )
}
