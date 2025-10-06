import './EditProfileAdressesContainer.css'
import Input from '../../../../../common/inputs/Inputs'

const EditProfileAddressesContainer = ({ currentUser, setCurrentUser }) => {
  if (!currentUser) return null
  const handleContactChange = (e) => {
    const { name, value } = e.target
    setCurrentUser((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <>
      <Input
        name="country"
        value={currentUser.country || ''}
        type="text"
        onChange={handleContactChange}
        variant="text"
        text="Country"
        className="edit__profile_addresses-input"
        placeholder="Country"
      ></Input>
      <Input
        name="city"
        value={currentUser.city || ''}
        type="text"
        onChange={handleContactChange}
        variant="text"
        text="City"
        className="edit__profile_addresses-input"
        placeholder="City"
      ></Input>
      <Input
        name="state"
        value={currentUser.state || ''}
        type="text"
        onChange={handleContactChange}
        variant="text"
        text="State/Province/area"
        className="edit__profile_addresses-input"
        placeholder="State/Province/area"
      ></Input>
      <Input
        name="address"
        value={currentUser.address || ''}
        type="text"
        onChange={handleContactChange}
        variant="text"
        text="Address"
        className="edit__profile_addresses-input"
        placeholder="Address"
      ></Input>
      <Input
        name="zipCode"
        value={currentUser.zipCode || ''}
        type="number"
        onChange={handleContactChange}
        variant="text"
        text="Zip Code"
        className="edit__profile_addresses-input"
        placeholder="Zip Code"
      ></Input>
    </>
  )
}
export default EditProfileAddressesContainer
