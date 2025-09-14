import Button from '../../../../common/buttons/Buttons'
import PostedDonationCardInfo from './postedDonationCardInfo/PostedDonationCardInfo'
import './PostedDonationCardDisplay.css'
import EditMealCardModalForm from '../../../../common/modals/editMealCardModal/EditMealCardModal'
import PostedDonationCardDisplayFooter from './postedDonationCardDisplayFooter/PostedDonationCardDisplayFooter'
import { useState } from 'react'
import ConfirmationModal from '../../../../common/modals/confirmationModal/ConfirmationModal'
const PostedDonationCardDisplay = ({ selectedMeal, onSave, onDelete }) => {
  const [showEditMealCardModal, setShowEditMealCardModal] = useState(false)
  const [showDeleteCardModal, setShowDeleteCardModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = (donationId) => {
    setDonations((prev) => prev.filter((d) => d.id !== donationId))
    if (selectedMeal?.id === donationId) setSelectedMeal({})
  }
  const handleConfirmDelete = () => {
    if (!selectedMeal?.id) return

    setIsDeleting(true)

    Promise.resolve(onDelete(selectedMeal.id))
      .then(() => {
        setShowDeleteCardModal(false)
      })
      .catch((err) => {
        console.error('Delete failed', err)
        alert('Failed to delete. Please try again.')
      })
      .finally(() => {
        setIsDeleting(false)
      })
  }

  return (
    <div className="posted__donation_card_display-container">
      <h3 className="posted__donation_card_display-container-title">
        {selectedMeal.mealName}
      </h3>

      <div className="posted__donation_card-btns">
        {selectedMeal.live ? (
          <>
            <Button
              onClick={() => setShowEditMealCardModal(true)}
              variant="card__edit"
              text="Edit"
            ></Button>
            {showEditMealCardModal && (
              <div className="modal__overlay">
                <EditMealCardModalForm
                  onClose={() => setShowEditMealCardModal(false)}
                  onSave={onSave}
                  selectedMeal={selectedMeal}
                ></EditMealCardModalForm>
              </div>
            )}
            <Button
              onClick={() => setShowDeleteCardModal(true)}
              variant="card__edit"
              text={isDeleting ? 'Deleting...' : 'Delete'}
              disabled={isDeleting}
            ></Button>
            {showDeleteCardModal && (
              <div className="modal__overlay">
                <ConfirmationModal
                  onClick={handleConfirmDelete}
                  onClose={() => setShowDeleteCardModal(false)}
                  confirmation={'Do you want to delete the meal?'}
                  isLoading={isDeleting}
                ></ConfirmationModal>
              </div>
            )}
          </>
        ) : (
          <>
            <Button variant="card__edit" text="Delete"></Button>
          </>
        )}
      </div>
      <div className="posted__donation-card-infos">
        <PostedDonationCardInfo
          selectedMeal={selectedMeal}
        ></PostedDonationCardInfo>
      </div>

      <PostedDonationCardDisplayFooter
        selectedMeal={selectedMeal}
      ></PostedDonationCardDisplayFooter>
    </div>
  )
}
export default PostedDonationCardDisplay
