import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'rekindle_app'

const DEFAULT_STATE = {
  user: {
    name: '',
    onboarded: false
  }
}

const AppContext = createContext(null)

export function AppStoreProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return { ...DEFAULT_STATE, ...JSON.parse(saved) }
      } catch (e) {
        return DEFAULT_STATE
      }
    }
    return DEFAULT_STATE
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const setUserName = (name) => {
    setState(prev => ({
      ...prev,
      user: { ...prev.user, name }
    }))
  }

  const completeOnboarding = (name) => {
    setState(prev => ({
      ...prev,
      user: { name, onboarded: true }
    }))
  }

  const resetApp = () => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('rekindle_people')
    localStorage.removeItem('rekindle_journeys')
    setState(DEFAULT_STATE)
  }

  const value = {
    user: state.user,
    hasOnboarded: state.user.onboarded,
    setUserName,
    completeOnboarding,
    resetApp
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppStore() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppStore must be used within AppStoreProvider')
  }
  return context
}
