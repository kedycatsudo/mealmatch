import logo from '../../../../assets/logos/logo.png'
import { MenuIcon } from '../../../../assets/icons'
import './ProfilePageHeader.css'
import { useParticipant } from '../../../../context/ParticipantContext'
import Button from '../../../common/buttons/Buttons'
import EditProfileModal from '../../../common/modals/editProfileModal/EditProfileModal'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
const ProfilePageHeader = ({}) => {
  const navigate = useNavigate()
  const navigateToMenu = () => navigate(`/menu`)
  const { participantsData = [] } = useParticipant() || {}
  const { toggleKarm } = useParticipant()
  const [showModal, setShowModal] = useState(false)
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
          {participantsData[0].userName}
        </p>
        <p className="header__container-paragraph">
          {participantsData[0].karm === true ? 'Karm Donor' : ''}
        </p>
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
            toggleKarm={toggleKarm}
            participantData={participantsData[0]}
          ></EditProfileModal>
        </div>
      )}
    </header>
  )
}
export default ProfilePageHeader
