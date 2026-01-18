import { useState } from 'react'
import { useAppStore } from '../hooks/useAppStore'
import FireAnimation from '../components/FireAnimation'
import Icon from '../components/Icons'

const STEPS = [
  {
    id: 'welcome',
    title: 'Rekindle',
    subtitle: '7 days to reconnect',
    description: 'A gentle journey back to the people who matter most.'
  },
  {
    id: 'how',
    title: 'How it works',
    steps: [
      { icon: 'flame', text: 'Start a 7-day journey with someone' },
      { icon: 'thought', text: 'Answer one prompt each day' },
      { icon: 'heart', text: 'Share your responses and grow closer' }
    ]
  },
  {
    id: 'name',
    title: 'What should we call you?',
    subtitle: 'This is how you\'ll appear to others'
  }
]

export default function OnboardingScreen() {
  const { completeOnboarding } = useAppStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [name, setName] = useState('')

  const step = STEPS[currentStep]
  const isLastStep = currentStep === STEPS.length - 1

  const handleNext = () => {
    if (isLastStep) {
      if (name.trim()) {
        completeOnboarding(name.trim())
      }
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <div className="screen onboarding-screen">
      <div className="onboarding-content">
        {step.id === 'welcome' && (
          <div className="onboarding-step animate-slide-up">
            <div className="onboarding-fire">
              <FireAnimation size="large" interactive />
            </div>
            <h1 className="onboarding-title">{step.title}</h1>
            <p className="onboarding-subtitle">{step.subtitle}</p>
            <p className="onboarding-description">{step.description}</p>
          </div>
        )}

        {step.id === 'how' && (
          <div className="onboarding-step animate-slide-up">
            <h1 className="onboarding-title">{step.title}</h1>
            <div className="onboarding-steps-list">
              {step.steps.map((item, index) => (
                <div key={index} className="onboarding-step-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="onboarding-step-icon">
                    <Icon name={item.icon} size={24} />
                  </div>
                  <p className="onboarding-step-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step.id === 'name' && (
          <div className="onboarding-step animate-slide-up">
            <h1 className="onboarding-title">{step.title}</h1>
            <p className="onboarding-subtitle">{step.subtitle}</p>
            <div className="onboarding-input">
              <div className="input-group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=" "
                  autoComplete="off"
                  autoFocus
                />
                <label>Your name</label>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="onboarding-footer">
        <div className="onboarding-dots">
          {STEPS.map((_, index) => (
            <div
              key={index}
              className={`onboarding-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            />
          ))}
        </div>

        <div className="onboarding-buttons">
          {currentStep > 0 && (
            <button className="secondary-button" onClick={handleBack}>
              Back
            </button>
          )}
          <button
            className="primary-button"
            onClick={handleNext}
            disabled={isLastStep && !name.trim()}
          >
            {isLastStep ? 'Get Started' : 'Continue'}
            <Icon name="arrow" size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
