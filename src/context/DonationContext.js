import React, { createContext, useContext, useState, useCallback } from 'react'
import { testimonialCard } from '../utils/constants/homePageConstants'
const DonationContext = createContext()
export const DonationProvider = ({ children }) => {
  const [generalDonationCount, setGeneralDonationCount] = useState(0)
  const [testimonials, setTestimonials] = useState
}
