import './PostedDonationCardInfo.css'
const PostedDonationCardInfo = ({ donationsData }) => {
  return (
    <>
      <div className="posted_donation-card-info-container">
        <p className="posted_donation-card-info">
          Use By: {donationsData[0].useBy}
        </p>
      </div>
      <div className="posted_donation-card-info-container">
        <p className="posted_donation-card-info">
          Karm donation N/A{/* make it dynamic  */}
        </p>
      </div>
      <div className="posted_donation-card-info-container">
        <p className="posted_donation-card-info">
          PortionSize: {donationsData[0].portionSize}
        </p>
      </div>
      <div className="posted_donation-card-info-container">
        <p className="posted_donation-card-info">
          Posted Date: {donationsData[0].postDate}
        </p>
      </div>
      <div className="posted_donation-card-info-container">
        <p className="posted_donation-card-info">
          Including Allergens: {donationsData[0].allergens}
        </p>
      </div>
    </>
  )
}
export default PostedDonationCardInfo
