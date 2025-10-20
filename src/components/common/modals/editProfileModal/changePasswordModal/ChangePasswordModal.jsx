import './ChangePasswordModal.css'
import Input from '../../../inputs/Inputs'
import Button from '../../../buttons/Buttons'
import { useState } from 'react'
import UseEffectShowModal from '../../../../../utils/helpers/useEffectShowModal'
import InformationModal from '../../informationModals/InformationModal'
import { changePasswordApi } from '../../../../../api'

const ChangePasswordModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  UseEffectShowModal(showSuccessModal || showErrorModal)

  const handleChangePassword = ({}) => {
    setError('')
    if (newPassword !== confirmPassword) {
      setError('New password do not match with confirm password')
      setShowErrorModal(true)
      return
    }
    if (!currentPassword) {
      setError('Please Enter your current password')
      setShowErrorModal(true)
      return
    }
    setIsLoading(true)
    changePasswordApi({ currentPassword, newPassword })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || 'Password change failed.')
          })
        }
        setShowSuccessModal(true)
      })
      .catch((err) => {
        setError(err.message)
        setShowErrorModal(true)
      })
      .finally(() => setIsLoading(false))
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

      <div className="change__password-container-buttons">
        <Button
          type="button"
          onClick={handleChangePassword}
          variant="edit__modal-change-password"
          text="Save Changes"
        ></Button>
      </div>
      {showErrorModal && (
        <div className="modal__overlay">
          <InformationModal
            text={error}
            onClose={() => setShowErrorModal(false)}
          ></InformationModal>
        </div>
      )}
      {showSuccessModal && (
        <div className="modal-overlay">
          <InformationModal
            text={'Password changed successfully'}
            onClose={() => {
              setShowSuccessModal(false)
              onClose()
            }}
          />
        </div>
      )}
    </div>
  )
}
export default ChangePasswordModal
