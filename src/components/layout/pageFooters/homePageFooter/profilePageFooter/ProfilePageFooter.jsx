import { useParticipant } from '../../../../../context/ParticipantContext'
import DonationStatusListItem from './donationStatusListItem/DonationStatusListItem'
import './ProfilePageFooter.css'
import ContainerSeperation from '../../../../common/containerSeperation/ContainerSeperation'
const ProfilePageFooter = ({}) => {
  const { participant, toggleKarm } = useParticipant()

  return (
    <footer className="profile__footer">
      <ContainerSeperation text={'Donation Status'}></ContainerSeperation>
      <ul className="profile__footer-status-list">
        <DonationStatusListItem
          text={'Total Donations'}
          participantsDataCategory={participant.totalDonationCount}
        ></DonationStatusListItem>
        <DonationStatusListItem
          text={'Total Donated Weight'}
          participantsDataCategory={participant.totalWeightDonation}
        ></DonationStatusListItem>
        <DonationStatusListItem
          text={'Available Donations'}
          participantsDataCategory={participant.currentDonations}
        ></DonationStatusListItem>

        <DonationStatusListItem
          text={'Total Donated Person'}
          participantsDataCategory={participant.totalPersonHelped}
        ></DonationStatusListItem>
        <DonationStatusListItem
          text={'Total Net Tax Back'}
          participantsDataCategory={participant.totalNetTaxBack}
        ></DonationStatusListItem>
        <DonationStatusListItem
          text={'Karm Donor'}
          participantsDataCategory={participant.karm}
        ></DonationStatusListItem>
      </ul>
    </footer>
  )
}
export default ProfilePageFooter
