import ContainerSeperation from '../../components/common/containerSeperation/ContainerSeperation'
import ProfilePageHeader from '../../components/layout/pageHeaders/profilePageHeader/ProfilePageHeader'
import ProfilePageFooter from '../../components/layout/pageFooters/homePageFooter/profilePageFooter/ProfilePageFooter'
import ProfilePageBody from '../../components/layout/pageBodies/profilePageBody/ProfilePageBody'
import { useContext, useState } from 'react'
import { ParticipantContext } from '../../context/ParticipantContext'
import InformationModal from '../../components/common/modals/informationModals/InformationModal'
const Profile = () => {
  const { setCurrentUser, currentUser, loading } =
    useContext(ParticipantContext)
  const [donationStatusRefresh, setDonationStatusRefresh] = useState(0)
  if (loading) {
    return (
      <div className="page">
        <div className="page__content">
          <div className="modal__overlay">
            <InformationModal text="Loading profile..."></InformationModal>
          </div>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="page">
        <div className="page__content">
          <div className="modal__overlay">
            <InformationModal text="No user logged in. Please login to view your profile."></InformationModal>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="page">
      <div className="page__content">
        <ProfilePageHeader
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
        ></ProfilePageHeader>
        <ContainerSeperation text={'Posted Donations'}></ContainerSeperation>
        <ProfilePageBody
          triggerDonationStatusRefresh={() =>
            setDonationStatusRefresh((prev) => prev + 1)
          } // Pass callback down
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
        ></ProfilePageBody>
        <ProfilePageFooter
          donationStatusRefresh={donationStatusRefresh}
          currentUser={currentUser}
        ></ProfilePageFooter>
      </div>
    </div>
  )
}
export default Profile
