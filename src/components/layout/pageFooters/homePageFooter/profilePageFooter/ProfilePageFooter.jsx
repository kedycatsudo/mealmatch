import { useContext } from 'react'
import { ParticipantContext } from '../../../../../context/ParticipantContext' // Adjust path as needed
import './ProfilePageFooter.css'
import ContainerSeperation from '../../../../common/containerSeperation/ContainerSeperation'
import DonationStatusListItem from './donationStatusListItem/DonationStatusListItem'
const ProfilePageFooter = ({}) => {
  const { users, currentUser, setCurrentUser } = useContext(ParticipantContext)
  return (
    <footer className="profile__footer">
      <ContainerSeperation text={'Donation Status'}></ContainerSeperation>
      <ul className="profile__footer-status-list">
        <DonationStatusListItem
          text={'Total Donations'}
          participantsDataCategory={currentUser.donationStatus.totalDonations}
        ></DonationStatusListItem>

        <DonationStatusListItem
          text={'Available Donations'}
          participantsDataCategory={
            currentUser.donationStatus.availableDonations
          }
        ></DonationStatusListItem>

        <DonationStatusListItem
          text={'Total Net Tax Back'}
          participantsDataCategory={
            currentUser.donationStatus.totalNexTaxDeduction
          }
        ></DonationStatusListItem>
      </ul>
    </footer>
  )
}
export default ProfilePageFooter
