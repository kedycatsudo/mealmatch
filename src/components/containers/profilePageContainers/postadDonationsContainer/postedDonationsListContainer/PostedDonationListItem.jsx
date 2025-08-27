import PostedDonationsListItemSpan from './postedDonationsListItemSpan/PostedDonationsListItemSpan'
import './PostedDonationListItem.css'
const PostedDonationListItem = ({ donation, onClick }) => {
  if (donation.live) {
    return (
      <li onClick={onClick} className="list__item-container">
        <PostedDonationsListItemSpan
          donationsData={donation}
        ></PostedDonationsListItemSpan>
      </li>
    )
  }
  return (
    <li onClick={onClick} className="list__item-container not-active">
      <PostedDonationsListItemSpan
        donationsData={donation}
      ></PostedDonationsListItemSpan>
    </li>
  )
}
export default PostedDonationListItem
