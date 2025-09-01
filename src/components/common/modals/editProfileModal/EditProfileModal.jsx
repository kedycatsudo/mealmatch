import './EditProfileModal.css'
import EditProfileBasicInformationsContainer from '../../../containers/profilePageContainers/postadDonationsContainer/editProfileContainers/editProfileBasicInformationsContainer/EditProfileBasicInformationsContainer'
import ContainerSeperation from '../../containerSeperation/ContainerSeperation'
import EditProfileAddressesContainer from '../../../containers/profilePageContainers/postadDonationsContainer/editProfileContainers/editProfileAdressesContainer/EditProfileAdressesContainer'
import EditProfileContactsContainer from '../../../containers/profilePageContainers/postadDonationsContainer/editProfileContainers/editProfileContactsContainer/EditProfileContactsContainer'
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
      </form>
    </div>
  )
}
export default EditProfileModal
