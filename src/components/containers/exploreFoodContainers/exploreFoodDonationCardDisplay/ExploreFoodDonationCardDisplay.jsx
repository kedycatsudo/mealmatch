import Button from '../../../common/buttons/Buttons'
import ConfirmationModal from '../../../common/modals/confirmationModal/ConfirmationModal'
import './ExploreFoodDonationCardDisplay.css'
import ExploreFoodDonationCardInfo from './exploreFoodDonationCardInfo/ExploreFoodDonationCardInfo'
import { useState } from 'react'
const ExploreFoodDonationCardDisplay = ({
  cancelDonation,
  selectedMeal,
  donationHold,
  onConfirmAccept,
  onClick,
}) => {
  const [showModalAcceptDonation, setShowModalAcceptDonation] = useState(false)

  const onClose = () => setShowModalAcceptDonation(false)
  const onAccept = () => {}
  const cardDeleteBtn = () => {}
  return (
    <div className="explore__donation_card_display-container">
      <h3 className="explore__donation_card_display-container-title">
        {selectedMeal.mealName}
      </h3>

      <div className="explore__donation_card-btns">
        {donationHold ? null : (
          <Button
            type="button"
            onClick={() => setShowModalAcceptDonation(true)}
            variant="card__edit"
            text="Accept"
          ></Button>
        )}

        {showModalAcceptDonation && (
          <div className="modal-overlay">
            <ConfirmationModal
              onClick={() => {
                if (onConfirmAccept) onConfirmAccept()
                setShowModalAcceptDonation(false)
                onClick()
              }}
              confirmation={
                'Confirm that you are requesting to pick up the donation.'
              }
              onClose={onClose}
            ></ConfirmationModal>
          </div>
        )}
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
