import './EditProfileAdressesContainer.css'
import Input from '../../../../../common/inputs/Inputs'

const EditProfileAddressesContainer = ({ draftProfile, setDraftProfile }) => {
  if (!draftProfile) return null

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setDraftProfile((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <>
      <Input
        name="country"
        value={draftProfile.country || ''}
        type="text"
        onChange={handleAddressChange}
        variant="text"
        text="Country"
        className="edit__profile_addresses-input"
        placeholder="Country"
      ></Input>
      <Input
        name="city"
        value={draftProfile.city || ''}
        type="text"
        onChange={handleAddressChange}
        variant="text"
        text="City"
        className="edit__profile_addresses-input"
        placeholder="City"
      ></Input>
      <Input
        name="state"
        value={draftProfile.state || ''}
        type="text"
        onChange={handleAddressChange}
        variant="text"
        text="State/Province/area"
        className="edit__profile_addresses-input"
        placeholder="State/Province/area"
      ></Input>
      <Input
        name="address"
        value={draftProfile.address || ''}
        type="text"
        onChange={handleAddressChange}
        variant="text"
        text="Address"
        className="edit__profile_addresses-input"
        placeholder="Address"
      ></Input>
      <Input
        name="zipcode"
        value={draftProfile.zipcode || ''}
        type="text"
        onChange={handleAddressChange}
        variant="text"
        text="Zip Code"
        className="edit__profile_addresses-input"
        placeholder="Zip Code"
      ></Input>
    </>
  )
}
export default EditProfileAddressesContainer
