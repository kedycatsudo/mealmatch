import Button from '../../../../../common/buttons/Buttons'
import './PostedDonationCardDisplayFooter'
const PostedDonationCardDisplayFooter = ({ selectedMeal }) => {
  if (!selectedMeal.karm) {
    return <div></div>
  }
  return (
    <div className="posted__donation-card-footer">
      Text receipt is available <Button text="CLICK" variant="" /> for Download
    </div>
  )
}
export default PostedDonationCardDisplayFooter
