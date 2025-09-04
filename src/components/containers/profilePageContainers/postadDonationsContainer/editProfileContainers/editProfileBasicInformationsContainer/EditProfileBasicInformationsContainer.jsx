import Button from '../../../../../common/buttons/Buttons'
import Input from '../../../../../common/inputs/Inputs'
import './EditProfileBasicInformationsContainer.css'
import { KarmCheckIcon, CancelIcon } from '../../../../../../assets/icons'
import { useParticipant } from '../../../../../../context/ParticipantContext'
import handleFormInput from '../../../../../../utils/helpers/handleChangEditFormInput'
import { useState, useRef } from 'react'
import UseEffectShowModal from '../../../../../../utils/helpers/useEffectShowModal'
import ChangePasswordModal from '../../../../../common/modals/editProfileModal/changePasswordModal/ChangePasswordModal'
const EditProfileBasicInformationsContainer = ({}) => {
  const fileInputRef = useRef()
  const { participant, toggleKarm, setParticipant } = useParticipant()
  const [showModal, setShowModal] = useState(false)
  const onChange = handleFormInput(setParticipant)

  const onClick = ({}) => {
    return
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setParticipant((prev) => ({ ...prev, avatar: imageUrl }))
    }
  }
  UseEffectShowModal(showModal)
  if (!participant) {
    return null
  }

  return (
    <>
      <div className="edit__modal-basic-container">
        <Button
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
          src={participant.avatar}
        ></img>
        <Button
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
        value={participant.printName}
        onChange={onChange}
        variant="text"
        text={'Print Name'}
        placeholder={participant.printName}
        className="edit__modal-input"
      ></Input>

      <Input
        value={participant.userName}
        name="userName"
        onChange={onChange}
        variant="text"
        text={'User Name'}
        placeholder={participant.userName}
        className="edit__modal-input"
      ></Input>
      <div className="edit__modal-basic-container-small">
        <p className="edit__modal-basic-container-p">Karm</p>
        <Input
          className="checkbox"
          type="checkbox"
          checked={participant.karm}
          onChange={toggleKarm}
        ></Input>
        <img
          className="edit__modal-basic-container-logo"
          src={participant.karm ? KarmCheckIcon : CancelIcon}
        ></img>
      </div>
    </>
  )
}
export default EditProfileBasicInformationsContainer
