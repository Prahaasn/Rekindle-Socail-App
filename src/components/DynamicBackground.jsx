import { useEffect, useState, useRef } from 'react'

export default function DynamicBackground({ intensity = 'normal' }) {
  const [particles, setParticles] = useState([])
  const particleIdRef = useRef(0)

  useEffect(() => {
    if (intensity === 'none') return

    const interval = setInterval(() => {
      const newParticle = {
        id: particleIdRef.current++,
        x: Math.random() * 100,
        y: 100 + Math.random() * 20,
        size: 2 + Math.random() * 4,
        duration: 8 + Math.random() * 6,
        delay: Math.random() * 2,
        drift: (Math.random() - 0.5) * 30
      }

      setParticles(prev => {
        const filtered = prev.filter(p => Date.now() - p.createdAt < 15000)
        return [...filtered, { ...newParticle, createdAt: Date.now() }]
      })
    }, intensity === 'subtle' ? 2000 : 1000)

    return () => clearInterval(interval)
  }, [intensity])

  return (
    <div className="dynamic-background">
      <div className="gradient-mesh" />
      <div className="particle-layer">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="floating-particle"
            style={{
              '--x': `${particle.x}%`,
              '--drift': `${particle.drift}px`,
              '--size': `${particle.size}px`,
              '--duration': `${particle.duration}s`,
              '--delay': `${particle.delay}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}
