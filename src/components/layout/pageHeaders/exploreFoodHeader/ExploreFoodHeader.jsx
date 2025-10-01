import './ExploreFoodHeader.css'
import Logo from '../../../../assets/logos/logo.png'
import Button from '../../../common/buttons/Buttons'
import SearchBox from '../../../common/searchBox/SearchBox'
import { Navigate, useNavigate } from 'react-router-dom'
const ExploreFoodHeader = ({}) => {
  const navigate = useNavigate()
  const navigateTo = (index) => navigate(`/${index}`)
  return (
    <div className="header__container">
      <div className="header__container-head">
        <img className="logo" src={Logo}></img>
        <h1 className="explore__header__container-title">Explore Food</h1>
        <Button
          className="menu__btn"
          onClick={() => navigateTo('menu')}
          variant="burger__menu"
        ></Button>
      </div>
    </div>
  )
}
export default ExploreFoodHeader
