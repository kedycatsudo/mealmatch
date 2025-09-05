import './EditProfileModal.css'
import Button from '../../buttons/Buttons'
import { useNavigate, Navigate } from 'react-router-dom'

import ConfirmationModal from '../confirmationModal/ConfirmationModal'
import EditProfileBasicInformationsContainer from '../../../containers/profilePageContainers/postadDonationsContainer/editProfileContainers/editProfileBasicInformationsContainer/EditProfileBasicInformationsContainer'
import ContainerSeperation from '../../containerSeperation/ContainerSeperation'
import EditProfileAddressesContainer from '../../../containers/profilePageContainers/postadDonationsContainer/editProfileContainers/editProfileAdressesContainer/EditProfileAdressesContainer'
import EditProfileContactsContainer from '../../../containers/profilePageContainers/postadDonationsContainer/editProfileContainers/editProfileContactsContainer/EditProfileContactsContainer'
import { useState } from 'react'
import DeleteAccountModal from './deleteAccountModal/DeleteAccountModal'
import InformationModal from '../informationModals/InformationModal'
const EditProfileModal = ({ onClose }) => {
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const navigatePages = (index) => {
    navigate(`/${index}`)
  }
  const deleteAccount = ({}) => {
    navigatePages('home')
  }
  const handleSubmitEditForm = (e) => {
    e.preventDefault()
    setShowModal(true)

    return
  }

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
          type="button"
          onClick={handleSubmitEditForm}
          variant="login__button-container-submit"
          text="Save Changes"
        ></Button>
        {showModal && (
          <div className="modal-overlay">
            <InformationModal
              text={'Changes saved succesfully.'}
              onClose={() => setShowModal(false)}
            ></InformationModal>
          </div>
        )}
        <Button
          type="button"
          onClick={() => setShowModalDelete(true)}
          variant="login__button-container-submit"
          text="Delete Account"
        ></Button>
        {showModalDelete && (
          <div className="modal-overlay">
            <ConfirmationModal
              confirmation={
                'Confirm that your Meal Match Account will be deleted.'
              }
              onClose={() => setShowModalDelete(false)}
              onClick={deleteAccount}
            ></ConfirmationModal>
          </div>
        )}
      </form>
    </div>
  )
}
export default EditProfileModal
