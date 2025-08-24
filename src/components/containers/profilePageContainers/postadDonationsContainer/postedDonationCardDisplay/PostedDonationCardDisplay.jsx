import Button from '../../../../common/buttons/Buttons'
import PostedDonationCardInfo from './postedDonationCardInfo/PostedDonationCardInfo'
import './PostedDonationCardDisplay.css'
import PostedDonationCardDisplayFooter from './postedDonationCardDisplayFooter/PostedDonationCardDisplayFooter'
import donationsData from '../../../../../constants/donationsData'
const PostedDonationCardDisplay = ({}) => {
  return (
    <div className="posted__donation_card_display-container">
      <h3 className="posted__donation_card_display-container-title">
        {donationsData[0].mealName}
      </h3>
      <div className="posted__donation_card-btns">
        <Button variant="card__edit" text="Edit"></Button>
        <Button variant="card__edit" text="Delete"></Button>
      </div>
      <div className="posted__donation-card-infos">
        <PostedDonationCardInfo
          donationsData={donationsData}
        ></PostedDonationCardInfo>
      </div>

      <PostedDonationCardDisplayFooter
        donationsData={donationsData}
      ></PostedDonationCardDisplayFooter>
    </div>
  )
}
export default PostedDonationCardDisplay
