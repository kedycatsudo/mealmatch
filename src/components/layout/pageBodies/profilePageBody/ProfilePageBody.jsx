import '../../../common/searchBox/SearchBox.css'
import './ProfilePageBody.css'
import donationsData from '../../../../constants/donationsData'
import { useState } from 'react'
import PostedDonationsContainer from '../../../containers/profilePageContainers/postadDonationsContainer/PostedDonationsContainer'
const ProfilePageMain = ({}) => {
  return (
    <main className="body">
      <PostedDonationsContainer></PostedDonationsContainer>
    </main>
  )
}
export default ProfilePageMain
