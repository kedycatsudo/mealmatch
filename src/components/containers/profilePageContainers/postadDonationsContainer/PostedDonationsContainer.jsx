import './PostedDonationsContainer.css'
import DonationsListTitle from './postedDonationsListContainer/DonationListTitle.jsx'
import PostedDonationListItem from './postedDonationsListContainer/PostedDonationListItem'
import PostedDonationCardDisplay from './postedDonationCardDisplay/PostedDonationCardDisplay'
import SearchBox from '../../../common/searchBox/SearchBox'

import { useState, useEffect } from 'react'

const PostedDonationsContainer = ({ currentUser, setCurrentUser }) => {
  const [donations, setDonations] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMeal, setSelectedMeal] = useState({})
  const [sortOrder, setSortOrder] = useState('')
  const [sortSize, setSortSize] = useState('')
  const [sortSelection, setSortSelection] = useState('')
  const [sortOrderUseBy, setSortOrderUseBy] = useState('')

  const currentUserId = currentUser?._id || ''

  // 2. Simulate backend fetch (replace with API call later)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/meals.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch meals data')
        return res.json()
      })
      .then((meals) => {
        const userMeals = Array.isArray(meals)
          ? meals.filter((meal) => meal.ownerId === currentUserId)
          : []
        setDonations(userMeals)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [currentUserId])

  const handleDelete = (mealId) => {
    setDonations((prev) => prev.filter((meal) => meal._id !== mealId))
    if (selectedMeal?._id === mealId) setSelectedMeal({})
  }

  //Toggle live status

  const handleToggleLive = (mealId, liveStatus) => {
    return new Promise((resolve) => {
      setDonations((prev) => {
        const updatedMeal = prev.map((meal) =>
          meal._id === mealId ? { ...meal, live: liveStatus } : meal
        )
        if (selectedMeal?._id === mealId) {
          setSelectedMeal((prevMeal) => ({ ...prevMeal, live: liveStatus }))
        }
        resolve()
        return updatedMeal
      })
    })
  }

  // Save changes to meal

  const onSave = (updatedMeal) => {
    setDonations((prev) =>
      prev.map((meal) =>
        meal._id === updatedMeal._id ? { ...meal, ...updatedMeal } : meal
      )
    )
    setSelectedMeal(updatedMeal)
  }
  // Sorting handlers

  const handleSortByPostedDate = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    setSortSelection('SortByPostedDate')
  }
  const handleSortByUseBy = () => {
    setSortOrderUseBy((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    setSortSelection('SortByUseBy')
  }

  const handeSortByServingSize = () => {
    setSortSize((prev) => (prev === 'big' ? 'small' : 'big'))
    setSortSelection('SortByServingSize')
  }
  // Search filter

  const filteredDonations = Array.isArray(donations)
    ? donations.filter((meal) => {
        return Object.values(meal)
          .filter((value) => typeof value === 'string')
          .some((value) =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
          )
      })
    : []
  // Sorting logic

  const sortedDonations = [...filteredDonations].sort((a, b) => {
    if (sortSelection === 'SortByServingSize') {
      const sizeA = a.servings || 0
      const sizeB = b.servings || 0
      return sortSize === 'big' ? sizeB - sizeA : sizeA - sizeB
    } else if (sortSelection === 'SortByPostedDate') {
      const dateA = new Date(a.postDate)
      const dateB = new Date(b.postDate)
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    } else if (sortSelection === 'SortByUseBy') {
      const useByA = new Date(a.useBy)
      const useByB = new Date(b.useBy)
      return sortOrderUseBy === 'asc' ? useByA - useByB : useByB - useByA
    }
    return 0
  })

  return (
    <div className="posted__donations-container">
      <SearchBox
        onSearchChange={setSearchTerm}
        sortOrder={sortOrder}
        onSortByPostedDate={handleSortByPostedDate}
        sortSize={sortSize}
        onSortByServingSize={handeSortByServingSize}
        sortOrderUseBy={sortOrderUseBy}
        onSortByUseBy={handleSortByUseBy}
        searchTerm={searchTerm}
      ></SearchBox>
      <div className="posted__donations-list-cards">
        <ul className="posted__donations-list-container">
          <DonationsListTitle />
          {sortedDonations && sortedDonations.length > 0
            ? sortedDonations.map((sortedMeal, idx) => (
                <PostedDonationListItem
                  onClick={() => {
                    setSelectedMeal(sortedMeal)
                  }}
                  key={sortedMeal.id || idx}
                  meal={sortedMeal}
                />
              ))
            : null}
        </ul>
        <PostedDonationCardDisplay
          onToggleLive={handleToggleLive}
          currentUserId={currentUserId}
          onDelete={handleDelete}
          setSelectedMeal={setSelectedMeal}
          selectedMeal={selectedMeal}
          onSave={onSave}
        />
      </div>
    </div>
  )
}
export default PostedDonationsContainer
