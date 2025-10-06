import Button from '../../../../../common/buttons/Buttons'
import logo from '../../../../../../assets/logos/logo.png'
import Input from '../../../../../common/inputs/Inputs'
import avatar from '../../../../../../assets/images/avatar.jpg'
import './EditProfileBasicInformationsContainer.css'
import { useState, useRef } from 'react'
import ChangePasswordModal from '../../../../../common/modals/editProfileModal/changePasswordModal/ChangePasswordModal'
import useEffectShowModal from '../../../../../../utils/helpers/useEffectShowModal'
const defaultAvatar = { logo }

const EditProfileBasicInformationsContainer = ({
  setCurrentUser,
  currentUser,
}) => {
  const fileInputRef = useRef()

  const [showModal, setShowModal] = useState(false)

  if (!currentUser) return null

  useEffectShowModal(showModal)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setCurrentUser({ ...currentUser, avatar: imageUrl })
      // TODO: Upload to backend if needed!
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentUser({ ...currentUser, [name]: value })
    // TODO: Save to backend after editing or on submit!
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
          src={avatar}
          alt="User avatar"
        ></img>
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
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              onClose={() => setShowModal(false)}
            ></ChangePasswordModal>
          </div>
        )}
      </div>
      <Input
        name="printName"
        value={currentUser.printName}
        onChange={handleInputChange}
        variant="text"
        text={'Print Name'}
        placeholder="Print Name"
        className="edit__modal-input"
      ></Input>
      <Input
        name="userName"
        value={currentUser.userName || ''}
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
