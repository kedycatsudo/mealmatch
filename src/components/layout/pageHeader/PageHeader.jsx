import './PageHeader.css'
import Button from '../../common/buttons/Buttons'
import logo from '../../../assets/logos/logo.png'
const PageHeader = () => (
  <header className="header">
    <div className="header__content">
      <img className="meal__match-logo" src={logo}></img>
      <div className="header__profile-layout">
        <Button text={'Login/Register'} variant="secondary"></Button>
        <Button
          text={'Become A Partner with Karm'}
          variant="karm__adds"
        ></Button>
      </div>
    </div>
  </header>
)
export default PageHeader
