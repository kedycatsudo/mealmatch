import './HomePageHeader.css'
import Button from '../../../common/buttons/Buttons'
import logo from '../../../../assets/logos/logo.png'
import { useNavigate } from 'react-router-dom'

const HomePageHeader = ({
  //defaults
  variant = 'default ',
  children,
  className = '',
  text,
  ...props
}) => {
  const navigate = useNavigate()
  const navigateLogin = ({}) => navigate('/login')

  return (
    <header className="homepage__header">
      <div className="header__content">
        <img className="meal__match-logo" src={logo}></img>
        <div className="header__buttons">
          <Button
            onClick={navigateLogin}
            text={'Login/Register'}
            variant="secondary"
          ></Button>
          <Button
            onClick={navigateLogin}
            text={'About Meal Match'}
            variant="secondary"
          ></Button>
        </div>
      </div>
    </header>
  )
}
export default HomePageHeader
