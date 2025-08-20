import Button from '../../components/common/buttons/Buttons'
import { menuButtons } from './MenuButtons'
import './Menu.css'
const navigate = ({}) => {
  return
}
const Menu = ({}) => (
  <div className="menu__container">
    {menuButtons.map((btn) => (
      <Button
        text={btn.text}
        key={btn.id}
        variant={btn.variant}
        onClick={btn.onclick}
      ></Button>
    ))}
  </div>
)
export default Menu
