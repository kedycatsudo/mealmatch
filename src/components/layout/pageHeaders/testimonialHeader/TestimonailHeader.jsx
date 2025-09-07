import './TestimonialHeader.css'
import { Navigate, useNavigate } from 'react-router-dom'

import Logo from '../../../../assets/logos/logo.png'
import Button from '../../../common/buttons/Buttons'

const TestimonialHeader = ({}) => {
  const navigate = useNavigate()
  const navigateTo = (index) => navigate(`/${index}`)
  return (
    <div>
      <div className="">
        <img className="logo" src={Logo}></img>
        <h1 className="header__container-h">Testimonials</h1>

        <Button
          className="menu__btn"
          onClick={() => navigateTo('menu')}
          variant="burger__menu"
        ></Button>
      </div>
    </div>
  )
}
export default TestimonialHeader
