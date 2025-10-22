import '../../../common/searchBox/SearchBox.css'
import './ProfilePageBody.css'
import PostedDonationsContainer from '../../../containers/profilePageContainers/postadDonationsContainer/PostedDonationsContainer'
const ProfilePageMain = ({
  currentUser,
  setCurrentUser,
  triggerDonationStatusRefresh,
  donationStatusRefresh,
}) => {
  return (
    <main className="body">
      <PostedDonationsContainer
        donationStatusRefresh={donationStatusRefresh}
        triggerDonationStatusRefresh={triggerDonationStatusRefresh}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      ></PostedDonationsContainer>
    </main>
  )
}
export default ProfilePageMain
