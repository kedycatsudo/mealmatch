import PostedDonationsListItemSpan from './postedDonationsListItemSpan/PostedDonationsListItemSpan'
import './PostedDonationListItem.css'

const PostedDonationListItem = ({ meal, onClick }) => {
  const itemClass = meal.live
    ? 'list__item-container'
    : 'list__item-container not-active'

  return (
    <li
      onClick={onClick}
      className={itemClass}
      tabIndex={0}
      role="button"
      aria-pressed={meal.live}
    >
      <PostedDonationsListItemSpan mealData={meal} />
    </li>
  )
}

export default PostedDonationListItem
