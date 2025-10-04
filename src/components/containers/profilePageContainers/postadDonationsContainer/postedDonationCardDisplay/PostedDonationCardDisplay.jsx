import Button from '../../../../common/buttons/Buttons'
import PostedDonationCardInfo from './postedDonationCardInfo/PostedDonationCardInfo'
import './PostedDonationCardDisplay.css'
import EditMealCardModalForm from '../../../../common/modals/editMealCardModal/EditMealCardModal'
import PostedDonationCardDisplayFooter from './postedDonationCardDisplayFooter/PostedDonationCardDisplayFooter'
import { useState } from 'react'
import ConfirmationModal from '../../../../common/modals/confirmationModal/ConfirmationModal'
const PostedDonationCardDisplay = ({
  selectedMeal,
  onSave,
  onDelete,
  onToggleLive,
  currentUserId,
}) => {
  const [showEditMealCardModal, setShowEditMealCardModal] = useState(false)
  const [showDeleteCardModal, setShowDeleteCardModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const [showPickedUpCardModal, setShowPickedUpCardModal] = useState(false)
  const isOwner = selectedMeal.ownerId === currentUserId

  const handlePickedUp = () => {
    if (!selectedMeal?._id) return
    setIsToggling(true)
    Promise.resolve(onToggleLive(selectedMeal._id, false))
      .then(() => setShowPickedUpCardModal(false))
      .catch(() => alert('Failed to mark as picked up. Please try again.'))
      .finally(() => setIsToggling(false))
  }

  const handleConfirmDelete = () => {
    if (!selectedMeal?._id) return
    setIsDeleting(true)
    Promise.resolve(onDelete(selectedMeal._id))
      .then(() => setShowDeleteCardModal(false))
      .catch((err) => {
        console.error('Delete failed', err)
        alert('Failed to delete. Please try again.')
      })
      .finally(() => setIsDeleting(false))
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

            <Button
              onClick={() => setShowPickedUpCardModal(true)}
              variant="card__edit"
              text={isToggling ? 'Marking...' : 'Picked Up'}
              disabled={isToggling}
            />
            {showPickedUpCardModal && (
              <div className="modal__overlay">
                <ConfirmationModal
                  onClick={handlePickedUp}
                  onClose={() => setShowPickedUpCardModal(false)}
                  confirmation={'Mark this meal as picked up?'}
                  isLoading={isToggling}
                ></ConfirmationModal>
              </div>
            )}
          </>
        ) : (
          <>
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
