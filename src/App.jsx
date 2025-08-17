import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Menu from './pages/menu/Menu'
import HomePage from './pages/home/Home'
import './App.css'
import { KarmProvider } from './context/KarmContext'
function App() {
  return (
    <KarmProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/home" element={<HomePage></HomePage>}></Route>
          <Route path="/menu" element={<Menu></Menu>}></Route>
        </Routes>
      </Router>
    </KarmProvider>
  )
}

export default App
