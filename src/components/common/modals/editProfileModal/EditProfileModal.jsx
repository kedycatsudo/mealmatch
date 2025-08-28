import './EditProfileModal.css'
import EditProfileBasicInformationsContainer from '../../../containers/profilePageContainers/postadDonationsContainer/editProfileContainers/editProfileBasicInformationsContainer/EditProfilebasicInformationsContainer'
import ContainerSeperation from '../../containerSeperation/ContainerSeperation'
const EditProfileModal = ({}) => {
  return (
    <div className="edit__modal">
      <form className="edit__modal-form">
        <h1 className="edit__modal-header"> Edit Profile</h1>
        <ContainerSeperation text={'Basic Informations'}></ContainerSeperation>
        <div className="edit__modal-basic">
          <EditProfileBasicInformationsContainer></EditProfileBasicInformationsContainer>
        </div>
        <div className="edit__modal-contacts"></div>

        <div className="edit__modal-address"></div>
      </form>
    </div>
  )
}
export default EditProfileModal
