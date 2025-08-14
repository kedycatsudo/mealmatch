import Button from '../../../common/buttons/Buttons'
import './IntroContainer.css'
const IntroContainer = ({}) => (
  <div className="container">
    <div className="container__sloganbtns">
      <h1 className="container__slogan">Share Meals Reduce Waste</h1>
      <div className="container__buttons">
        <Button variant="secondary" text={`Post Food`}></Button>
        <Button variant="secondary" text={`Find Meals Nearby`}></Button>
      </div>
    </div>
    <p className="container__introduction">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dictum
      blandit risus vel condimentum. Donec fermentum lorem quis nibh lacinia
      volutpat. Pellentesque condimentum accumsan magna id interdum. Vestibulum
      ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
      curae; Pellentesque habitant morbi tristique senectus et netus et
      malesuada fames.
    </p>
  </div>
)
export default IntroContainer
