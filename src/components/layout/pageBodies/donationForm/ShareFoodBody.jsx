import './ShareFoodBody.css'
import ShareFoodForm from '../../../forms/shareFoodForm/ShareFoodForm'
const ShareFoodBody = ({ currentUser }) => {
  return (
    <div className="donation__form-container">
      <ShareFoodForm currentUser={currentUser}></ShareFoodForm>
    </div>
  )
}
export default ShareFoodBody
