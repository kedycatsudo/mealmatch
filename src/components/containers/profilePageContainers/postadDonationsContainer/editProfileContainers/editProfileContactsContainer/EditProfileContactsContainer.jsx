import Input from '../../../../../common/inputs/Inputs'
import handleFormInput from '../../../../../../utils/helpers/handleChangEditFormInput'
import { useContext } from 'react'
import { ParticipantContext } from '../../../../../../context/ParticipantContext' // Adjust path as needed
import './EditProfileContactsContainer.css'

const EditProfileContactsContainer = ({}) => {
  const { users, currentUser, setCurrentUser } = useContext(ParticipantContext)
  const onChange = handleFormInput(setCurrentUser)
  if (!currentUser) {
    return null
  }
  return (
    <>
      <Input
        name="phone"
        value={currentUser.phone}
        type="number"
        onChange={onChange}
        variant="text"
        text="Phone Number"
        placeholder={currentUser.phone}
        className="edit__modal-contacts-input"
      ></Input>
      <Input
        name="email"
        value={currentUser.email}
        type="email"
        onChange={onChange}
        variant="text"
        text="Email"
        placeholder={currentUser.email}
        className="edit__modal-contacts-input"
      ></Input>
    </>
  )
}
export default EditProfileContactsContainer
