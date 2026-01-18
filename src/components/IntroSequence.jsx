import React, { useState, useEffect } from 'react';
import './IntroSequence.css';

const IntroSequence = ({ onComplete }) => {
  const [phase, setPhase] = useState('text'); // text | text-exit | heart | transition | done

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('text-exit'), 1500),
      setTimeout(() => setPhase('heart'), 2000),
      setTimeout(() => setPhase('transition'), 4500),
      setTimeout(() => {
        setPhase('done');
        onComplete?.();
      }, 5500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('done');
    onComplete?.();
  };

  if (phase === 'done') return null;

  return (
    <div
      className={`intro-container intro-phase-${phase}`}
      onClick={handleSkip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleSkip()}
    >
      {/* Text Phase */}
      {(phase === 'text' || phase === 'text-exit') && (
        <h1 className={`intro-text ${phase === 'text-exit' ? 'fade-out' : ''}`}>
          rekindle.
        </h1>
      )}

      {/* Heart Phase */}
      {(phase === 'heart' || phase === 'transition') && (
        <div className={`intro-heart ${phase === 'transition' ? 'fade-out' : ''}`}>
          💝
        </div>
      )}

      {/* Skip Hint */}
      {phase !== 'transition' && (
        <p className="intro-skip-hint">tap to skip</p>
      )}
    </div>
  );
};

export default IntroSequence;
