import { useState, useEffect, memo, useRef, useCallback } from 'react'

// Lighter fire colors for the light theme
const FIRE_COLORS = [
  'transparent',
  '#fff5f0',    // Very light pink
  '#ffe4d6',    // Light peach
  '#ffc9a8',    // Soft peach
  '#ffaa7a',    // Light orange
  '#ff8c4d',    // Orange
  '#ff7733',    // Bright orange
  '#ff6600',    // Deep orange
  '#ff9933',    // Golden orange
  '#ffcc66'     // Light golden
]

const FIRE_WIDTH = 8
const FIRE_HEIGHT = 12

function generateFirePixels() {
  const pixels = []

  for (let y = 0; y < FIRE_HEIGHT; y++) {
    for (let x = 0; x < FIRE_WIDTH; x++) {
      let intensity = 0

      if (y >= FIRE_HEIGHT - 2) {
        intensity = 7 + Math.floor(Math.random() * 3)
      } else {
        const distFromCenter = Math.abs(x - FIRE_WIDTH / 2 + 0.5)
        const heightFactor = (FIRE_HEIGHT - y) / FIRE_HEIGHT
        const baseProbability = heightFactor * (1 - distFromCenter / (FIRE_WIDTH / 2))

        if (Math.random() < baseProbability * 0.9) {
          intensity = Math.floor(baseProbability * 9) + Math.floor(Math.random() * 2)
          intensity = Math.min(9, Math.max(0, intensity))
        }
      }

      pixels.push(intensity)
    }
  }

  return pixels
}

const PixelFire = memo(function PixelFire({ size = 'medium' }) {
  const [pixels, setPixels] = useState(() => generateFirePixels())
  const rafRef = useRef(null)
  const lastUpdateRef = useRef(0)

  const updatePixels = useCallback((timestamp) => {
    // Throttle to ~10fps (100ms) for performance
    if (timestamp - lastUpdateRef.current >= 100) {
      setPixels(generateFirePixels())
      lastUpdateRef.current = timestamp
    }
    rafRef.current = requestAnimationFrame(updatePixels)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(updatePixels)
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [updatePixels])

  const pixelSize = size === 'small' ? 3 : size === 'large' ? 6 : 4
  const width = FIRE_WIDTH * pixelSize
  const height = FIRE_HEIGHT * pixelSize

  return (
    <div
      className="pixel-fire-container"
      style={{
        width,
        height,
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    >
      <div className="pixel-fire-glow" />
      <div
        className="pixel-fire-grid"
        style={{
          width,
          height,
          display: 'grid',
          gridTemplateColumns: `repeat(${FIRE_WIDTH}, ${pixelSize}px)`,
          gridTemplateRows: `repeat(${FIRE_HEIGHT}, ${pixelSize}px)`,
          willChange: 'contents'
        }}
      >
        {pixels.map((intensity, i) => (
          <div
            key={i}
            style={{
              backgroundColor: FIRE_COLORS[intensity],
              width: pixelSize,
              height: pixelSize
            }}
          />
        ))}
      </div>
    </div>
  )
})

export default PixelFire
