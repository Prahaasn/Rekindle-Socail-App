import { useState, useEffect, useCallback, useMemo } from 'react'

// Floating ember particle component
function EmberParticle({ delay, duration, startX, startY }) {
  const style = useMemo(() => ({
    '--delay': `${delay}s`,
    '--duration': `${duration}s`,
    '--start-x': `${startX}px`,
    '--start-y': `${startY}px`,
  }), [delay, duration, startX, startY])

  return <div className="intro-ember" style={style} />
}

// Generate random particles around heart
function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    startX: (Math.random() - 0.5) * 120,
    startY: (Math.random() - 0.5) * 80 + 20,
  }))
}

export default function IntroSequence({ onComplete }) {
  const [phase, setPhase] = useState('text') // 'text' | 'text-exit' | 'heart' | 'heart-exit' | 'transition' | 'done'
  const [particles] = useState(() => generateParticles(12))

  const handleSkip = useCallback(() => {
    setPhase('done')
    onComplete()
  }, [onComplete])

  useEffect(() => {
    const timers = [
      // Phase 1: Text visible for 1.7s, then start fade out
      setTimeout(() => setPhase('text-exit'), 1700),

      // Phase 2: Heart appears at 2.2s (slight overlap for smoothness)
      setTimeout(() => setPhase('heart'), 2200),

      // Heart exit at 4.3s
      setTimeout(() => setPhase('heart-exit'), 4300),

      // Phase 3: Transition starts at 4.6s
      setTimeout(() => setPhase('transition'), 4600),

      // Complete at 5.6s
      setTimeout(() => {
        setPhase('done')
        onComplete()
      }, 5600),
    ]

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  // Handle keyboard skip
  useEffect(() => {
    const handleKeyDown = () => handleSkip()
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSkip])

  if (phase === 'done') return null

  const letters = 'rekindle.'.split('')
  const isTextPhase = phase === 'text' || phase === 'text-exit'
  const isHeartPhase = phase === 'heart' || phase === 'heart-exit'

  return (
    <div
      className={`intro-container ${phase === 'transition' ? 'transitioning' : ''}`}
      onClick={handleSkip}
      role="button"
      tabIndex={0}
      aria-label="Skip intro"
    >
      {/* Ambient glow background */}
      <div className="intro-ambient-glow" />

      {/* Text Phase - Letter by letter */}
      {isTextPhase && (
        <h1 className={`intro-text ${phase === 'text-exit' ? 'fade-out' : ''}`}>
          {letters.map((letter, index) => (
            <span
              key={index}
              className="intro-letter"
              style={{ '--letter-index': index }}
            >
              {letter}
            </span>
          ))}
        </h1>
      )}

      {/* Heart Phase */}
      {isHeartPhase && (
        <div className={`intro-heart-wrapper ${phase === 'heart-exit' ? 'fade-out' : ''}`}>
          {/* Multiple layered glows for depth */}
          <div className="intro-heart-glow intro-heart-glow-outer" />
          <div className="intro-heart-glow intro-heart-glow-inner" />

          {/* Floating ember particles */}
          <div className="intro-particles">
            {particles.map(p => (
              <EmberParticle key={p.id} {...p} />
            ))}
          </div>

          {/* The heart */}
          <span className="intro-heart">💝</span>
        </div>
      )}

      {/* Skip hint - visible in text and heart phases */}
      {(isTextPhase || isHeartPhase) && (
        <p className="intro-skip-hint">tap to skip</p>
      )}
    </div>
  )
}
