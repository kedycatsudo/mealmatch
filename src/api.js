const API_URL = import.meta.env.VITE_API_URL

// Helper function to call backend with JWT (from localStorage)
export function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token')

  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  // Add Authorization if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return fetch(`${API_URL}${endpoint}`, { ...options, headers }).then(
    (response) => {
      if (!response.ok) {
        return response
          .json()
          .then((errData) => {
            const errorMessage =
              errData.message || `API error: ${response.status}`
            throw new Error(errorMessage)
          })
          .catch((err) => {
            console.error(err)
            throw new Error(`API error: ${response.status}`)
          })
      }
      return response.json()
    }
  )
}
