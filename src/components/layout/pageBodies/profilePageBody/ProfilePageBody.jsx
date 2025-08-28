import '../../../common/searchBox/SearchBox.css'
import './ProfilePageBody.css'
import donationsData from '../../../../constants/donationsData'
import { useState } from 'react'
import { useParticipant } from '../../../../context/ParticipantContext'
import PostedDonationsContainer from '../../../containers/profilePageContainers/postadDonationsContainer/PostedDonationsContainer'
const ProfilePageMain = ({}) => {
  const [donations, setDonations] = useState(donationsData)
  const { participantsData = [] } = useParticipant() || {}

  return (
    <main className="body">
      <PostedDonationsContainer
        donations={participantsData[0].donationsList}
        setDonations={setDonations}
      ></PostedDonationsContainer>
    </main>
  )
}
export default ProfilePageMain
