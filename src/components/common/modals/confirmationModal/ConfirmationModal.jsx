import './ConfirmationModal.css'
import Button from '../../buttons/Buttons'

const ConfirmationModal = ({ onClose, confirmation, onClick }) => {
  return (
    <div className="confirmation__modal-container">
      <p className="confirmation__modal-container-p">{confirmation}</p>
      <Button variant="modal__close-btn" text="X" onClick={onClose}></Button>
      <div className="confirmation__modal-btns">
        <Button text="yes" onClick={onClick}></Button>
        <Button onClick={onClose} text="No"></Button>
      </div>
    </div>
  )
}
export default ConfirmationModal
