import { useEffect, useState, useRef } from 'react'

export default function FireAnimation({ size = 'medium', interactive = false }) {
  const [embers, setEmbers] = useState([])
  const emberIdRef = useRef(0)

  const sizes = {
    small: { width: 60, height: 80 },
    medium: { width: 90, height: 120 },
    large: { width: 120, height: 160 }
  }

  const { width, height } = sizes[size] || sizes.medium

  // Generate embers periodically
  useEffect(() => {
    const createEmber = () => {
      const id = emberIdRef.current++
      const ember = {
        id,
        x: 20 + Math.random() * 60, // Random x position (percentage)
        size: 2 + Math.random() * 3,
        duration: 1.5 + Math.random() * 1,
        delay: Math.random() * 0.5
      }
      setEmbers(prev => [...prev.slice(-8), ember]) // Keep max 8 embers
    }

    const interval = setInterval(createEmber, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`fire-container ${interactive ? 'interactive' : ''}`}
      style={{ width, height }}
    >
      <svg
        viewBox="0 0 100 130"
        width={width}
        height={height}
        className="fire-svg"
      >
        <defs>
          {/* Gradients for flames */}
          <linearGradient id="flameGradient1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FF4500" />
            <stop offset="40%" stopColor="#FF6B35" />
            <stop offset="70%" stopColor="#FFB347" />
            <stop offset="100%" stopColor="#FFE4B5" />
          </linearGradient>

          <linearGradient id="flameGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#E85D04" />
            <stop offset="50%" stopColor="#FF8C42" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>

          <linearGradient id="flameGradient3" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#DC2F02" />
            <stop offset="60%" stopColor="#FF6B35" />
            <stop offset="100%" stopColor="#FFBA49" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="fireGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
          </filter>
        </defs>

        {/* Outer glow */}
        <ellipse
          cx="50"
          cy="110"
          rx="35"
          ry="15"
          fill="rgba(255, 107, 53, 0.4)"
          filter="url(#softGlow)"
          className="fire-base-glow"
        />

        {/* Back flame layer - slowest */}
        <path
          className="flame flame-back"
          d="M50 110
             Q30 90 35 70
             Q40 50 50 30
             Q60 50 65 70
             Q70 90 50 110"
          fill="url(#flameGradient3)"
          opacity="0.6"
        />

        {/* Middle flame layer */}
        <path
          className="flame flame-mid"
          d="M50 110
             Q35 85 40 65
             Q45 45 50 25
             Q55 45 60 65
             Q65 85 50 110"
          fill="url(#flameGradient2)"
          opacity="0.8"
        />

        {/* Front flame layer - fastest */}
        <path
          className="flame flame-front"
          d="M50 110
             Q38 80 42 60
             Q46 40 50 20
             Q54 40 58 60
             Q62 80 50 110"
          fill="url(#flameGradient1)"
          filter="url(#fireGlow)"
        />

        {/* Left tongue */}
        <path
          className="flame flame-tongue-left"
          d="M45 110
             Q30 95 32 80
             Q34 65 40 55
             Q46 70 48 85
             Q50 100 45 110"
          fill="url(#flameGradient2)"
          opacity="0.7"
        />

        {/* Right tongue */}
        <path
          className="flame flame-tongue-right"
          d="M55 110
             Q70 95 68 80
             Q66 65 60 55
             Q54 70 52 85
             Q50 100 55 110"
          fill="url(#flameGradient2)"
          opacity="0.7"
        />

        {/* Inner bright core */}
        <path
          className="flame flame-core"
          d="M50 110
             Q42 90 45 75
             Q48 60 50 50
             Q52 60 55 75
             Q58 90 50 110"
          fill="#FFE4B5"
          opacity="0.9"
        />

        {/* Ember particles */}
        {embers.map(ember => (
          <circle
            key={ember.id}
            className="ember"
            cx={ember.x}
            cy="100"
            r={ember.size}
            fill="#FF6B35"
            style={{
              '--ember-duration': `${ember.duration}s`,
              '--ember-delay': `${ember.delay}s`,
              '--ember-x': `${(Math.random() - 0.5) * 20}px`
            }}
          />
        ))}

        {/* Small sparks */}
        <circle className="spark spark-1" cx="45" cy="70" r="1.5" fill="#FFE4B5" />
        <circle className="spark spark-2" cx="55" cy="65" r="1" fill="#FFD700" />
        <circle className="spark spark-3" cx="50" cy="55" r="1.2" fill="#FFBA49" />
      </svg>
    </div>
  )
}
