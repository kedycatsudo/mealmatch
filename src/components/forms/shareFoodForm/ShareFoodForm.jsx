import './ShareFoodForm.css'
import { useNavigate } from 'react-router-dom'
import { ParticipantContext } from '../../../context/ParticipantContext'
import { MealsContext } from '../../../context/MealsContext' // <-- NEW!
import { useRecentDonation } from '../../../context/RecentDonationsContext'
import { useState, useContext } from 'react'
import Input from '../../common/inputs/Inputs'
import Button from '../../common/buttons/Buttons'
import InformationModal from '../../common/modals/informationModals/InformationModal'

const initialDonation = {
  mealName: '',
  useBy: '',
  pickUpLoc: '',
  allergens: '',
  contactPhone: '',
  servings: 1,
  karm: false,
}

const ShareFoodForm = () => {
  const { currentUser } = useContext(ParticipantContext)
  const { addMeal } = useContext(MealsContext) // <-- NEW!
  const { addRecentDonation } = useRecentDonation()
  const [donation, setDonation] = useState(initialDonation)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  // Handle input changes
  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setDonation((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // Handle submit
  const handleSubmitForm = (e) => {
    e.preventDefault()

    // Create new donation object with all required fields for your schema
    const newDonation = {
      ...donation,
      _id: Date.now().toString(), // simple unique id for MVP
      ownerId: currentUser?._id,
      postDate: new Date().toISOString(),
      live: true,
      hold: false,
      pickedUp: false,
      claimedUpBy: null,
      claimedUpAt: null,
    }
    addMeal(newDonation) // Add to MealsContext!
    addRecentDonation(newDonation) // Optionally keep this for your modal

    setShowModal(true)
    setDonation(initialDonation) // Reset form after submit
  }

  const navigateTo = (path) => navigate(`/${path}`)

  return (
    <form className="food__form" onSubmit={handleSubmitForm}>
      <div className="food__form-inputs-container">
        <div className="food__form-inputs">
          <Input
            className="food__form-input"
            name="mealName"
            value={donation.mealName}
            onChange={onChange}
            required={true}
            text="Meal Name *"
            type="text"
            variant="text"
          />
          <Input
            name="useBy"
            value={donation.useBy}
            onChange={onChange}
            required={true}
            text="Use By *"
            type="date"
            variant="text"
          />
          <Input
            name="pickUpLoc"
            value={donation.pickUpLoc}
            onChange={onChange}
            required={true}
            text="Pick Up Location *"
            type="text"
            variant="text"
          />
        </div>
        <div className="food__form-inputs">
          <Input
            name="allergens"
            value={donation.allergens}
            onChange={onChange}
            text="Allergens"
            type="text"
            variant="text"
          />
          <Input
            name="contactPhone"
            value={donation.contactPhone}
            onChange={onChange}
            text="Contact Person Phone"
            type="text"
            variant="text"
          />
          <Input
            name="servings"
            value={donation.servings}
            onChange={onChange}
            text="Serving Size"
            type="number"
            variant="text"
          />
        </div>
      </div>
      <div className="karm__toggle-container">
        <p className="karm__togle-p">Offer this donation to KARM</p>
        <Input
          className="checkbox"
          checked={donation.karm}
          type="checkbox"
          name="karm"
          onChange={onChange}
        />
      </div>

      <Button
        variant="login__button-container-submit"
        text="Donate"
        type="submit"
      />

      {showModal && (
        <div className="modal-overlay">
          <InformationModal
            text={'Donation shared successfully.'}
            onClose={() => {
              setShowModal(false)
              navigateTo('profile')
            }}
          />
        </div>
      )}
    </form>
  )
}
export default ShareFoodForm
