import './PostedDonationsContainer.css'
import DonationsListTitle from './postedDonationsListContainer/DonationListTitle.jsx'
import PostedDonationListItem from './postedDonationsListContainer/PostedDonationListItem'
import PostedDonationCardDisplay from './postedDonationCardDisplay/PostedDonationCardDisplay'
import SearchBox from '../../../common/searchBox/SearchBox'

import { useState } from 'react'

const PostedDonationsContainer = ({ donations }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMeal, setSelectedMeal] = useState({})
  const [sortOrder, setSortOrder] = useState('asc')

  const handleSortByPostedDate = () => {
    setSortOrder((prev) => {
      prev === 'asc' ? 'desc' : 'asc'
    })
  }

  const filteredDonations = donations.filter((donation) => {
    return Object.values(donation)
      .filter((value) => typeof value === 'string')
      .some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()))
  })
  const sortedDonations = [...filteredDonations].sort((a, b) => {
    const dateA = new Date(a.postedDate)
    const dateB = new Date(b.postedDate)
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
  })
  return (
    <div className="posted__donations-container">
      <SearchBox
        onSearchChange={setSearchTerm}
        sortOrder={sortOrder}
        onSortByPostedDate={handleSortByPostedDate}
      ></SearchBox>
      <div className="posted__donations-list-cards">
        <ul className="posted__donations-list-container">
          <DonationsListTitle></DonationsListTitle>
          {sortedDonations && sortedDonations.length > 0
            ? sortedDonations.map((filteredDonation, idx) => (
                <PostedDonationListItem
                  onClick={() => {
                    setSelectedMeal(filteredDonation)
                  }}
                  key={filteredDonation.id || idx}
                  donation={filteredDonation}
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
