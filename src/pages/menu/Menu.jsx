import Button from '../../components/common/buttons/Buttons'
import { menuButtons } from './menuButton'
import './Menu.css'
import { useNavigate } from 'react-router-dom'
const Menu = ({}) => {
  const navigate = useNavigate()
  const navigatePages = (index) => navigate(`/${index}`)
  return (
    <div className="menu__container">
      {menuButtons.map((btn) => (
        <Button
          text={btn.text}
          key={btn.id}
          variant={btn.variant}
          onClick={() => navigatePages(`${btn.text}`)}
        ></Button>
      ))}
    </div>
  )
}
export default Menu
