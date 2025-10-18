import './EditProfileModal.css'
import Button from '../../buttons/Buttons'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../confirmationModal/ConfirmationModal'
import EditProfileBasicInformationsContainer from '../../../containers/profilePageContainers/postadDonationsContainer/editProfileContainers/editProfileBasicInformationsContainer/EditProfileBasicInformationsContainer'
import ContainerSeperation from '../../containerSeperation/ContainerSeperation'
import EditProfileAddressesContainer from '../../../containers/profilePageContainers/postadDonationsContainer/editProfileContainers/editProfileAdressesContainer/EditProfileAdressesContainer'
import EditProfileContactsContainer from '../../../containers/profilePageContainers/postadDonationsContainer/editProfileContainers/editProfileContactsContainer/EditProfileContactsContainer'
import { useState, useEffect } from 'react'
import InformationModal from '../informationModals/InformationModal'
import { updateUserProfileApi } from '../../../../api'

const EditProfileModal = ({ setCurrentUser, currentUser, onClose }) => {
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [shouldNavigate, setShouldNavigate] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [draftProfile, setDraftProfile] = useState(null)

  useEffect(() => {
    setDraftProfile(currentUser) // initialize draft on modal open
  }, [currentUser])

  const navigate = useNavigate()
  useEffect(() => {
    if (!showModal && shouldNavigate) {
      console.log('Navigating now!')
      navigate('/profile')
      setShouldNavigate(false) // reset the flag
    }
  }, [showModal, shouldNavigate, navigate])
  const deleteAccount = ({}) => {
    // TODO: Implement account deletion logic

    navigatePages('home')
  }
  const handleSubmitEditForm = (e) => {
    e.preventDefault()
    setIsSaving(true)
    updateUserProfileApi(draftProfile)
      .then((data) => {
        setCurrentUser(data.user) // update context/global state
        setShowModal(true)
      })
      .catch((err) => {
        alert(err.message || 'Could not update Profile')
      })
      .finally(() => setIsSaving(false))
  }

  return (
    <div className="edit__modal">
      <Button variant="modal__close-btn" text="X" onClick={onClose}></Button>

      <form onSubmit={handleSubmitEditForm} className="edit__modal-form">
        <h1 className="edit__modal-header"> Edit Profile</h1>
        <ContainerSeperation text={'Basic Informations'}></ContainerSeperation>
        <div className="edit__modal-basic">
          <EditProfileBasicInformationsContainer
            currentUser={currentUser}
            draftProfile={draftProfile}
            setDraftProfile={setDraftProfile}
          ></EditProfileBasicInformationsContainer>
        </div>
        <ContainerSeperation text={'Contacts'}></ContainerSeperation>
        <div className="edit__modal-contacts">
          <EditProfileContactsContainer
            draftProfile={draftProfile}
            setDraftProfile={setDraftProfile}
          ></EditProfileContactsContainer>
        </div>
        <ContainerSeperation text={'Address'}></ContainerSeperation>
        <div className="edit__modal-address">
          <EditProfileAddressesContainer
            draftProfile={draftProfile}
            setDraftProfile={setDraftProfile}
          ></EditProfileAddressesContainer>
        </div>
        <Button
          type="submit"
          variant="login__button-container-submit"
          text={isSaving ? 'Saving...' : 'Save Changes'}
        ></Button>
        {showModal && (
          <div className="modal-overlay">
            <InformationModal
              text={'Changes saved succesfully.'}
              onClose={() => onClose()}
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
              onClick={() => {
                setShowModalDelete(false)
                navigate('/home')
              }}
            ></ConfirmationModal>
          </div>
        )}
      </form>
    </div>
  )
}
export default EditProfileModal
