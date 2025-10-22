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
import {
  updateAvatarApi,
  updateUserProfileApi,
  deleteAccountApi,
} from '../../../../api'

const EditProfileModal = ({
  setCurrentUser,
  currentUser,
  onCloseEditModal,
  showModal,
  triggerDonationStatusRefresh,
}) => {
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showInfoDeleteModal, setShowInfoDeleteModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [draftProfile, setDraftProfile] = useState(() =>
    currentUser ? { ...currentUser, avatarFile: undefined } : {}
  )
  const [shouldNavigate, setShouldNavigate] = useState(false)
  const onCloseInfoModal = () => {
    setShowInfoModal(false)
    onCloseEditModal() // call the function to close edit modal!
  }
  useEffect(() => {
    if (showModal) {
      setDraftProfile({
        ...currentUser,
        avatarFile: undefined,
        avatar: currentUser.avatar,
      })
    }
  }, [showModal, currentUser])

  const navigate = useNavigate()

  // Navigation happens ONLY after info modal is closed and shouldNavigate is true
  useEffect(() => {
    if (!showInfoDeleteModal && shouldNavigate) {
      setCurrentUser(null)
      navigate('/register')
      setShouldNavigate(false) // reset the flag
      onCloseEditModal() // close the EditProfileModal parent
    }
  }, [showInfoDeleteModal, shouldNavigate, navigate, onCloseEditModal])

  const handleDeleteAccount = () => {
    setIsSaving(true)
    deleteAccountApi()
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not delete account')
        }
        setShowModalDelete(false)
        setShowInfoDeleteModal(true)
        setShouldNavigate(true)
      })
      .catch((err) => {
        alert(err.message || 'Could not delete account.')
        setShowModalDelete(false)
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  const handleSubmitEditForm = (e) => {
    e.preventDefault()
    setIsSaving(true)

    let avatarPromise = Promise.resolve()
    // 1. If a new avatar is seleceted, upload it first

    if (draftProfile.avatarFile) {
      const avatarForm = new FormData()
      avatarForm.append('avatar', draftProfile.avatarFile)
      avatarPromise = updateAvatarApi(avatarForm)
    }
    avatarPromise
      .then(() => {
        // 2.Update profile fields (exlucding avatarFile and avatar preview url)
        const { avatarFile, avatar, ...profileFields } = draftProfile
        return updateUserProfileApi(profileFields)
      })
      .then((data) => {
        setCurrentUser(data.user) //update context/global state
        setDraftProfile({
          ...data.user,
          avatarFile: undefined,
          avatar: data.user.avatar,
        })
        setShowInfoModal(true)
        triggerDonationStatusRefresh()
      })
      .catch((err) => {
        alert(err.message || 'Could not update Profile')
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  return (
    <div className="edit__modal">
      <Button
        variant="modal__close-btn"
        text="X"
        onClick={onCloseEditModal}
      ></Button>

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
              onClose={onCloseInfoModal} // closes info modal only
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
              onClick={handleDeleteAccount}
            />
          </div>
        )}
        {showInfoDeleteModal && (
          <div className="modal-overlay">
            <InformationModal
              text={'Account deleted with the meals.'}
              onClose={() => setShowInfoModal(false)}
            ></InformationModal>
          </div>
        )}
      </form>
    </div>
  )
}

export default EditProfileModal
