import './ProfilePageFooter.css'
import ContainerSeperation from '../../../../common/containerSeperation/ContainerSeperation'
import DonationStatusListItem from './donationStatusListItem/DonationStatusListItem'
import { useEffect, useState } from 'react'
import { getDonationsApi } from '../../../../../api'

const ProfilePageFooter = ({ currentUser, donationStatusRefresh }) => {
  const [totalDonations, setTotalDonations] = useState(0)
  const [availableDonations, setAvailableDonations] = useState(0)
  const currentUserId = currentUser?._id || ''
  useEffect(() => {
    setTotalDonations(0)
    setAvailableDonations(0)
    getDonationsApi()
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || `Failed to fetch meals`)
          })
        }
        return res.json()
      })
      .then((data) => {
        setAvailableDonations(data.availableDonations)
        setTotalDonations(data.totalDonations)
      })
      .catch((err) => {
        console.error(`Could not fetch the donation Status`, err)
      })
  }, [currentUserId, donationStatusRefresh])

  // Defensive: show fallback if no data
  if (!currentUser || !currentUser.donationStatus) {
    return (
      <footer className="profile__footer">
        <ContainerSeperation text={'Donation Status'} />
        <div className="profile__footer-status-list">
          No donation status data available.
        </div>
      </footer>
    )
  }

  return (
    <footer className="profile__footer">
      <ContainerSeperation text={'Donation Status'} />
      <ul className="profile__footer-status-list">
        <DonationStatusListItem
          text={'Total Donations'}
          participantsDataCategory={totalDonations}
        />
        <DonationStatusListItem
          text={'Available Donations'}
          participantsDataCategory={availableDonations}
        />
        <DonationStatusListItem
          text={'Total Net Tax Back'}
          participantsDataCategory="0"
        />
      </ul>
    </footer>
  )
}

export default ProfilePageFooter
