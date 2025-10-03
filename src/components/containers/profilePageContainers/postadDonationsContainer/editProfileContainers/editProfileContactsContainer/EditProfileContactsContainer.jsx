import Input from '../../../../../common/inputs/Inputs'
import './EditProfileContactsContainer.css'

const EditProfileContactsContainer = ({ currentUser, setCurrentUser }) => {
  if (!currentUser) return null

  const handleContactChange = (e) => {
    const { name, value } = e.target
    setCurrentUser((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <>
      <Input
        name="phone"
        value={currentUser.phone}
        type="tel"
        onChange={handleContactChange}
        variant="text"
        text="Phone Number"
        placeholder="Phone number"
        className="edit__modal-contacts-input"
      ></Input>
      <Input
        name="email"
        value={currentUser.email}
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
