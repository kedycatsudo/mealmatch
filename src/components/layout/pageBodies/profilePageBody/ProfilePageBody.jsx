import './ProfilePageBody.css'
import donationsData from '../../../../constants/donationsData'
import { useState } from 'react'
import PostedDonationsContainer from '../../../containers/profilePageContainers/postadDonationsContainer/PostedDonationsContainer'
const ProfilePageMain = ({}) => {
  const [donations, setDonations] = useState(donationsData)

  return (
    <main className="body">
      <PostedDonationsContainer
        donations={donations}
        setDonations={setDonations}
      ></PostedDonationsContainer>
    </main>
  )
}
export default ProfilePageMain
