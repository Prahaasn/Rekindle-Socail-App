import { useState, useEffect } from 'react'

const STORAGE_KEY = 'rekindle_people'

const AVATAR_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
  '#BB8FCE', '#85C1E9', '#F8B500', '#E74C3C'
]

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function stringToColor(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function usePeopleStore() {
  const [people, setPeople] = useState(() => {
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(people))
  }, [people])

  const addPerson = (name, phone = '') => {
    const newPerson = {
      id: generateId(),
      name: name.trim(),
      phone: phone.trim(),
      avatar: {
        initials: getInitials(name),
        color: stringToColor(name)
      },
      createdAt: Date.now()
    }
    setPeople(prev => [...prev, newPerson])
    return newPerson
  }

  const getPersonById = (id) => {
    return people.find(p => p.id === id)
  }

  const updatePerson = (id, updates) => {
    setPeople(prev => prev.map(person => {
      if (person.id !== id) return person
      const updated = { ...person, ...updates }
      if (updates.name) {
        updated.avatar = {
          initials: getInitials(updates.name),
          color: stringToColor(updates.name)
        }
      }
      return updated
    }))
  }

  const deletePerson = (id) => {
    setPeople(prev => prev.filter(p => p.id !== id))
  }

  const searchPeople = (query) => {
    const lower = query.toLowerCase()
    return people.filter(p =>
      p.name.toLowerCase().includes(lower) ||
      (p.phone && p.phone.includes(query))
    )
  }

  return {
    people,
    addPerson,
    getPersonById,
    updatePerson,
    deletePerson,
    searchPeople
  }
}
