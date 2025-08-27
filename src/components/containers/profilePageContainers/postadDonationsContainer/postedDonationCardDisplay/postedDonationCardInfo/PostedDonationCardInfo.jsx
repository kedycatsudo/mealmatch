import './PostedDonationCardInfo.css'
const PostedDonationCardInfo = ({ selectedMeal }) => {
  return (
    <>
      <div className="posted_donation-card-info-container">
        <p className="posted_donation-card-info">
          Use By: {selectedMeal.useBy}
        </p>
      </div>
      <div className="posted_donation-card-info-container">
        <p className="posted_donation-card-info">
          {selectedMeal.karm ? 'Karm donation' : 'Karm donation is N/A'}
          {/* make it dynamic  */}
        </p>
      </div>
      <div className="posted_donation-card-info-container">
        <p className="posted_donation-card-info">
          PortionSize: {selectedMeal.portionSize}
        </p>
      </div>
      <div className="posted_donation-card-info-container">
        <p className="posted_donation-card-info">
          Posted Date: {selectedMeal.postDate}
        </p>
      </div>
      <div className="posted_donation-card-info-container">
        <p className="posted_donation-card-info">
          Including Allergens: {selectedMeal.allergens}
        </p>
      </div>
    </>
  )
}
export default PostedDonationCardInfo
