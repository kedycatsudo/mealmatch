import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/common/buttons/Buttons'
import PageHeader from './components/layout/pageHeader/PageHeader'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="page">
      <div className="page__content">
        <PageHeader>
          <Button>Button</Button>
        </PageHeader>
      </div>
    </div>
  )
}

export default App
