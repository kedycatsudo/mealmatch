import './ExploreFoodDonationCardInfo.css'
const ExploreFoodDonationCardInfo = ({ selectedMeal }) => {
  return (
    <>
      <div className="explore_donation-card-info-container">
        <p className="explore_donation-card-info">
          Use By: {selectedMeal.useBy}
        </p>
      </div>
      <div className="explore_donation-card-info-container">
        <p className="explore_donation-card-info">
          {selectedMeal.karm ? 'Karm donation' : 'Karm donation is N/A'}
        </p>
      </div>
      <div className="explore_donation-card-info-container">
        <p className="explore_donation-card-info">
          PortionSize: {selectedMeal.servings}
        </p>
      </div>
      <div className="explore_donation-card-info-container">
        <p className="explore_donation-card-info">
          Posted Date: {selectedMeal.postDate}
        </p>
      </div>
      <div className="explore_donation-card-info-container">
        <p className="explore_donation-card-info">
          Including Allergens: {selectedMeal.allergens}
        </p>
      </div>
    </>
  )
}
export default ExploreFoodDonationCardInfo
