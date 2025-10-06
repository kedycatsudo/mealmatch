import './ExploreFoodDonationCardInfo.css'
const ExploreFoodDonationCardInfo = ({ selectedMeal }) => {
  // Format dates for better readability
  const useBy = selectedMeal.useBy
    ? new Date(selectedMeal.useBy).toLocaleDateString()
    : ''
  const postDate = selectedMeal.postDate
    ? new Date(selectedMeal.postDate).toLocaleDateString()
    : ''

  // Format allergens for display
  const allergens = Array.isArray(selectedMeal.allergens)
    ? selectedMeal.allergens.join(', ')
    : selectedMeal.allergens
  return (
    <>
      <div className="explore_donation-card-info-container">
        <p className="explore_donation-card-info">Use By: {useBy}</p>
      </div>

      <div className="explore_donation-card-info-container">
        <p className="explore_donation-card-info">
          PortionSize: {selectedMeal.servings}
        </p>
      </div>
      <div className="explore_donation-card-info-container">
        <p className="explore_donation-card-info">Posted Date: {postDate}</p>
      </div>
      <div className="explore_donation-card-info-container">
        <p className="explore_donation-card-info">
          Including Allergens: {allergens}
        </p>
      </div>
    </>
  )
}
export default ExploreFoodDonationCardInfo
