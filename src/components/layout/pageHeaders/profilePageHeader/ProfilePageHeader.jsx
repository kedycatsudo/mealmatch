import logo from '../../../../assets/logos/logo.png'
import { MenuIcon } from '../../../../assets/icons'
import './ProfilePageHeader.css'
import { ParticipantProvider } from '../../../../context/ParticipantContext'
import Button from '../../../common/buttons/Buttons'
const ProfilePageHeader = ({}) => {
  return (
    <div className="profile__page-header">
      <div className="header__container">
        <img className="meal__match-logo" src={logo}></img>
        <h1 className="header__container-header">PROFILE</h1>
        <Button></Button>
      </div>
      <div className="header__container">
        <img alt="user avatar"></img>
        <p className="header__container">{ParticipantProvider[0]}</p>
        <p className="header__container">UserName</p>
      </div>
      <div className="header__container">
        <Button>
          <img alt="logo.svg" src={MenuIcon}></img>
        </Button>
      </div>
    </div>
  )
}
export default ProfilePageHeader
