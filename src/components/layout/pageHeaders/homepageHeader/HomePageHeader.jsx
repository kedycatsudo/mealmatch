import './HomePageHeader.css'
import Button from '../../../common/buttons/Buttons'
import logo from '../../../../assets/logos/logo.png'
import { useNavigate } from 'react-router-dom'

const HomePageHeader = () => {
  const navigate = useNavigate()

  return (
    <header className="homepage__header">
      <div className="header__content">
        <img className="meal__match-logo" src={logo} alt="MealMatch Logo" />
        <div className="header__buttons">
          <Button
            onClick={() => navigate('/login')}
            text="Login/Register"
            variant="secondary"
          />
        </div>
      </div>
    </header>
  )
}
export default HomePageHeader
