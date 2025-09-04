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
import NotFound from './pages/notFound/NotFound'
import PostFood from './pages/postFood/PostFood'

import { ParticipantProvider } from './context/ParticipantContext'

function App() {
  return (
    <ParticipantProvider>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>

        <Route path="/home" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/menu" element={<Menu></Menu>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/shareFood" element={<PostFood></PostFood>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </ParticipantProvider>
  )
}

export default App
