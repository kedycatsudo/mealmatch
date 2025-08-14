import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './pages/home/Home'
import './App.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/home" element={<HomePage></HomePage>}></Route>
      </Routes>
    </Router>
  )
}

export default App
