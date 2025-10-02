import Button from '../../../../../common/buttons/Buttons'
import Input from '../../../../../common/inputs/Inputs'
import './EditProfileBasicInformationsContainer.css'
import { ParticipantContext } from '../../../../../../context/ParticipantContext'
import handleFormInput from '../../../../../../utils/helpers/handleChangEditFormInput'
import { useState, useRef, useContext } from 'react'
import UseEffectShowModal from '../../../../../../utils/helpers/useEffectShowModal'
import ChangePasswordModal from '../../../../../common/modals/editProfileModal/changePasswordModal/ChangePasswordModal'
const EditProfileBasicInformationsContainer = ({}) => {
  const fileInputRef = useRef()
  const { users, currentUser, setCurrentUser } = useContext(ParticipantContext)
  const [showModal, setShowModal] = useState(false)
  const onChange = handleFormInput(setParticipant)

  const onClick = ({}) => {
    return
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setCurrentUser((prev) => ({ ...prev, avatar: imageUrl }))
    }
  }
  UseEffectShowModal(showModal)
  if (!currentUser) {
    return null
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
          src={currentUser.avatar}
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
              onClose={() => setShowModal(false)}
            ></ChangePasswordModal>
          </div>
        )}
      </div>
      <Input
        name="printName"
        value={currentUser.userName}
        onChange={onChange}
        variant="text"
        text={'Print Name'}
        placeholder={currentUser.userName}
        className="edit__modal-input"
      ></Input>

      <Input
        value={currentUser.userName}
        name="userName"
        onChange={onChange}
        variant="text"
        text={'User Name'}
        placeholder={currentUser.userName}
        className="edit__modal-input"
      ></Input>
    </>
  )
}
export default EditProfileBasicInformationsContainer
