import Button from '../../components/common/buttons/Buttons'
import { menuButtons } from './menuButton'
import './Menu.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ParticipantContext } from '../../context/ParticipantContext'

const Menu = ({}) => {
  const navigate = useNavigate()
  const navigatePages = (index) => navigate(`/${index}`)
  const { logout } = useContext(ParticipantContext)

  const handleLogout = () => {
    logout() // clear context and localStorage
    navigate('/login', { state: { msg: 'Please log in to continue.' } }) // Redirect to home page
  }

  return (
    <div className="menu__container">
      {menuButtons.map((btn) => (
        <Button
          text={btn.text}
          key={btn.id}
          variant={btn.variant}
          onClick={() => navigatePages(`${btn.path}`)}
        ></Button>
      ))}
      <Button
        className="logout__btn"
        onClick={() => {
          handleLogout()
        }}
        variant="logout_btn"
      ></Button>
    </div>
  )
}
export default Menu
