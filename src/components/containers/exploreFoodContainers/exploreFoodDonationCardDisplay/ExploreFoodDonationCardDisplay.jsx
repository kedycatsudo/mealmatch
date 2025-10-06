import Button from '../../../common/buttons/Buttons'
import ConfirmationModal from '../../../common/modals/confirmationModal/ConfirmationModal'
import './ExploreFoodDonationCardDisplay.css'
import ExploreFoodDonationCardInfo from './exploreFoodDonationCardInfo/ExploreFoodDonationCardInfo'
import { useState } from 'react'
const ExploreFoodDonationCardDisplay = ({
  selectedMeal,
  donationHold,
  onConfirmAccept,
  onClick,
}) => {
  const [showModalAcceptDonation, setShowModalAcceptDonation] = useState(false)

  const onClose = () => setShowModalAcceptDonation(false)

  const handleAcceptConfirm = () => {
    if (onConfirmAccept) onConfirmAccept()
    setShowModalAcceptDonation(false)
    if (onClick) onClick()
    // If you want to call a backend API, you can do so here in future!
  }

  return (
    <div className="explore__donation_card_display-container">
      <h3 className="explore__donation_card_display-container-title">
        {selectedMeal.mealName}
      </h3>

      <div className="explore__donation_card-btns">
        {!donationHold && (
          <Button
            type="button"
            onClick={() => setShowModalAcceptDonation(true)}
            variant="card__edit"
            text="Accept"
          />
        )}

        {showModalAcceptDonation && (
          <div className="modal-overlay">
            <ConfirmationModal
              onClick={handleAcceptConfirm}
              confirmation={
                'Confirm that you are requesting to pick up the seleceted donation.'
              }
              onClose={onClose}
            ></ConfirmationModal>
          </div>
        )}
      </div>
      <div className="explore__donation-card-infos">
        <ExploreFoodDonationCardInfo selectedMeal={selectedMeal} />
      </div>
    </div>
  )
}
export default ExploreFoodDonationCardDisplay
