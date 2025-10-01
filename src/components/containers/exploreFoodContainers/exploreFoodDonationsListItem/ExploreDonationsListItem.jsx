import ExploreFoodDonationsListItemSpan from '../exploreFoodDonationsListItemSpan/ExploreFoodDonationsListItemSpan'
import './ExploreDonationsListItem.css'
const ExploreDonationsListItem = ({
  donationHold,
  donation,
  onClick,
  cancelDonation,
}) => {
  return (
    <li onClick={onClick} className="explore__food-list__item-container">
      <ExploreFoodDonationsListItemSpan
        donationsData={donation}
      ></ExploreFoodDonationsListItemSpan>
      {donationHold && (
        <div className="overlay">
          <span>Hold for pick up</span>
        </div>
      )}
    </li>
  )
}
export default ExploreDonationsListItem
