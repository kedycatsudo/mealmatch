import Input from '../../../../../common/inputs/Inputs'
import handleChangEditFormInput from '../../../../../../utils/helpers/handleChangEditFormInput'
import { useParticipant } from '../../../../../../context/ParticipantContext'
import './EditProfileContactsContainer.css'

const EditProfileContactsContainer = ({}) => {
  const { participant, toggleKarm, setParticipant } = useParticipant()
  const onChange = handleChangEditFormInput(setParticipant)
  if (!participant) {
    return null
  }
  return (
    <>
      <Input
        type="number"
        onChange={onChange}
        variant="text"
        text="Phone Number"
        placeholder={participant.phone}
        className="edit__modal-contacts-input"
      ></Input>
      <Input
        type="email"
        onChange={onChange}
        variant="text"
        text="Email"
        placeholder={participant.email}
        className="edit__modal-contacts-input"
      ></Input>
    </>
  )
}
export default EditProfileContactsContainer
