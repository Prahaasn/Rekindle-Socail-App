export function encodeState(state) {
  try {
    const json = JSON.stringify(state)
    return btoa(encodeURIComponent(json))
  } catch (e) {
    console.error('Failed to encode state:', e)
    return null
  }
}

export function decodeState(encoded) {
  try {
    const json = decodeURIComponent(atob(encoded))
    return JSON.parse(json)
  } catch (e) {
    console.error('Failed to decode state:', e)
    return null
  }
}

export function createShareUrl(state) {
  const encoded = encodeState(state)
  if (!encoded) return null

  const baseUrl = window.location.origin + window.location.pathname
  return `${baseUrl}?s=${encoded}`
}

export function getStateFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const encoded = params.get('s')
  if (!encoded) return null
  return decodeState(encoded)
}
