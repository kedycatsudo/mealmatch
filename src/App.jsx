import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

//PAGES\
import HomePage from './pages/home/Home'
import About from './pages/about/About'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Menu from './pages/menu/Menu'
import Profile from './pages/profile/Profile'

import { ParticipantProvider } from './context/ParticipantContext'

function App() {
  return (
    <ParticipantProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>

          <Route path="/home" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/menu" element={<Menu></Menu>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/about" element={<About></About>}></Route>
        </Routes>
      </Router>
    </ParticipantProvider>
  )
}

export default App
