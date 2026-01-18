import PixelFire from './PixelFire'

export default function Logo({ size = 'medium', showFire = true }) {
  const fontSize = size === 'small' ? '1.5rem' : size === 'large' ? '3rem' : '2.25rem'

  return (
    <div className="logo">
      <h1 className="logo-text" style={{ fontSize }}>
        rekindle
      </h1>
      {showFire && (
        <div className="logo-fire">
          <PixelFire size={size} />
        </div>
      )}
    </div>
  )
}
