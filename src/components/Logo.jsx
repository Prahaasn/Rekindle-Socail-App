import FireAnimation from './FireAnimation'

export default function Logo({ size = 'medium', showFire = true }) {
  return (
    <div className="logo">
      {showFire && (
        <div className="logo-fire">
          <FireAnimation size={size} interactive />
        </div>
      )}
      <h1 className={`logo-text ${size}`}>
        Rekindle
      </h1>
    </div>
  )
}
