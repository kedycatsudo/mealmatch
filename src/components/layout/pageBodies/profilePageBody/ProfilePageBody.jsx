import '../../../common/searchBox/SearchBox.css'
import './ProfilePageBody.css'
import PostedDonationsContainer from '../../../containers/profilePageContainers/postadDonationsContainer/PostedDonationsContainer'
const ProfilePageMain = ({ currentUser, setCurrentUser }) => {
  return (
    <main className="body">
      <PostedDonationsContainer
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      ></PostedDonationsContainer>
    </main>
  )
}
export default ProfilePageMain
