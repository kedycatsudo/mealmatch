import Button from '../../../common/buttons/Buttons'
import PostedDonationCardInfo from '../../profilePageContainers/postadDonationsContainer/postedDonationCardDisplay/postedDonationCardInfo/PostedDonationCardInfo'
import './ExploreFoodDonationCardDisplay.css'
import ExploreFoodDonationCardInfo from './exploreFoodDonationCardInfo/ExploreFoodDonationCardInfo'
import PostedDonationCardDisplayFooter from '../../profilePageContainers/postadDonationsContainer/postedDonationCardDisplay/postedDonationCardDisplayFooter/PostedDonationCardDisplayFooter'
import { useState } from 'react'
const ExploreFoodDonationCardDisplay = ({ selectedMeal }) => {
  const [showModal, setShowModal] = useState(false)
  const cardDeleteBtn = () => {}
  return (
    <div className="explore__donation_card_display-container">
      <h3 className="explore__donation_card_display-container-title">
        {selectedMeal.mealName}
      </h3>

      <div className="explore__donation_card-btns">
        <Button
          onClick={() => setShowModal(true)}
          variant="card__edit"
          text="Accept"
        ></Button>
      </div>
      <div className="explore__donation-card-infos">
        <ExploreFoodDonationCardInfo
          selectedMeal={selectedMeal}
        ></ExploreFoodDonationCardInfo>
      </div>
    </div>
  )
}
export default ExploreFoodDonationCardDisplay
