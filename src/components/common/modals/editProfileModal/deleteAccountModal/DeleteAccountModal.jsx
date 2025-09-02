import './DeleteAccountModal.css'
import Button from '../../../buttons/Buttons'
import { useNavigate, Navigate } from 'react-router-dom'
const DeleteAccountModal = ({ onClose }) => {
  const navigate = useNavigate()
  const navigatePages = (index) => {
    navigate(`/${index}`)
  }
  const deleteAccount = ({}) => {
    navigatePages('home')
  }
  return (
    <div className="delete__account-modal-container">
      <p className="delete__account-modal-container-p">
        Confirm that your Meal Match Account will be deleted.
      </p>

      <Button variant="modal__close-btn" text="X" onClick={onClose}></Button>
      <div className="modal__btns">
        <Button text="Yes" onClick={deleteAccount}></Button>
        <Button onClick={onClose} text="No"></Button>
      </div>
    </div>
  )
}
export default DeleteAccountModal
