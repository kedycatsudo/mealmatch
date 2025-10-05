import { useContext } from 'react'
import { ParticipantContext } from '../../../../../context/ParticipantContext'
import './ProfilePageFooter.css'
import ContainerSeperation from '../../../../common/containerSeperation/ContainerSeperation'
import DonationStatusListItem from './donationStatusListItem/DonationStatusListItem'

const ProfilePageFooter = () => {
  const { currentUser } = useContext(ParticipantContext)

  // Guard against missing currentUser or donationStatus
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
          participantsDataCategory={currentUser.donationStatus.totalDonations}
        />
        <DonationStatusListItem
          text={'Available Donations'}
          participantsDataCategory={
            currentUser.donationStatus.availableDonations
          }
        />
        <DonationStatusListItem
          text={'Total Net Tax Back'}
          participantsDataCategory={
            currentUser.donationStatus.totalNetTaxDeduction
          }
        />
      </ul>
    </footer>
  )
}

export default ProfilePageFooter
