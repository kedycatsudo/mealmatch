import ExploreFoodDonationsListItemSpan from '../exploreFoodDonationsListItemSpan/ExploreFoodDonationsListItemSpan'
import './ExploreDonationsListItem.css'
const ExploreDonationsListItem = ({ donation, onClick }) => {
  return (
    <li onClick={onClick} className="explore__food-list__item-container">
      <ExploreFoodDonationsListItemSpan
        donationsData={donation}
      ></ExploreFoodDonationsListItemSpan>
      {donation.hold && (
        <div className="overlay">
          <span>Hold for pick up</span>
        </div>
      )}
    </li>
  )
}
export default ExploreDonationsListItem
