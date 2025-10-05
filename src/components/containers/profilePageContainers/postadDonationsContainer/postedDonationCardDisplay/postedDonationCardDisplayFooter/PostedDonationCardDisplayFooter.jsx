import Button from '../../../../../common/buttons/Buttons'
import './PostedDonationCardDisplayFooter.css'

const PostedDonationCardDisplayFooter = ({ selectedMeal }) => {
  // Only show the footer if it's a karm donation and not live
  if (!selectedMeal.karm || selectedMeal.live) {
    return null
  }

  // TODO: Add an onClick handler for downloading the receipt if needed
  return (
    <div className="posted__donation-card-footer">
      Text receipt is available <Button text="CLICK" variant="" /> for Download
    </div>
  )
}

export default PostedDonationCardDisplayFooter
