import './ShareFoodHeader.css'
import logo from '../../../../assets/logos/logo.png'
const ShareFoodHeader = ({}) => {
  return (
    <div className="share__food-header-container">
      <p className="share__food-header-p">Share Food</p>
      <img className="share__food-header-logo" src={logo}></img>
    </div>
  )
}
export default ShareFoodHeader
