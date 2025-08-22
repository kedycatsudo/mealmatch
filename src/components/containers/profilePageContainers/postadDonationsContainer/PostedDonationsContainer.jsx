import './PostedDonationsContainer.css'
import SearchBox from '../../../common/searchBox/SearchBox'
import Button from '../../../common/buttons/Buttons'
import PostedDonationListItem from './PostedDonationListItem'
const PostedDonationsContainer = ({ donations, setDonations }) => {
  return (
    <div className="posted__donations-container">
      <SearchBox></SearchBox>
      <div className="posted__donations-list-cards">
        <ul className="posted__donations-list-container">
          <PostedDonationListItem></PostedDonationListItem>
          <PostedDonationListItem></PostedDonationListItem>
          <PostedDonationListItem></PostedDonationListItem>
          <PostedDonationListItem></PostedDonationListItem>
          <PostedDonationListItem></PostedDonationListItem>
          <PostedDonationListItem></PostedDonationListItem>
        </ul>
        <div className="posted__donation-card-display"></div>
      </div>
    </div>
  )
}
export default PostedDonationsContainer
