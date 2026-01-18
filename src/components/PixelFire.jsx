import { useState, useEffect } from 'react'

const FIRE_COLORS = [
  'transparent',
  '#1a0505',
  '#4a1010',
  '#8b2020',
  '#cc4400',
  '#ff6600',
  '#ff9900',
  '#ffcc00',
  '#ffff66',
  '#ffffff'
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

      pixels.push({
        x,
        y,
        color: FIRE_COLORS[intensity]
      })
    }
  }

  return pixels
}

export default function PixelFire({ size = 'medium' }) {
  const [pixels, setPixels] = useState(() => generateFirePixels())

  useEffect(() => {
    const interval = setInterval(() => {
      setPixels(generateFirePixels())
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const pixelSize = size === 'small' ? 3 : size === 'large' ? 6 : 4
  const width = FIRE_WIDTH * pixelSize
  const height = FIRE_HEIGHT * pixelSize

  return (
    <div className="pixel-fire-container" style={{ width, height }}>
      <div className="pixel-fire-glow" />
      <div
        className="pixel-fire-grid"
        style={{
          width,
          height,
          display: 'grid',
          gridTemplateColumns: `repeat(${FIRE_WIDTH}, ${pixelSize}px)`,
          gridTemplateRows: `repeat(${FIRE_HEIGHT}, ${pixelSize}px)`
        }}
      >
        {pixels.map((pixel, i) => (
          <div
            key={i}
            style={{
              backgroundColor: pixel.color,
              width: pixelSize,
              height: pixelSize
            }}
          />
        ))}
      </div>
    </div>
  )
}
