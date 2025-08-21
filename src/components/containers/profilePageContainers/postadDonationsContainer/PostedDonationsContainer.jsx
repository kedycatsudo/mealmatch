import './PostedDonationsContainer.css'
import SearchBox from '../../../common/searchBox/SearchBox'
import Button from '../../../common/buttons/Buttons'
const PostadDonationsContainer = ({}) => {
  return (
    <div className="posted__donations-container">
      <SearchBox></SearchBox>
      <div className="posted__donations-list-cards">
        Donation cards and card display
        <ul className="posted__donations-list-container"></ul>
        <div className="posted__donation-card-display"></div>
      </div>
    </div>
  )
}
export default PostadDonationsContainer
