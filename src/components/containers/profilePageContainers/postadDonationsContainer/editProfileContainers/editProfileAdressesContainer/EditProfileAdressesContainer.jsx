import './EditProfileAdressesContainer.css'
import { useContext } from 'react'
import { ParticipantContext } from '../../../../../../context/ParticipantContext'
import handleFormInput from '../../../../../../utils/helpers/handleChangEditFormInput'
import Input from '../../../../../common/inputs/Inputs'

const EditProfileAddressesContainer = ({}) => {
  const { users, currentUser, setCurrentUser } = useContext(ParticipantContext)
  const onChange = handleFormInput(setCurrentUser)
  if (!currentUser) {
    return null
  }
  return (
    <>
      <Input
        name="country"
        value={currentUser.country}
        type="text"
        onChange={onChange}
        variant="text"
        text="Country"
        className="edit__profile_addresses-input"
        placeholder={currentUser.country}
      ></Input>
      <Input
        name="city"
        value={currentUser.city}
        type="text"
        onChange={onChange}
        variant="text"
        text="City"
        className="edit__profile_addresses-input"
        placeholder={currentUser.city}
      ></Input>
      <Input
        name="state/province/area"
        value={currentUser.state}
        type="text"
        onChange={onChange}
        variant="text"
        text="State/Province/area"
        className="edit__profile_addresses-input"
        placeholder={currentUser.state}
      ></Input>
      <Input
        name="address"
        value={currentUser.address}
        type="text"
        onChange={onChange}
        variant="text"
        text="Address"
        className="edit__profile_addresses-input"
        placeholder={currentUser.adress}
      ></Input>
      <Input
        name="zipCode"
        value={currentUser.zipCode}
        type="number"
        onChange={onChange}
        variant="text"
        text="Zip Code"
        className="edit__profile_addresses-input"
        placeholder={currentUser.zipCode}
      ></Input>
    </>
  )
}
export default EditProfileAddressesContainer
