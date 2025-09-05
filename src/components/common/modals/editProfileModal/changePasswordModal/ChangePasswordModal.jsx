import './ChangePasswordModal.css'
import Input from '../../../inputs/Inputs'
import Button from '../../../buttons/Buttons'
import { useState, useEffect } from 'react'
import { useParticipant } from '../../../../../context/ParticipantContext'
import UseEffectShowModal from '../../../../../utils/helpers/useEffectShowModal'
import InformationModal from '../../informationModals/InformationModal'
const ChangePasswordModal = ({ onClose }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { participant, toggleKarm, setParticipant } = useParticipant()
  const [showModal, setShowModal] = useState(false)
  UseEffectShowModal(showModal)
  const handleChangePassword = ({}) => {
    if (password !== confirmPassword) {
      alert(`Password do not match`)
    }
    setParticipant((prev) => ({ ...prev, password: password }))
    setShowModal(true)
  }
  return (
    <div className="change__password-container">
      <Button
        type="button"
        variant="modal__close-btn"
        text="X"
        onClick={onClose}
      ></Button>
      <Input
        name="password"
        value={participant.password}
        type="password"
        variant="text"
        className="change__password-container-input"
        text="Current Password"
        placeholder="********"
        readOnly
      ></Input>
      <Input
        name="newPassword"
        type="password"
        variant="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="change__password-container-input"
        text="New Password"
      ></Input>
      <Input
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        variant="text"
        className="change__password-container-input"
        text="Confirm Password"
      ></Input>
      <div className="change__password-container-buttons">
        <Button
          type="button"
          onClick={handleChangePassword}
          variant="edit__modal-change-password"
          text="Save Changes"
        ></Button>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <InformationModal
            onClose={() => {
              onClose()
              setShowModal(false)
            }}
          ></InformationModal>
        </div>
      )}
    </div>
  )
}
export default ChangePasswordModal
