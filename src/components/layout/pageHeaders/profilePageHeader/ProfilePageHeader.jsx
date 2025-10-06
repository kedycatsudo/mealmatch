import logo from '../../../../assets/logos/logo.png'
import avatar from '../../../../assets/images/avatar.jpg'
import { MenuIcon } from '../../../../assets/icons'
import './ProfilePageHeader.css'
import { ParticipantContext } from '../../../../context/ParticipantContext' // Adjust path as neededimport Button from '../../../common/buttons/Buttons'
import EditProfileModal from '../../../common/modals/editProfileModal/EditProfileModal'
import { useNavigate } from 'react-router-dom'
import UseEffectShowModal from '../../../../utils/helpers/useEffectShowModal'
import { useState } from 'react'
import Button from '../../../common/buttons/Buttons'

const ProfilePageHeader = ({ setCurrentUser, currentUser }) => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  UseEffectShowModal(showModal)

  const avatarSrc =
    currentUser && currentUser.avatar ? currentUser.avatar : logo

  return (
    <header className="profile__page-header">
      <div className="header__container">
        <img className="meal__match-logo" src={logo} alt="MealMatch logo"></img>
        <h1 className="header__container-title">PROFILE</h1>
        <Button
          onClick={() => navigate('/menu')}
          variant="burger__menu"
        ></Button>
      </div>
      <div className="header__container">
        <img
          className="profile__header-avatar"
          src={avatar}
          alt={`${currentUser.userName} avatar`}
        ></img>

        <p className="header__container-paragraph">{currentUser.userName}</p>
      </div>

      <Button
        onClick={() => setShowModal(true)}
        text="Edit Profile"
        className="header__container-btn"
      >
        <img alt="edit profile" src={MenuIcon}></img>
      </Button>
      {showModal && (
        <div className="modal-overlay">
          <EditProfileModal
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            onClose={() => setShowModal(false)}
          ></EditProfileModal>
        </div>
      )}
    </header>
  )
}
export default ProfilePageHeader
