import './EditMealCardModal.css'
import PostedDonationCardDisplay from '../../../containers/profilePageContainers/postadDonationsContainer/postedDonationCardDisplay/PostedDonationCardDisplay'
const EditMealCardModal = ({ selectedMeal }) => {
  return (
    <div className="edit__meal_modal-container">
      <PostedDonationCardDisplay
        selectedMeal={selectedMeal}
      ></PostedDonationCardDisplay>
    </div>
  )
}
export default EditMealCardModal

//copy the PostedDonationCardDisplay.jsx to here and make exacty the same
//layout with inputs.
