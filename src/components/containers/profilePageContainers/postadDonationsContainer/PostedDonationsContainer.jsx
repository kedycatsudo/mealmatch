import './PostedDonationsContainer.css'
import DonationsListTitle from './postedDonationsListContainer/DonationListTitle.jsx'
import PostedDonationListItem from './postedDonationsListContainer/PostedDonationListItem'
import PostedDonationCardDisplay from './postedDonationCardDisplay/PostedDonationCardDisplay'
import SearchBox from '../../../common/searchBox/SearchBox'

import { useState } from 'react'

const PostedDonationsContainer = ({ donations }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMeal, setSelectedMeal] = useState({})
  const [sortOrder, setSortOrder] = useState('')
  const [sortSize, setSortSize] = useState('')
  const [sortSelection, setSortSelection] = useState('')
  const [sortOrderUseBy, setSortOrderUseBy] = useState('')

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

  const filteredDonations = donations.filter((donation) => {
    return Object.values(donation)
      .filter((value) => typeof value === 'string')
      .some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()))
  })
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
      ></SearchBox>
      <div className="posted__donations-list-cards">
        <ul className="posted__donations-list-container">
          <DonationsListTitle></DonationsListTitle>
          {sortedDonations && sortedDonations.length > 0
            ? sortedDonations.map((sortedDonation, idx) => (
                <PostedDonationListItem
                  onClick={() => {
                    setSelectedMeal(sortedDonation)
                  }}
                  key={sortedDonation.id || idx}
                  donation={sortedDonation}
                  selectedMeal={selectedMeal}
                />
              ))
            : null}
        </ul>
        <PostedDonationCardDisplay selectedMeal={selectedMeal} />
      </div>
    </div>
  )
}
export default PostedDonationsContainer
