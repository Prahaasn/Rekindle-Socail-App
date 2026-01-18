import PixelFire from './PixelFire'
import './Logo.css'

export default function Logo({ size = 'medium', showFire = true, showTagline = false }) {
  const sizeClass = `logo-text--${size}`

  return (
    <div className="logo-container">
      <h1 className={`logo-text ${sizeClass}`}>
        rekindle
      </h1>
      {showFire && (
        <div className="logo-fire">
          <PixelFire size={size === 'large' ? 'medium' : 'small'} />
        </div>
      )}
      {showTagline && (
        <p className="logo-tagline">seven days to reconnect</p>
      )}
    </div>
  )
}
