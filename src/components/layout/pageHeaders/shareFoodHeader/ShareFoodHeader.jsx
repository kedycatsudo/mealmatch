import './ShareFoodHeader.css'
import { useNavigate } from 'react-router-dom'
import Button from '../../../common/buttons/Buttons'
import logo from '../../../../assets/logos/logo.png'

const ShareFoodHeader = () => {
  const navigate = useNavigate()
  const navigateToMenu = () => navigate('/menu')

  return (
    <div className="share__food-header-container">
      <h1 className="share__food-header-h">Share Food</h1>
      <img
        className="share__food-header-logo"
        src={logo}
        alt="MealMatch Logo"
      />
      <Button
        className="menu__btn"
        onClick={navigateToMenu}
        variant="burger__menu"
      />
    </div>
  )
}

export default ShareFoodHeader
