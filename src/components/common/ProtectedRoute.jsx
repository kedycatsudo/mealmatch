import { useContext } from 'react'
import { ParticipantContext } from '../../context/ParticipantContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(ParticipantContext)

  // If currentUser is null, redirect to /login (or /home)
  if (currentUser === null) {
    // You may want to show a loading spinner here if users are still being fetched
    return <Navigate to="/login" replace />
  }

  // Otherwise, render the protected page
  return children
}

export default ProtectedRoute
