import './ExploreFoodBody.css'
import ExploreFoodDonationMapModal from '../../../common/modals/exploreFoodDonationMapModal/ExploreFoodDonationMapModal'
import ExploreDonationsListItem from '../../../containers/exploreFoodContainers/exploreFoodDonationsListItem/ExploreDonationsListItem'
import ExploreDonationListTitle from '../../../containers/exploreFoodContainers/exploreFoodDonationsListTitle/ExploreFoodDonationsListTitle'
import SearchBox from '../../../common/searchBox/SearchBox'
import ExploreFoodDonationCardDisplay from '../../../containers/exploreFoodContainers/exploreFoodDonationCardDisplay/ExploreFoodDonationCardDisplay'
import { ParticipantContext } from '../../../../context/ParticipantContext'
import { useState, useRef, useEffect, useContext } from 'react'
import {
  claimDonationExplorePageApi,
  unclaimDonationExplorePageApi,
} from '../../../../api'

const ExploreFoodBody = ({ liveMeals, currentUser }) => {
  const [showMapModal, setShowMapModal] = useState(false)
  const [donations, setDonations] = useState(
    Array.isArray(liveMeals) ? liveMeals : []
  )
  const [modalAddress, setModalAddress] = useState('')
  const modalRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMeal, setSelectedMeal] = useState({})
  const [sortOrder, setSortOrder] = useState('')
  const [sortSize, setSortSize] = useState('')
  const [sortSelection, setSortSelection] = useState('')
  const [sortOrderUseBy, setSortOrderUseBy] = useState('')
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [infoText, setInfoText] = useState('')
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

  // Modal logic

  const handleOpenModal = () => {
    handleSetDonationHold(selectedMeal._id, true)
    if (!selectedMeal?.pickUpLoc) {
      console.warn('No pick up location available for selected meal')
      return
    }
    setShowMapModal(true)
    // Owner available for later use
    // const owner = getOwner(selectedMeal.ownerId)
    // For future: send email, display owner info, etc.
  }

  // Modal focus effect

  useEffect(() => {
    if (!currentUser || !Array.isArray(donations)) return

    //Auto select and open modal for calimed meal
    const claimedMeal = donations.find(
      (d) => d.hold && d.claimedUpBy === currentUser._id
    )
    if (claimedMeal) {
      setSelectedMeal(claimedMeal)
      setShowMapModal(true)
      //accessiblty: focus and scroll to modal
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus()
          modalRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      }, 50) // small delay to ensure modal is in DOM
    } else {
      setShowMapModal(false)
    }
  }, [donations, currentUser])

  // Filter and sort logic

  const filteredDonations = Array.isArray(donations)
    ? donations.filter((donation) =>
        Object.values(donation)
          .filter((value) => typeof value === 'string')
          .some((value) =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    : []

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
  // Donation state handlers
  const handleSetDonationHold = (donationId, holdValue) => {
    setDonations((prevDonations) =>
      prevDonations.map((donation) =>
        donation._id === donationId
          ? { ...donation, hold: holdValue }
          : donation
      )
    )
  }
  const handleAcceptDonation = (donationId) => {
    setInfoText('')
    claimDonationExplorePageApi(donationId)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            setInfoText(err.message || 'Failed to claim donation')
            setShowInfoModal(true)
          })
        }
        return res.json()
      })
      .then((data) => {
        if (data) {
          //success: update state
          setDonations((prevDonations) =>
            prevDonations.map((d) =>
              d._id === donationId
                ? { ...d, hold: true, claimedUpBy: data.meal.claimedUpBy }
                : d
            )
          )
          setInfoText(data.message || 'Donation claimed succesfully!')
          setShowInfoModal(true)
          handleOpenModal()
          //update UI, show modal etc.
        }
      })
      .catch((err) => {
        console.error(err)
        setInfoText(err.message || 'Network error: could not claim donation.')
        setShowInfoModal(true)
      })
  }
  const handleCancelDonation = (donationId) => {
    setInfoText('')
    unclaimDonationExplorePageApi(donationId)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            setInfoText('Failed to cancel claim')
            setShowInfoModal(true)
          })
        }
        return res.json()
      })
      .then((data) => {
        if (data && data.meal) {
          setDonations((prevDonations) =>
            prevDonations.map((d) =>
              d._id === donationId
                ? {
                    ...d,
                    hold: false,
                    claimedUpBy: data.meal.claimedUpBy,
                    claimedUpAt: data.meal.claimedUpAt,
                  }
                : d
            )
          )
          setInfoText('Claim cancelled successfully!')
          setShowInfoModal(true)
        }
      })
      .catch((err) => {
        setInfoText('Network error: could not cancel claim')
        setShowInfoModal(true)
      })
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
          <ExploreDonationListTitle />
          {sortedDonations && sortedDonations.length > 0
            ? sortedDonations.map((sortedDonation, idx) => {
                return (
                  <ExploreDonationsListItem
                    onClick={() => {
                      setSelectedMeal(sortedDonation)
                    }}
                    key={sortedDonation._id || idx}
                    donation={sortedDonation}
                    donationHold={sortedDonation.hold}
                  />
                )
              })
            : null}
        </ul>
        <ExploreFoodDonationCardDisplay
          infoText={infoText}
          showInfoModal={showInfoModal}
          setShowInfoModal={setShowInfoModal}
          cancelDonation={() => handleCancelDonation(selectedMeal._id)}
          donationHold={selectedMeal.hold}
          setDonationHold={(holdValue) =>
            handleSetDonationHold(selectedMeal._id, holdValue)
          }
          onConfirmAccept={handleOpenModal}
          selectedMeal={selectedMeal}
          onAcceptDonation={handleAcceptDonation}
        />
      </div>
      {showMapModal && (
        <ExploreFoodDonationMapModal
          cancelDonation={() => handleCancelDonation(selectedMeal._id)}
          showMapModal={showMapModal}
          onClose={() => setShowMapModal(false)}
          ref={modalRef}
          apiKey={'AIzaSyBOIRdskona5zw-Lv_0MN2cUQseN_m557A'} // or process.env.REACT_APP...
          address={selectedMeal.pickUpLoc}
          tabIndex={-1} // Make it focusable
          confirmation={
            'Confirm that you are requesting to pick up the donation.'
          }
        />
      )}
    </div>
  )
}
export default ExploreFoodBody
