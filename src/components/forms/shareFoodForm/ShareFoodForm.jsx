import './ShareFoodForm.css'
import donationsData from '../../../constants/donationsData'
import { useNavigate } from 'react-router-dom'
import { useParticipant } from '../../../context/ParticipantContext'
import { useRecentDonation } from '../../../context/RecentDonationsContext'
import { useState } from 'react'
import Input from '../../common/inputs/Inputs'
import Button from '../../common/buttons/Buttons'
import handleFormInput from '../../../utils/helpers/handleChangEditFormInput'
import InformationModal from '../../common/modals/informationModals/InformationModal'
const ShareFoodForm = ({}) => {
  const { participant, toggleKarm, setParticipant } = useParticipant()
  const { addRecentDonation } = useRecentDonation()
  const [showModal, setShowModal] = useState(false)
  const onChange = handleFormInput(setParticipant)
  const navigate = useNavigate()
  const navigateTo = (index) => navigate(`/${index}`)
  const handleSubmitForm = (e) => {
    console.log('Adding donation:', participant.donationsList[0])
    e.preventDefault()
    if (participant.donationsList[0].karm) {
      addRecentDonation(participant.donationsList[0])
    } else {
    }
    setShowModal(true)
  }
  return (
    <form className="food__form" onSubmit={handleSubmitForm}>
      <div className="food__form-inputs-container">
        <div className="food__form-inputs">
          <Input
            name="mealName"
            value={participant.donationsList[0].mealName}
            onChange={onChange}
            required={true}
            text="Meal Name *"
            type="text"
            variant="text"
          ></Input>
          <Input
            name="useBy"
            value={participant.donationsList[0].useBy}
            onChange={onChange}
            required={true}
            text="Use By *"
            type="date"
            variant="text"
          ></Input>
          <Input
            name="pickUpLoc"
            value={participant.donationsList[0].pickUpLoc}
            onChange={onChange}
            required={true}
            text="Pick Up Location *"
            type="text"
            variant="text"
          ></Input>
        </div>
        <div className="food__form-inputs">
          <Input
            name="allergens"
            value={participant.donationsList[0].allergens}
            onChange={onChange}
            text="Allergens"
            type="text"
            variant="text"
          ></Input>
          <Input
            name="contactPhone"
            value={participant.donationsList[0].contactPhone}
            onChange={onChange}
            text="Contact Person Phone"
            type="text"
            variant="text"
          ></Input>
          <Input
            name="servings"
            value={participant.donationsList[0].servings}
            onChange={onChange}
            text="Serving Size"
            type="number"
            variant="text"
          ></Input>
        </div>
      </div>
      <div className="karm__toggle-container">
        <p className="karm__togle-p">Offer this donation to KARM</p>
        <Input
          className="checkbox"
          checked={participant.donationsList[0].karm}
          type="checkbox"
          onChange={() => toggleKarm('donation')}
        ></Input>
      </div>

      <Button
        onClick={handleSubmitForm}
        variant="login__button-container-submit"
        text="Donate"
        type="button"
      ></Button>
      {showModal && (
        <div className="modal-overlay">
          <InformationModal
            text={'Donation shared succesfully.'}
            onClose={() => {
              setShowModal(false)
              navigateTo('profile')
            }}
          ></InformationModal>
        </div>
      )}
    </form>
  )
}
export default ShareFoodForm
