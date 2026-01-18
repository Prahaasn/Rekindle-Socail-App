import { useState } from 'react'
import { Contacts } from '@capacitor-community/contacts'

export default function useContactPicker() {
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const pickContact = async () => {
    setLoading(true)
    setError(null)

    try {
      // Request permission first
      const permResult = await Contacts.requestPermissions()

      if (permResult.contacts !== 'granted') {
        setError('Contact permission denied')
        setLoading(false)
        return null
      }

      // Pick a contact
      const result = await Contacts.pickContact({
        projection: {
          name: true,
          phones: true,
        }
      })

      if (result && result.contact) {
        const contactData = {
          name: result.contact.name?.display ||
                result.contact.name?.given ||
                'Unknown',
          phone: result.contact.phones?.[0]?.number || ''
        }
        setContact(contactData)
        setLoading(false)
        return contactData
      }
    } catch (err) {
      console.error('Contact picker error:', err)
      // Fallback for web/simulator without contacts
      if (err.message?.includes('not implemented') || err.message?.includes('not available')) {
        setError('Contact picker not available in simulator. Please enter manually.')
      } else {
        setError(err.message || 'Failed to pick contact')
      }
    }

    setLoading(false)
    return null
  }

  const clearContact = () => {
    setContact(null)
    setError(null)
  }

  return {
    contact,
    loading,
    error,
    pickContact,
    clearContact
  }
}
