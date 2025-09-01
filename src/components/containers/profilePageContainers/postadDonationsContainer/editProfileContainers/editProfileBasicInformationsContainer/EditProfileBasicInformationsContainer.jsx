import Button from '../../../../../common/buttons/Buttons'
import Avatar from '../../../../../../assets/images/avatar.jpg'
import Input from '../../../../../common/inputs/Inputs'
import './EditProfileBasicInformationsContainer.css'
import { KarmCheckIcon } from '../../../../../../assets/icons'
import { CancelIcon } from '../../../../../../assets/icons'
import { useParticipant } from '../../../../../../context/ParticipantContext'
const EditProfileBasicInformationsContainer = ({}) => {
  const { participant, toggleKarm } = useParticipant()
  if (!participant) {
    console.log(participant)
  }

  return (
    <>
      <div className="edit__modal-basic-container">
        <Button text="Upload Picture"></Button>
        <img className="edit__modal-basic-container-avatar" src={Avatar}></img>
        <Button text="Change Password"></Button>
      </div>
      <Input
        variant="text"
        text={'Print Name'}
        placeholder={participant.printName}
        className="edit__modal-input"
      ></Input>

      <Input
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
