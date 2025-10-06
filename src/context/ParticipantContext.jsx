import { createContext, useState, useEffect } from 'react'

export const ParticipantContext = createContext()

export function ParticipantProvider({ children }) {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // Optional: error state
  // const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${import.meta.env.BASE_URL}data/users.json`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
        setCurrentUser(data[0]) // Default to first user for MVP
        setLoading(false)
      })
      .catch((err) => {
        // setError(err)
        setLoading(false)
        console.error('Failed to load users', err)
      })
  }, [])

  return (
    <ParticipantContext.Provider
      value={{
        users,
        currentUser,
        setCurrentUser,
        loading,
        // error
      }}
    >
      {children}
    </ParticipantContext.Provider>
  )
}
