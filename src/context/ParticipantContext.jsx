import { createContext, useState, useEffect } from 'react'

export const ParticipantContext = createContext()

export function ParticipantProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // On mount, check localStorage for user info (for persistent login)

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.resolve()
      .then(() => {
        const storedUser = localStorage.getItem('currentUser')
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser))
        }
      })
      .catch(() => {
        setError('Failed to load user from storage.')
        setCurrentUser(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // Helper: Call this after successful login

  const login = (userObj, jwtToken) => {
    return Promise.resolve()
      .then(() => {
        localStorage.setItem('currentUser', JSON.stringify(userObj))
        localStorage.setItem('token', jwtToken)
        setCurrentUser(userObj)
        setError(null)
      })
      .catch(() => {
        setError('Failed to save user data.')
        console.error(err)
      })
  }

  //Helper: Logout user everywhere

  const logout = () => {
    return Promise.resolve()
      .then(() => {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('token')
        setCurrentUser(null)
        setError(null)
      })
      .catch(() => {
        setError('Failed to log out.')
      })
  }

  return (
    <ParticipantContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        logout,
        loading,
        error,
        setError,
      }}
    >
      {children}
    </ParticipantContext.Provider>
  )
}
