import Input from '../../../../../common/inputs/Inputs'
import './EditProfileContactsContainer.css'

const EditProfileContactsContainer = ({ draftProfile, setDraftProfile }) => {
  if (!draftProfile) return null

  const handleContactChange = (e) => {
    const { name, value } = e.target
    setDraftProfile((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <>
      <Input
        name="phone"
        value={draftProfile.phone || ''}
        type="tel"
        onChange={handleContactChange}
        variant="text"
        text="Phone Number"
        placeholder="Phone number"
        className="edit__modal-contacts-input"
      ></Input>
      <Input
        name="email"
        value={draftProfile.email || ''}
        type="email"
        onChange={handleContactChange}
        variant="text"
        text="Email"
        placeholder="Email Address"
        className="edit__modal-contacts-input"
      ></Input>
    </>
  )
}
export default EditProfileContactsContainer
