import logo from '../../../../assets/logos/logo.png'
import { MenuIcon } from '../../../../assets/icons'
import './ProfilePageHeader.css'
import { ParticipantContext } from '../../../../context/ParticipantContext' // Adjust path as neededimport Button from '../../../common/buttons/Buttons'
import EditProfileModal from '../../../common/modals/editProfileModal/EditProfileModal'
import { useNavigate } from 'react-router-dom'
import UseEffectShowModal from '../../../../utils/helpers/useEffectShowModal'
import { useState, useContext } from 'react'
import Button from '../../../common/buttons/Buttons'
const ProfilePageHeader = ({}) => {
  const navigate = useNavigate()
  const navigateToMenu = () => navigate(`/menu`)
  const { users, currentUser, setCurrentUser } = useContext(ParticipantContext)
  const [showModal, setShowModal] = useState(false)
  UseEffectShowModal(showModal)
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
        <img
          className="profile__header-avatar"
          src={currentUser.avatar}
          alt="user avatar"
        ></img>

        <p className="header__container-paragraph">{currentUser.userName}</p>
      </div>

      <Button
        onClick={() => setShowModal(true)}
        text="Edit Profile"
        className="header__container-btn"
      >
        <img alt="logo.svg" src={MenuIcon}></img>
      </Button>
      {showModal && (
        <div className="modal-overlay">
          <EditProfileModal
            onClose={() => setShowModal(false)}
          ></EditProfileModal>
        </div>
      )}
    </header>
  )
}
export default ProfilePageHeader
