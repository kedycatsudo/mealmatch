import { createContext, useState, useEffect } from 'react'
import { apiRequest } from '../api'
import { replace, useNavigate } from 'react-router-dom'

export const ParticipantContext = createContext()

export function ParticipantProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate
  // On mount, check localStorage for user info (for persistent login)

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.resolve()
      .then(() => {
        const storedUser = localStorage.getItem('currentUser')
        const token = localStorage.getItem('token')
        if (storedUser && token) {
          // Verify token by fetching profile from backend
          return apiRequest('/api/users/profile', { method: 'GET' })
            .then(function (userData) {
              var actualUser = userData.user || userData

              setCurrentUser(actualUser)
              localStorage.setItem('currentUser', JSON.stringify(actualUser))
            })
            .catch(function (err) {
              setError('Session expired or invalid. Please log in again')
              localStorage.removeItem(`currentUser`)
              localStorage.removeItem('token')
              navigate('/login', { replace: true })
              setCurrentUser(null)
            })
        } else {
          setCurrentUser(null)
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
