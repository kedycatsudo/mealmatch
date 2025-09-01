import Input from '../../../../../common/inputs/Inputs'
import { useParticipant } from '../../../../../../context/ParticipantContext'
import './EditProfileContactsContainer.css'

const EditProfileContactsContainer = ({}) => {
  const { participant, toggleKarm } = useParticipant()

  return (
    <>
      <Input
        variant="text"
        text="Phone Number"
        placeholder={participant.phone}
        className="edit__modal-contacts-input"
      ></Input>
      <Input
        variant="text"
        text="Email"
        placeholder={participant.email}
        className="edit__modal-contacts-input"
      ></Input>
    </>
  )
}
export default EditProfileContactsContainer
