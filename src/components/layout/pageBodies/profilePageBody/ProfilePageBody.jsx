import '../../../common/searchBox/SearchBox.css'
import './ProfilePageBody.css'
import PostedDonationsContainer from '../../../containers/profilePageContainers/postadDonationsContainer/PostedDonationsContainer'
const ProfilePageMain = ({
  currentUser,
  setCurrentUser,
  triggerDonationStatusRefresh,
}) => {
  return (
    <main className="body">
      <PostedDonationsContainer
        triggerDonationStatusRefresh={triggerDonationStatusRefresh}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      ></PostedDonationsContainer>
    </main>
  )
}
export default ProfilePageMain
