import Button from '../../../../../common/buttons/Buttons'
import logo from '../../../../../../assets/logos/logo.png'
import Input from '../../../../../common/inputs/Inputs'
import './EditProfileBasicInformationsContainer.css'
import { useState, useRef } from 'react'
import ChangePasswordModal from '../../../../../common/modals/editProfileModal/changePasswordModal/ChangePasswordModal'
import useEffectShowModal from '../../../../../../utils/helpers/useEffectShowModal'

const EditProfileBasicInformationsContainer = ({
  draftProfile,
  setDraftProfile,
  currentUser,
}) => {
  const API_URL = import.meta.env.VITE_API_URL
  const fileInputRef = useRef()

  const [showModal, setShowModal] = useState(false)
  useEffectShowModal(showModal)

  if (!draftProfile) return null

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setDraftProfile((prev) => ({
        ...prev,
        avatarFile: file,
        avatar: imageUrl, // for preview
      }))
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDraftProfile({ ...draftProfile, [name]: value })
  }
  const getAvatarSrc = () => {
    if (!draftProfile.avatar) return logo
    if (draftProfile.avatar.startsWith('blob:')) return draftProfile.avatar
    if (draftProfile.avatar.startsWith('http')) return draftProfile.avatar
    return `${API_URL}${draftProfile.avatar}`
  }

  return (
    <>
      <div className="edit__modal-basic-container">
        <Button
          className="edit__modal-btns"
          type="button"
          onClick={() => fileInputRef.current.click()}
          text="Upload Picture"
        ></Button>
        <Input
          ref={fileInputRef}
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
        ></Input>
        <img
          className="edit__modal-basic-container-avatar"
          src={getAvatarSrc()}
          alt="User avatar"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = logo
          }}
        />
        <Button
          className="edit__modal-btns"
          type="button"
          variant="edit__modal-change-password"
          text="Change Password"
          onClick={() => {
            setShowModal(true)
          }}
        ></Button>
        {showModal && (
          <div className="modal-overlay">
            <ChangePasswordModal
              currentUser={draftProfile}
              onClose={() => setShowModal(false)}
            ></ChangePasswordModal>
          </div>
        )}
      </div>
      <Input
        name="printName"
        value={draftProfile.printName || ''}
        onChange={handleInputChange}
        variant="text"
        text={'Print Name'}
        placeholder="Print Name"
        className="edit__modal-input"
      ></Input>
      <Input
        name="userName"
        value={draftProfile.userName || ''}
        onChange={handleInputChange}
        variant="text"
        text="User Name"
        placeholder="User Name"
        className="edit__modal-input"
      />
    </>
  )
}
export default EditProfileBasicInformationsContainer
