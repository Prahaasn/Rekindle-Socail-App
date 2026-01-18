import { useState, useEffect } from 'react'
import { PROMPTS } from '../lib/prompts'

const STORAGE_KEY = 'rekindle_journeys'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function useJourneyStore() {
  const [journeys, setJourneys] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        return []
      }
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(journeys))
  }, [journeys])

  const createJourney = (personId) => {
    const newJourney = {
      id: generateId(),
      personId,
      status: 'active',
      currentDay: 1,
      currentTurn: 'sender',
      responses: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      completedAt: null
    }
    setJourneys(prev => [...prev, newJourney])
    return newJourney
  }

  const getJourneyById = (id) => {
    return journeys.find(j => j.id === id)
  }

  const getJourneysForPerson = (personId) => {
    return journeys.filter(j => j.personId === personId)
  }

  const getActiveJourneys = () => {
    return journeys.filter(j => j.status === 'active' || j.status === 'waiting')
  }

  const getCompletedJourneys = () => {
    return journeys.filter(j => j.status === 'completed')
  }

  const submitResponse = (journeyId, responseText) => {
    setJourneys(prev => prev.map(journey => {
      if (journey.id !== journeyId) return journey

      const newResponses = [
        ...journey.responses,
        {
          day: journey.currentDay,
          turn: journey.currentTurn,
          text: responseText,
          timestamp: Date.now()
        }
      ]

      const totalResponses = newResponses.length
      const newDay = Math.floor(totalResponses / 2) + 1
      const newTurn = journey.currentTurn === 'sender' ? 'receiver' : 'sender'
      const isComplete = totalResponses >= 14

      return {
        ...journey,
        responses: newResponses,
        currentDay: Math.min(newDay, 7),
        currentTurn: newTurn,
        status: isComplete ? 'completed' : 'waiting',
        updatedAt: Date.now(),
        completedAt: isComplete ? Date.now() : null
      }
    }))
  }

  const markAsActive = (journeyId) => {
    setJourneys(prev => prev.map(journey => {
      if (journey.id !== journeyId) return journey
      return {
        ...journey,
        status: 'active',
        updatedAt: Date.now()
      }
    }))
  }

  const archiveJourney = (journeyId) => {
    setJourneys(prev => prev.map(journey => {
      if (journey.id !== journeyId) return journey
      return {
        ...journey,
        status: 'archived',
        updatedAt: Date.now()
      }
    }))
  }

  const deleteJourney = (journeyId) => {
    setJourneys(prev => prev.filter(j => j.id !== journeyId))
  }

  const getCurrentPrompt = (journey) => {
    if (!journey) return PROMPTS[0]
    return PROMPTS[journey.currentDay - 1] || PROMPTS[0]
  }

  return {
    journeys,
    createJourney,
    getJourneyById,
    getJourneysForPerson,
    getActiveJourneys,
    getCompletedJourneys,
    submitResponse,
    markAsActive,
    archiveJourney,
    deleteJourney,
    getCurrentPrompt
  }
}
