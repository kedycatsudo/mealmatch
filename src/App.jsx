import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Menu from './pages/menu/Menu'
import HomePage from './pages/home/Home'
import './App.css'
import { KarmProvider } from './context/KarmContext'
import About from './pages/about/About'
function App() {
  return (
    <KarmProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>

          <Route path="/home" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>

          <Route path="/menu" element={<Menu></Menu>}></Route>
          <Route path="/about" element={<About></About>}></Route>
        </Routes>
      </Router>
    </KarmProvider>
  )
}

export default App
