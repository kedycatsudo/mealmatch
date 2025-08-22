import donationsData from '../../../../constants/donationsData'
import { CancelIcon } from '../../../../assets/icons'
import './PostedDonationListItem.css'
const PostedDonationListItem = ({}) => {
  return (
    <li className="list__item-container">
      <span className="list__item-property">{donationsData[0].allergens}</span>
      <span className="list__item-property">{donationsData[0].postDate}</span>
      <span className="list__item-property">
        {donationsData[0].portionSize}
      </span>
      <span className="list__item-property">
        <img className="list__item-icon" src={CancelIcon}></img>
      </span>
      <span className="list__item-property">{donationsData[0].useBy}</span>
    </li>
  )
}
export default PostedDonationListItem
