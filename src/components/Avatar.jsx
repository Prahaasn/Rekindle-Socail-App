export default function Avatar({ person, size = 'medium', className = '' }) {
  const sizes = {
    small: 32,
    medium: 48,
    large: 64
  }

  const fontSizes = {
    small: '0.75rem',
    medium: '1rem',
    large: '1.25rem'
  }

  const dim = sizes[size] || sizes.medium

  if (!person) {
    return (
      <div
        className={`avatar avatar-${size} avatar-empty ${className}`}
        style={{
          width: dim,
          height: dim,
          fontSize: fontSizes[size]
        }}
      >
        ?
      </div>
    )
  }

  return (
    <div
      className={`avatar avatar-${size} ${className}`}
      style={{
        width: dim,
        height: dim,
        backgroundColor: person.avatar?.color || '#A89890',
        fontSize: fontSizes[size]
      }}
    >
      <span>{person.avatar?.initials || person.name?.[0]?.toUpperCase() || '?'}</span>
    </div>
  )
}
