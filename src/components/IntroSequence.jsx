import { useState, useEffect, useCallback } from 'react'

export default function IntroSequence({ onComplete }) {
  const [phase, setPhase] = useState('text') // 'text' | 'text-exit' | 'heart' | 'transition' | 'done'

  const handleSkip = useCallback(() => {
    setPhase('done')
    onComplete()
  }, [onComplete])

  useEffect(() => {
    // Phase 1: Text visible for 1.5s, then fade out
    const timer1 = setTimeout(() => setPhase('text-exit'), 1500)

    // Phase 2: Heart appears at 2s
    const timer2 = setTimeout(() => setPhase('heart'), 2000)

    // Phase 3: Transition starts at 4.5s
    const timer3 = setTimeout(() => setPhase('transition'), 4500)

    // Complete at 5.5s
    const timer4 = setTimeout(() => {
      setPhase('done')
      onComplete()
    }, 5500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  // Handle keyboard skip
  useEffect(() => {
    const handleKeyDown = () => handleSkip()
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
      {/* Text Phase */}
      {(phase === 'text' || phase === 'text-exit') && (
        <h1 className={`intro-text ${phase === 'text-exit' ? 'fade-out' : ''}`}>
          rekindle.
        </h1>
      )}

      {/* Heart Phase */}
      {phase === 'heart' && (
        <div className="intro-heart-wrapper">
          <div className="intro-heart-glow" />
          <span className="intro-heart">💝</span>
        </div>
      )}

      {/* Skip hint - visible in all phases except transition */}
      {phase !== 'transition' && (
        <p className="intro-skip-hint">tap to skip</p>
      )}
    </div>
  )
}
