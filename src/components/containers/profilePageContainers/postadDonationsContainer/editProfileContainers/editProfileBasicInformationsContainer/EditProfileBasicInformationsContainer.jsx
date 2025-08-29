import Button from '../../../../../common/buttons/Buttons'
import Avatar from '../../../../../../assets/images/avatar.jpg'
import Input from '../../../../../common/inputs/Inputs'
import './EditProfileBasicInformationsContainer.css'
import { KarmCheckIcon } from '../../../../../../assets/icons'
import { CancelIcon } from '../../../../../../assets/icons'
const EditProfileBasicInformationsContainer = ({
  participantData,
  toggleKarm,
}) => {
  console.log(participantData.karm)
  return (
    <>
      <div className="edit__modal-basic-container">
        <Button text="Upload Picture"></Button>
        <img className="edit__modal-basic-container-avatar" src={Avatar}></img>
        <Button text="Change Password"></Button>
      </div>
      <Input
        placeholder={participantData.printName}
        className="edit__modal-input"
      ></Input>

      <Input
        placeholder={participantData.userName}
        className="edit__modal-input"
      ></Input>
      <div className="edit__modal-basic-container-small">
        <p className="edit__modal-basic-container-p">Karm</p>
        <Input
          className="checkbox"
          type="checkbox"
          checked={participantData.karm}
          onChange={toggleKarm}
        ></Input>
        <img
          className="edit__modal-basic-container-logo"
          src={participantData.karm ? KarmCheckIcon : CancelIcon}
        ></img>
      </div>
    </>
  )
}
export default EditProfileBasicInformationsContainer
