import './ChangePasswordModal.css'
import Input from '../../../inputs/Inputs'
import Button from '../../../buttons/Buttons'
import { useState } from 'react'
import UseEffectShowModal from '../../../../../utils/helpers/useEffectShowModal'
import InformationModal from '../../informationModals/InformationModal'

const ChangePasswordModal = ({ currentUser, setCurrentUser, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')

  UseEffectShowModal(showModal)

  const handleChangePassword = ({}) => {
    setError('')

    if (newPassword !== confirmPassword) {
      setError('Password do not match!')
      return
    }
    if (!currentPassword) {
      setError('Please enter your current password')
      return
    }
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
        name="currentPassword"
        value={currentPassword}
        type="password"
        variant="text"
        className="change__password-container-input"
        text="Current Password"
        placeholder="********"
        onChange={(e) => setCurrentPassword(e.target.value)}
      ></Input>
      <Input
        name="newPassword"
        type="password"
        variant="text"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="change__password-container-input"
        text="New Password"
        placeholder="********"
      />
      <Input
        name="confirmPassword"
        type="password"
        variant="text"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="change__password-container-input"
        text="New Password"
      ></Input>
      {error && (
        <div className="modal__overlay">
          <InformationModal
            text={error}
            onClose={() => {
              setShowModal(false)
              onClose()
            }}
          ></InformationModal>
        </div>
      )}

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
            text={'Password changed succesfully'}
            onClose={() => {
              setShowModal(false)
              onClose()
            }}
          ></InformationModal>
        </div>
      )}
    </div>
  )
}
export default ChangePasswordModal
