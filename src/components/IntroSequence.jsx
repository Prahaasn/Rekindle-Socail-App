import { useState, useEffect, useCallback } from 'react'

/**
 * IntroSequence - Timed intro sequence with phase transitions
 *
 * Phases:
 *   'text'       → Show "rekindle." text (0s - 2s)
 *   'heart'      → Show heart emoji (2s - 4.5s)
 *   'transition' → Background transition (4.5s - 5.5s)
 *   'complete'   → Intro done
 *
 * Total duration: 5.5 seconds (skippable via click or keypress)
 */
export default function IntroSequence({ onComplete }) {
  const [phase, setPhase] = useState('text')

  // Timing logic - auto-advance through phases
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('heart'), 2000),      // 2s: text → heart
      setTimeout(() => setPhase('transition'), 4500), // 4.5s: heart → transition
      setTimeout(() => {
        setPhase('complete')
        onComplete()
      }, 5500),                                        // 5.5s: transition → complete
    ]

    // Cleanup all timers on unmount
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  // Skip handler - immediately complete the intro
  const handleSkip = useCallback(() => {
    setPhase('complete')
    onComplete()
  }, [onComplete])

  // Skip on any keypress
  useEffect(() => {
    const handleKeyDown = () => handleSkip()
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSkip])

  // Don't render anything once complete
  if (phase === 'complete') return null

  return (
    <div className="intro-container" onClick={handleSkip}>
      {phase === 'text' && (
        <h1 className="intro-text">rekindle.</h1>
      )}

      {phase === 'heart' && (
        <div className="intro-heart">💝</div>
      )}

      {phase === 'transition' && (
        <div className="intro-transition" />
      )}

      <p className="intro-skip-hint">tap to skip</p>
    </div>
  )
}
