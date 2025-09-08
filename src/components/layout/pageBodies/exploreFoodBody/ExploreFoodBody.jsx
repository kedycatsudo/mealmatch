import './ExploreFoodBody.css'
import ExploreFoodDonationMapModal from '../../../common/modals/exploreFoodDonationMapModal/ExploreFoodDonationMapModal'
import ExploreDonationsListItem from '../../../containers/exploreFoodContainers/exploreFoodDonationsListItem/ExploreDonationsListItem'
import ExploreDonationListTitle from '../../../containers/exploreFoodContainers/exploreFoodDonationsListTitle/ExploreFoodDonationsListTitle'
import SearchBox from '../../../common/searchBox/SearchBox'
import ExploreFoodDonationCardDisplay from '../../../containers/exploreFoodContainers/exploreFoodDonationCardDisplay/ExploreFoodDonationCardDisplay'
import { useParticipant } from '../../../../context/ParticipantContext'
import { useState, useRef, useEffect } from 'react'

import buildAddress from '../../../../utils/helpers/buildAddress'
const ExploreFoodBody = ({ activeDonations }) => {
  const [showMapModal, setShowMapModal] = useState(false)
  const [donations, setDonations] = useState(activeDonations)
  const [modalAddress, setModalAddress] = useState('')
  const modalRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMeal, setSelectedMeal] = useState({})
  const [sortOrder, setSortOrder] = useState('')
  const [sortSize, setSortSize] = useState('')
  const [sortSelection, setSortSelection] = useState('')
  const [sortOrderUseBy, setSortOrderUseBy] = useState('')
  const { participantsData } = useParticipant()

  const getOwner = (ownerId) => participantsData.find((p) => p.id === ownerId)

  const handleSortByPostedDate = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    setSortSelection('SortByPostedDate')
  }
  const handleSortByUseBy = () => {
    setSortOrderUseBy((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    setSortSelection('SortByUseBy')
  }

  const handleOpenModal = () => {
    let address = ''
    if (selectedMeal?.ownerId) {
      const donor = participantsData.find((p) => p.id === selectedMeal.ownerId)
      address = buildAddress(donor)
    } else if (selectedMeal?.participantId) {
      const donor = participantsData.find(
        (p) => p.id === selectedMeal.participantId
      )
      address = buildAddress(donor)
    } else {
      const street = selectedMeal?.address || selectedMeal?.adress
      if (street) address = `${street}, ${selectedMeal.city || ''}`
    }
    if (!address) {
      console.warn('No address available for selected meal')
      return
    }
    setModalAddress(address)
    setShowMapModal(true)
  }

  const handeSortByServingSize = () => {
    setSortSize((prev) => (prev === 'big' ? 'small' : 'big'))
    setSortSelection('SortByServingSize')
  }

  useEffect(() => {
    if (showMapModal && modalRef.current) {
      modalRef.current.focus()
      modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [showMapModal])

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
  const handleAcceptDonation = (donationId) => {
    setDonations((prevDonations) =>
      prevDonations.map((d) => (d.id === donationId ? { ...d, hold: true } : d))
    )
  }
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
          <ExploreDonationListTitle></ExploreDonationListTitle>
          {sortedDonations && sortedDonations.length > 0
            ? sortedDonations.map((sortedDonation, idx) => {
                const owner = getOwner(sortedDonation.ownerId)
                return (
                  <ExploreDonationsListItem
                    onClick={() => {
                      setSelectedMeal(sortedDonation)
                    }}
                    key={sortedDonation.id || idx}
                    donation={sortedDonation}
                    selectedMeal={selectedMeal}
                    owner={owner}
                  />
                )
              })
            : null}
        </ul>
        <ExploreFoodDonationCardDisplay
          onConfirmAccept={handleOpenModal}
          showMapModal={showMapModal}
          setShowMapModal={setShowMapModal}
          selectedMeal={selectedMeal}
          onClick={() => handleAcceptDonation(selectedMeal.id)}
        />
      </div>
      {showMapModal && (
        <ExploreFoodDonationMapModal
          showMapModal={showMapModal}
          ref={modalRef}
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} // or process.env.REACT_APP...
          address={modalAddress}
          tabIndex={-1} // Make it focusable
          confirmation={
            'Confirm that you are requesting to pick up the donation.'
          }
          onClose={() => setShowMapModal(false)}
        />
      )}
    </div>
  )
}
export default ExploreFoodBody
