import { createContext, useState, useEffect } from 'react'

export const MealsContext = createContext()

export function MealsProvider({ children }) {
  const [meals, setMeals] = useState([])

  // Example: Add a new meal (for MVP, local only)
  const addMeal = (meal) => {
    function isBlank(str) {
      return typeof str !== 'string' || str.trim() === ''
    }
    if (
      isBlank(meal.mealName) ||
      isBlank(meal.useBy) ||
      isBlank(meal.pickUpLoc)
    ) {
      return { error: 'Meal Name, Use By, and Pick Up Location are required!' }
    }
    setMeals((prev) => [...prev, meal])
  }

  // Example: Claim a meal by ID
  const claimMeal = (mealId, userId) => {
    setMeals((prev) =>
      prev.map((m) =>
        m._id === mealId ? { ...m, claimedUpBy: userId, live: false } : m
      )
    )
  }

  return (
    <MealsContext.Provider value={{ meals, setMeals, addMeal, claimMeal }}>
      {children}
    </MealsContext.Provider>
  )
}
