import './EditProfileModal.css'
import EditProfileBasicInformationsContainer from '../../../containers/profilePageContainers/postadDonationsContainer/editProfileContainers/editProfileBasicInformationsContainer/EditProfileBasicInformationsContainer'
import ContainerSeperation from '../../containerSeperation/ContainerSeperation'
const EditProfileModal = ({ participantData, toggleKarm }) => {
  return (
    <div className="edit__modal">
      <form className="edit__modal-form">
        <h1 className="edit__modal-header"> Edit Profile</h1>
        <ContainerSeperation text={'Basic Informations'}></ContainerSeperation>
        <div className="edit__modal-basic">
          <EditProfileBasicInformationsContainer
            participantData={participantData}
            toggleKarm={toggleKarm}
          ></EditProfileBasicInformationsContainer>
        </div>
        <div className="edit__modal-contacts"></div>

        <div className="edit__modal-address"></div>
      </form>
    </div>
  )
}
export default EditProfileModal
