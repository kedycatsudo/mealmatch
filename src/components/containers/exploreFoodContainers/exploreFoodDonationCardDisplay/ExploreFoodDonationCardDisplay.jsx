import Button from '../../../common/buttons/Buttons'
import ConfirmationModal from '../../../common/modals/confirmationModal/ConfirmationModal'
import './ExploreFoodDonationCardDisplay.css'
import ExploreFoodDonationCardInfo from './exploreFoodDonationCardInfo/ExploreFoodDonationCardInfo'
import { useState } from 'react'
import InformationModal from '../../../common/modals/informationModals/InformationModal'
const ExploreFoodDonationCardDisplay = ({
  selectedMeal,
  donationHold,
  onAcceptDonation,
  infoText,
  showInfoModal,
  setShowInfoModal,
}) => {
  const [showModalAcceptDonation, setShowModalAcceptDonation] = useState(false)

  const onClose = () => setShowModalAcceptDonation(false)

  const handleAcceptConfirm = () => {
    if (onAcceptDonation && selectedMeal._id) {
      onAcceptDonation(selectedMeal._id) // <--- call parent's handler with ID
    }
    setShowModalAcceptDonation(false)
    // Any additional UI logic
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
            text="Accept Donation"
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
        {showInfoModal && (
          <div style={{ zIndex: 111111 }} className="modal-overlay">
            <InformationModal
              text={infoText}
              onClose={() => {
                setShowInfoModal(false)
              }}
            ></InformationModal>
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
