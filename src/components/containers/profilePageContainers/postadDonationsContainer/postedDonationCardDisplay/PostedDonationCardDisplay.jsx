import Button from '../../../../common/buttons/Buttons'
import PostedDonationCardInfo from './postedDonationCardInfo/PostedDonationCardInfo'
import './PostedDonationCardDisplay.css'
import EditMealCardModalForm from '../../../../common/modals/editMealCardModal/EditMealCardModal'
import PostedDonationCardDisplayFooter from './postedDonationCardDisplayFooter/PostedDonationCardDisplayFooter'
import { useState } from 'react'
import ConfirmationModal from '../../../../common/modals/confirmationModal/ConfirmationModal'
import InformationModal from '../../../../common/modals/informationModals/InformationModal'
const PostedDonationCardDisplay = ({
  selectedMeal,
  onSave,
  onDelete,
  onToggleLive,
  currentUserId,
  triggerDonationStatusRefresh,
  pendingUpdatedMeal,
  setSelectedMeal,
}) => {
  const [showEditMealCardModal, setShowEditMealCardModal] = useState(false)
  const [showDeleteCardModal, setShowDeleteCardModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const [showPickedUpCardModal, setShowPickedUpCardModal] = useState(false)
  const isOwner = selectedMeal.ownerId === currentUserId
  const [showDeleteMealInfoModal, setShowDeleteMealInfoModal] = useState(false)
  const [showPickedUpInfoModal, setShowPickedUpInfoModal] = useState(false)
  const [error, setError] = useState('')
  const handlePickedUp = () => {
    if (!selectedMeal?._id) return
    setIsToggling(true)
    Promise.resolve(onToggleLive(selectedMeal._id, false))
      .then(() => {
        setShowPickedUpInfoModal(true)
        setShowPickedUpCardModal(false)
      })
      .catch(() => {
        setError('Meal could not marked as picked up, try again later.')
        setShowPickedUpInfoModal(true)
      })
      .finally(() => setIsToggling(false))
  }

  const handleConfirmDelete = () => {
    console.log(showDeleteMealInfoModal)
    if (!selectedMeal?._id) return
    setIsDeleting(true)
    Promise.resolve(onDelete(selectedMeal._id))
      .then(() => {
        setShowDeleteCardModal(false)
        setShowDeleteMealInfoModal(true)
        triggerDonationStatusRefresh()
      })
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
      {isOwner && (
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
                    setSelectedMeal={setSelectedMeal}
                    pendingUpdatedMeal={pendingUpdatedMeal}
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
      )}
      {showDeleteMealInfoModal && (
        <div className="modal-overlay">
          <InformationModal
            onClose={() => setShowDeleteMealInfoModal(false)}
            text={'Meal deleted succesfully.'}
          ></InformationModal>
        </div>
      )}
      {showPickedUpInfoModal && (
        <div className="modal-overlay">
          <InformationModal
            onClose={() => setShowPickedUpInfoModal(false)}
            text={'Meal picked up succesfully, and removed from public list.'}
          ></InformationModal>
        </div>
      )}
      {showPickedUpInfoModal && (
        <div className="modal-overlay">
          <InformationModal
            onClose={() => setShowPickedUpInfoModal(false)}
            text={
              error === ''
                ? 'Meal picked up succesfully, and removed from public list.'
                : error
            }
          ></InformationModal>
        </div>
      )}
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
