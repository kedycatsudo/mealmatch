import { useParticipant } from '../../../../../context/ParticipantContext'
import DonationStatusListItem from './donationStatusListItem/DonationStatusListItem'
import './ProfilePageFooter.css'
import ContainerSeperation from '../../../../common/containerSeperation/ContainerSeperation'
const ProfilePageFooter = ({}) => {
  const { participantsData = [] } = useParticipant() || {}
  return (
    <footer className="profile__footer">
      <ContainerSeperation text={'Donation Status'}></ContainerSeperation>
      <ul className="profile__footer-status-list">
        <DonationStatusListItem
          text={'Total Donations'}
          participantsDataCategory={participantsData[0].totalDonationCount}
        ></DonationStatusListItem>
        <DonationStatusListItem
          text={'Total Donated Weight'}
          participantsDataCategory={participantsData[0].totalWeightDonation}
        ></DonationStatusListItem>
        <DonationStatusListItem
          text={'Available Donations'}
          participantsDataCategory={participantsData[0].currentDonations}
        ></DonationStatusListItem>

        <DonationStatusListItem
          text={'Total Donated Person'}
          participantsDataCategory={participantsData[0].totalPersonHelped}
        ></DonationStatusListItem>
        <DonationStatusListItem
          text={'Total Net Tax Back'}
          participantsDataCategory={participantsData[0].totalNetTaxBack}
        ></DonationStatusListItem>
        <DonationStatusListItem
          text={'Karm Donor'}
          participantsDataCategory={participantsData[0].karm}
        ></DonationStatusListItem>
      </ul>
    </footer>
  )
}
export default ProfilePageFooter
