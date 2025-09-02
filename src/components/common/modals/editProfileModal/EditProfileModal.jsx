import './EditProfileModal.css'
import Button from '../../buttons/Buttons'
import EditProfileBasicInformationsContainer from '../../../containers/profilePageContainers/postadDonationsContainer/editProfileContainers/editProfileBasicInformationsContainer/EditProfileBasicInformationsContainer'
import ContainerSeperation from '../../containerSeperation/ContainerSeperation'
import EditProfileAddressesContainer from '../../../containers/profilePageContainers/postadDonationsContainer/editProfileContainers/editProfileAdressesContainer/EditProfileAdressesContainer'
import EditProfileContactsContainer from '../../../containers/profilePageContainers/postadDonationsContainer/editProfileContainers/editProfileContactsContainer/EditProfileContactsContainer'
const EditProfileModal = ({ onClose }) => {
  const handleSubmitEditForm = ({}) => {
    e.preventDefault()

    return
  }
  const onClick = ({}) => {}
  return (
    <div className="edit__modal">
      <Button variant="modal__close-btn" text="X" onClick={onClose}></Button>

      <form onSubmit={handleSubmitEditForm} className="edit__modal-form">
        <h1 className="edit__modal-header"> Edit Profile</h1>
        <ContainerSeperation text={'Basic Informations'}></ContainerSeperation>
        <div className="edit__modal-basic">
          <EditProfileBasicInformationsContainer></EditProfileBasicInformationsContainer>
        </div>
        <ContainerSeperation text={'Contacts'}></ContainerSeperation>
        <div className="edit__modal-contacts">
          <EditProfileContactsContainer></EditProfileContactsContainer>
        </div>
        <ContainerSeperation
          text={'Address(for pick up donations)'}
        ></ContainerSeperation>
        <div className="edit__modal-address">
          <EditProfileAddressesContainer></EditProfileAddressesContainer>
        </div>
        <Button
          variant="login__button-container-submit"
          text="Save Changes"
        ></Button>
        <Button
          variant="login__button-container-submit"
          text="Delete Account"
        ></Button>
      </form>
    </div>
  )
}
export default EditProfileModal
