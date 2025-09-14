import './HomePageHeader.css'
import Button from '../../../common/buttons/Buttons'
import logo from '../../../../assets/logos/logo.png'
import { useNavigate } from 'react-router-dom'
import About from '../../../../pages/about/About'

const HomePageHeader = ({
  //defaults
  variant = 'default ',
  children,
  className = '',
  text,
  ...props
}) => {
  const navigate = useNavigate()
  const navigatePages = (index) => navigate(`/${index}`)

  return (
    <header className="homepage__header">
      <div className="header__content">
        <img className="meal__match-logo" src={logo}></img>
        <div className="header__buttons">
          <Button
            onClick={() => navigatePages('login')}
            text={'Login/Register'}
            variant="secondary"
          ></Button>
        </div>
      </div>
    </header>
  )
}
export default HomePageHeader
