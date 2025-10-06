import './ProfilePageFooter.css'
import ContainerSeperation from '../../../../common/containerSeperation/ContainerSeperation'
import DonationStatusListItem from './donationStatusListItem/DonationStatusListItem'

const ProfilePageFooter = ({ currentUser }) => {
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

  // Use backend-calculated donationStatus fields
  const { totalDonations, availableDonations, totalNetTaxDeduction } =
    currentUser.donationStatus

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
          participantsDataCategory={totalNetTaxDeduction}
        />
      </ul>
    </footer>
  )
}

export default ProfilePageFooter
