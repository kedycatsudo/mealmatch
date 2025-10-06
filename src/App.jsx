import { Routes, Route } from 'react-router-dom'
import './App.css'

// PAGES
import HomePage from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Menu from './pages/menu/Menu'
import Profile from './pages/profile/Profile'
import NotFound from './pages/notFound/NotFound'
import PostFood from './pages/postFood/PostFood'
import ExploreFood from './pages/exploreFood/ExploreFood'
import ProtectedRoute from './components/common/ProtectedRoute'

import { RecentDonationProvider } from './context/RecentDonationsContext'
import { ParticipantProvider } from './context/ParticipantContext'
import { MealsProvider } from './context/MealsContext'

function App() {
  return (
    <RecentDonationProvider>
      <MealsProvider>
        <ParticipantProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/menu"
              element={
                <ProtectedRoute>
                  <Menu />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shareFood"
              element={
                <ProtectedRoute>
                  <PostFood />
                </ProtectedRoute>
              }
            />
            <Route
              path="/exploreFood"
              element={
                <ProtectedRoute>
                  <ExploreFood />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ParticipantProvider>
      </MealsProvider>
    </RecentDonationProvider>
  )
}

export default App
