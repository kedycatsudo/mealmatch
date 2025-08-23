import PostedDonationsListItemSpan from './postedDonationsListItemSpan/PostedDonationsListItemSpan'
import './PostedDonationListItem.css'
const PostedDonationListItem = ({ donations }) => {
  return (
    <li className="list__item-container">
      {}
      <PostedDonationsListItemSpan
        donationsData={donations}
      ></PostedDonationsListItemSpan>
    </li>
  )
}
export default PostedDonationListItem
