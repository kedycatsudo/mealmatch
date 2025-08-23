import './PostedDonationsContainer.css'
import SearchBox from '../../../common/searchBox/SearchBox.jsx'
import DonationsListTitle from './postedDonationsListContainer/DonationListTitle.jsx'
import PostedDonationListItem from './postedDonationsListContainer/PostedDonationListItem'
import PostedDonationCardDisplay from './postedDonationCardDisplay/PostedDonationCardDisplay'
const PostedDonationsContainer = ({ donations, setDonations }) => {
  //make the List Item dynamic
  return (
    <div className="posted__donations-container">
      <SearchBox></SearchBox>

      <div className="posted__donations-list-cards">
        <ul className="posted__donations-list-container">
          <DonationsListTitle></DonationsListTitle>
          {donations && donations.length > 0
            ? donations.map((donation, idx) => (
                <PostedDonationListItem
                  key={donation.id || idx}
                  donations={donation}
                />
              ))
            : null}
        </ul>
        <PostedDonationCardDisplay />
      </div>
    </div>
  )
}
export default PostedDonationsContainer
