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
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [draftProfile, setDraftProfile] = useState(null)
  const [shouldNavigate, setShouldNavigate] = useState(false)

  useEffect(() => {
    setDraftProfile(currentUser) // initialize draft on modal open
  }, [currentUser])

  const navigate = useNavigate()

  // Navigation happens ONLY after info modal is closed and shouldNavigate is true
  useEffect(() => {
    if (!showInfoModal && shouldNavigate) {
      navigate('/profile')
      setShouldNavigate(false) // reset the flag
      onClose() // close the EditProfileModal parent
    }
  }, [showInfoModal, shouldNavigate, navigate, onClose])

  const deleteAccount = ({}) => {
    // TODO: Implement account deletion logic
    navigate('home')
  }

  const handleSubmitEditForm = (e) => {
    e.preventDefault()
    setIsSaving(true)
    updateUserProfileApi(draftProfile)
      .then((data) => {
        setCurrentUser(data.user) // update context/global state
        setShowInfoModal(true) // show success modal
        setShouldNavigate(true) // will navigate after info modal closed
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
        <ContainerSeperation text={'Basic Informations'} />
        <div className="edit__modal-basic">
          <EditProfileBasicInformationsContainer
            currentUser={currentUser}
            draftProfile={draftProfile}
            setDraftProfile={setDraftProfile}
          />
        </div>
        <ContainerSeperation text={'Contacts'} />
        <div className="edit__modal-contacts">
          <EditProfileContactsContainer
            draftProfile={draftProfile}
            setDraftProfile={setDraftProfile}
          />
        </div>
        <ContainerSeperation text={'Address'} />
        <div className="edit__modal-address">
          <EditProfileAddressesContainer
            draftProfile={draftProfile}
            setDraftProfile={setDraftProfile}
          />
        </div>
        <Button
          type="submit"
          variant="login__button-container-submit"
          text={isSaving ? 'Saving...' : 'Save Changes'}
        />
        {showInfoModal && (
          <div className="modal-overlay">
            <InformationModal
              text={'Changes saved succesfully.'}
              onClose={() => setShowInfoModal(false)} // closes info modal only
            />
          </div>
        )}
        <Button
          type="button"
          onClick={() => setShowModalDelete(true)}
          variant="login__button-container-submit"
          text="Delete Account"
        />
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
            />
          </div>
        )}
      </form>
    </div>
  )
}

export default EditProfileModal
