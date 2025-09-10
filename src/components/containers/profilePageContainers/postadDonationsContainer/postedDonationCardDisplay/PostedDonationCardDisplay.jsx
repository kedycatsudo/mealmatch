import Button from '../../../../common/buttons/Buttons'
import PostedDonationCardInfo from './postedDonationCardInfo/PostedDonationCardInfo'
import './PostedDonationCardDisplay.css'
import EditMealCardModal from '../../../../common/modals/editMealCardModal/EditMealCardModal'
import PostedDonationCardDisplayFooter from './postedDonationCardDisplayFooter/PostedDonationCardDisplayFooter'
import { useState } from 'react'
const PostedDonationCardDisplay = ({ selectedMeal }) => {
  const [showEditMealCardModal, setShowEditMealCardModal] = useState(false)
  const cardDeleteBtn = () => {}
  const onClickEdit = () => {
    setShowEditMealCardModal(true)
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
              onClick={onClickEdit}
              variant="card__edit"
              text="Edit"
            ></Button>
            <Button variant="card__edit" text="Delete"></Button>
            {showEditMealCardModal && (
              <div className="modal__overlay">
                <EditMealCardModal
                  selectedMeal={selectedMeal}
                ></EditMealCardModal>
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
