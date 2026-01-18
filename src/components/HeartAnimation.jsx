import { useEffect, useState } from 'react'

export default function HeartAnimation({ size = 'medium' }) {
  const sizes = {
    small: { width: 60, height: 55 },
    medium: { width: 100, height: 90 },
    large: { width: 140, height: 126 }
  }

  const { width, height } = sizes[size] || sizes.medium

  return (
    <div className="heart-animation-container">
      <div className="heart-glow" />
      <svg
        className="heart-svg"
        viewBox="0 0 32 29"
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="heart-path"
          d="M16 28.5C16 28.5 1 18.5 1 9.5C1 4.5 5 1 10 1C13 1 15 2.5 16 4.5C17 2.5 19 1 22 1C27 1 31 4.5 31 9.5C31 18.5 16 28.5 16 28.5Z"
          fill="url(#heartGradient)"
          stroke="#be123c"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="heartGradient" x1="16" y1="1" x2="16" y2="28.5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="50%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
