import './ShareFoodForm.css'
import { useNavigate } from 'react-router-dom'
import { MealsContext } from '../../../context/MealsContext'
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

const requiredFields = ['mealName', 'useBy', 'pickUpLoc']

const ShareFoodForm = ({ currentUser }) => {
  const { addMeal } = useContext(MealsContext)
  const { addRecentDonation } = useRecentDonation()
  const [donation, setDonation] = useState(initialDonation)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Helper: Check if all required fields are filled
  const allFieldsFilled = requiredFields.every(
    (field) =>
      typeof donation[field] === 'string' && donation[field].trim() !== ''
  )

  // Handle input changes
  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setDonation((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setError('') // Clear error on change
  }

  // Handle submit
  const handleSubmitForm = (e) => {
    e.preventDefault()
    if (!currentUser) return

    if (!allFieldsFilled) {
      setError(
        'Please fill all required fields: Meal Name, Use By, Pick Up Location.'
      )
      return
    }

    const allergensArray = donation.allergens
      ? donation.allergens
          .split(',')
          .map((a) => a.trim())
          .filter((a) => a)
      : []
    const newDonation = {
      ...donation,
      _id: Date.now().toString(),
      ownerId: currentUser._id,
      postDate: new Date().toISOString(),
      live: true,
      hold: false,
      pickedUp: false,
      claimedUpBy: null,
      claimedUpAt: null,
      allergens: allergensArray,
    }
    addMeal(newDonation)
    addRecentDonation(newDonation)
    setShowModal(true)
    setDonation(initialDonation)
    setError('')
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

      {error && (
        <div
          className="food__form-error"
          style={{ color: 'red', marginBottom: '1em' }}
        >
          {error}
        </div>
      )}

      <Button
        variant="login__button-container-submit"
        text="Donate"
        type="submit"
        disabled={!allFieldsFilled}
      />
      {!allFieldsFilled && (
        <div
          className="food__form-error"
          style={{ color: 'red', marginTop: '1em' }}
        >
          Please fill all required fields: Meal Name, Use By, Pick Up Location.
        </div>
      )}

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
