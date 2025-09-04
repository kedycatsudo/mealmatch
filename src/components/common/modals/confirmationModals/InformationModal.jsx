import Button from '../../buttons/Buttons'
import './InformationModal.css'
const InformationModal = ({ onClose, text }) => {
  return (
    <div className="information__modal-container">
      <Button variant="modal__close-btn" text="X" onClick={onClose}></Button>

      <p className="information__modal-container-p">{text}</p>
    </div>
  )
}
export default InformationModal
