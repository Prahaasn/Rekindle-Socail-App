import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAppStore } from './hooks/useAppStore'
import { getStateFromUrl } from './lib/stateEncoder'

// Screens
import OnboardingScreen from './screens/OnboardingScreen'
import HomeScreen from './screens/HomeScreen'
import JourneyScreen from './screens/JourneyScreen'
import PeopleScreen from './screens/PeopleScreen'
import HistoryScreen from './screens/HistoryScreen'

// Legacy screens for shared URL imports
import LandingScreen from './screens/LandingScreen'

// Layout
import AppLayout from './layouts/AppLayout'

export default function App() {
  const { hasOnboarded, user } = useAppStore()

  // Check for shared URL state (legacy support)
  const urlState = getStateFromUrl()
  if (urlState) {
    // For now, just show a message - could be enhanced to import the journey
    // This would require more complex logic to merge into the new data structure
  }

  // Show onboarding if user hasn't completed it
  if (!hasOnboarded) {
    return <OnboardingScreen />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/journey/:id" element={<JourneyScreen />} />
          <Route path="/people" element={<PeopleScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
