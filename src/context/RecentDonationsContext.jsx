import { createContext, useContext, useState } from 'react'
import { useEffect } from 'react'
const RecentDonationContext = createContext({})

export const RecentDonationProvider = ({ children }) => {
  const [recentDonationStack, setRecentDonationStack] = useState([])

  const addRecentDonation = (donation) => {
    setRecentDonationStack((prev) => [donation, ...prev])
  }

  return (
    <RecentDonationContext.Provider
      value={{ recentDonationStack, addRecentDonation }}
    >
      {children}
    </RecentDonationContext.Provider>
  )
}
export const useRecentDonation = () => useContext(RecentDonationContext)
