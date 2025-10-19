import { useContext } from 'react'
import { ParticipantContext } from '../../context/ParticipantContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useContext(ParticipantContext)

  // Wait for loading to finish before deciding
  if (loading) {
    return <div>Loading...</div>
  }

  // If currentUser is null after loading, redirect to login
  if (currentUser === null) {
    return <Navigate to="/login" replace />
  }

  // Otherwise, render the protected page
  return children
}

export default ProtectedRoute
