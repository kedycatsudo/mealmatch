import logo from '../../../../assets/logos/logo.png'
import { MenuIcon } from '../../../../assets/icons'
import './ProfilePageHeader.css'
import { useParticipant } from '../../../../context/ParticipantContext'
import Button from '../../../common/buttons/Buttons'
import { Navigate, useNavigate } from 'react-router-dom'
const ProfilePageHeader = ({}) => {
  const navigate = useNavigate()
  const navigateToMenu = () => navigate(`/menu`)
  const { participantsData } = useParticipant()
  return (
    <header className="profile__page-header">
      <div className="header__container">
        <img className="meal__match-logo" src={logo}></img>
        <h1 className="header__container-title">PROFILE</h1>
        <Button
          onClick={() => navigateToMenu()}
          variant="burger__menu"
        ></Button>
      </div>
      <div className="header__container">
        <img alt="user avatar"></img>

        <p className="header__container-paragraph">
          {participantsData[0].username}
        </p>
        <p className="header__container-paragraph">
          {participantsData[0].karm === true ? 'Karm eligible' : ''}
        </p>
      </div>

      <Button text="Edit Profile" className="header__container-btn">
        <img alt="logo.svg" src={MenuIcon}></img>
      </Button>
    </header>
  )
}
export default ProfilePageHeader
