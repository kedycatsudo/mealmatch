import './PostedDonationsContainer.css'
import DonationsListTitle from './postedDonationsListContainer/DonationListTitle.jsx'
import PostedDonationListItem from './postedDonationsListContainer/PostedDonationListItem'
import PostedDonationCardDisplay from './postedDonationCardDisplay/PostedDonationCardDisplay'
import SearchBox from '../../../common/searchBox/SearchBox'
import {
  completeMealPickUpApi,
  deleteMealApi,
  getDonationsApi,
  updateMealApi,
} from '../../../../api.js'
import { useState, useEffect } from 'react'

const PostedDonationsContainer = ({
  currentUser,
  setCurrentUser,
  triggerDonationStatusRefresh,
  donationStatusRefresh,
}) => {
  const [donations, setDonations] = useState([])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMeal, setSelectedMeal] = useState({})
  const [sortOrder, setSortOrder] = useState('')
  const [sortSize, setSortSize] = useState('')
  const [sortSelection, setSortSelection] = useState('')
  const [sortOrderUseBy, setSortOrderUseBy] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')
  const [pendingUpdatedMeal, setPendingUpdatedMeal] = useState(null)
  const currentUserId = currentUser?._id || ''

  useEffect(() => {
    const currentUserId = currentUser?._id || ''

    setIsLoading(true)
    setFetchError('')
    getDonationsApi()
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || 'Failed to fetch meals')
          })
        }
        return res.json()
      })
      .then((data) => {
        const mealsArray = Array.isArray(data.meals) ? data.meals : []
        const userMeals = mealsArray.filter(
          (meal) => meal.ownerId === currentUserId
        )

        setDonations(userMeals)
      })
      .catch((error) => {
        setFetchError(error.message)
      })
      .finally(() => setIsLoading(false))
  }, [currentUser, selectedMeal, donationStatusRefresh])

  const handleDelete = (mealId) => {
    deleteMealApi(mealId)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || 'Could not delete meal.')
          })
        }
        setDonations((prev) => prev.filter((meal) => meal._id !== mealId))
        if (selectedMeal?._id === mealId) setSelectedMeal({})
        //show succes/modal here
      })
      .catch((err) => {
        //show error message/modal here
        console.error('Delete failed:', err)
        //setError(err.message)
      })
  }

  //Toggle live status

  const handleToggleLive = (mealId, liveStatus) => {
    return completeMealPickUpApi(mealId, liveStatus)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || 'Could not update live status')
          })
        }
        return res.json()
      })
      .then((updatedMeal) => {
        setDonations((prev) =>
          prev.map((meal) =>
            meal._id === updatedMeal._id ? updatedMeal : meal
          )
        )
        triggerDonationStatusRefresh()
        if (selectedMeal?._id === updatedMeal._id) {
          setSelectedMeal(updatedMeal)
        }
        setSelectedMeal(updatedMeal)
        return updatedMeal
      })
  }

  // Save changes to meal

  const onSave = (updatedMeal) => {
    updateMealApi(updatedMeal._id, updatedMeal)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || 'Could not update the meal.')
          })
        }
        return res.json()
      })
      .then((meal) => {
        setDonations((prev) =>
          prev.map((m) => (m._id === meal._id ? { ...m, ...meal } : m))
        )
        setPendingUpdatedMeal(meal)
      })
      .catch((err) => {
        console.error(err)
      })
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
                  key={sortedMeal._id || idx}
                  meal={sortedMeal}
                />
              ))
            : !isLoading && <li>No meals found.</li>}
        </ul>
        <PostedDonationCardDisplay
          setSelectedMeal={setSelectedMeal}
          triggerDonationStatusRefresh={triggerDonationStatusRefresh}
          onToggleLive={handleToggleLive}
          currentUserId={currentUserId}
          onDelete={handleDelete}
          selectedMeal={selectedMeal}
          onSave={onSave}
          pendingUpdatedMeal={pendingUpdatedMeal}
        />
      </div>
    </div>
  )
}
export default PostedDonationsContainer
