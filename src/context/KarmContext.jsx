import { createContext, use, useContext, useState } from 'react'
import { participants } from '../utils/constants/participantsConstants'
const KarmContext = createContext()

export const KarmProvider = ({ children }) => {
  const [karm, setKarm] = useState(false)
  return (
    <KarmContext.Provider value={{ karm, setKarm }}>
      {children}
    </KarmContext.Provider>
  )
}
export const useKarm = () => useContext(KarmContext)
