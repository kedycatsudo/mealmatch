import { KarmCheckIcon } from '../../../../../../assets/icons/index'
import { CancelIcon } from '../../../../../../assets/icons/index'
const PostedDonationsListItemSpan = ({ donationsData }) => {
  return (
    <>
      <span className="posted__donation-spam">{donationsData.allergens}</span>
      <span className="posted__donation-spam">{donationsData.postDate}</span>
      <span className="posted__donation-spam">{donationsData.portionSize}</span>
      <img
        alt={donationsData.mealName}
        src={donationsData.live ? KarmCheckIcon : CancelIcon}
        className="karm__check-icon"
      ></img>

      <span className="posted__donation-spam">{donationsData.useBy}</span>
      <span className="posted__donation-spam">{donationsData.mealName}</span>
    </>
  )
}
export default PostedDonationsListItemSpan
