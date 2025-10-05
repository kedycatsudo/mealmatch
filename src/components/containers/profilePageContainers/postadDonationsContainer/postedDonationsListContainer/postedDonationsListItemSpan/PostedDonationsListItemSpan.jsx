import { KarmCheckIcon } from '../../../../../../assets/icons/index'
import { CancelIcon } from '../../../../../../assets/icons/index'
import './PostedDonationsListItemSpan.css'
const PostedDonationsListItemSpan = ({ mealData }) => {
  // Format allergens array

  const allergens = Array.isArray(mealData.allergens)
    ? mealData.allergens.join(', ')
    : mealData.allergens

  // Format dates

  const postDate = mealData.postDate
    ? new Date(mealData.postDate).toLocaleDateString()
    : ''

  const UseBy = mealData.useBy
    ? new Date(mealData.useBy).toLocaleDateString()
    : ''

  return (
    <>
      <span className="posted__donation-spam">{allergens}</span>
      <span className="posted__donation-spam">{postDate}</span>
      <span className="posted__donation-spam">{mealData.servings}</span>
      <img
        alt={mealData.mealName}
        src={mealData.karm ? KarmCheckIcon : CancelIcon}
        className="karm__check-icon"
      ></img>

      <span className="posted__donation-spam">{UseBy}</span>
      <span className="posted__donation-spam">{mealData.mealName}</span>
    </>
  )
}
export default PostedDonationsListItemSpan
