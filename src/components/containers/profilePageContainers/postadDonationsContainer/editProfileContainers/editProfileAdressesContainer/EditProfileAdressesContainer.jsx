import './EditProfileAdressesContainer.css'
import { useParticipant } from '../../../../../../context/ParticipantContext'
import handleChangEditFormInput from '../../../../../../utils/helpers/handleChangEditFormInput'
import Input from '../../../../../common/inputs/Inputs'

const EditProfileAddressesContainer = ({}) => {
  const { participant, toggleKarm, setParticipant } = useParticipant()
  const onChange = handleChangEditFormInput(setParticipant)
  if (!participant) {
    return null
  }
  return (
    <>
      <Input
        type="text"
        onChange={onChange}
        variant="text"
        text="Country"
        className="edit__profile_addresses-input"
        placeholder={participant.country}
      ></Input>
      <Input
        type="text"
        onChange={onChange}
        variant="text"
        text="City"
        className="edit__profile_addresses-input"
        placeholder={participant.city}
      ></Input>
      <Input
        type="text"
        onChange={onChange}
        variant="text"
        text="State/Province/area"
        className="edit__profile_addresses-input"
        placeholder={participant.state}
      ></Input>
      <Input
        type="text"
        onChange={onChange}
        variant="text"
        text="Address"
        className="edit__profile_addresses-input"
        placeholder={participant.adress}
      ></Input>
      <Input
        type="number"
        onChange={onChange}
        variant="text"
        text="Zip Code"
        className="edit__profile_addresses-input"
        placeholder={participant.zipCode}
      ></Input>
    </>
  )
}
export default EditProfileAddressesContainer
