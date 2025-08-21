import Button from '../../../common/buttons/Buttons'
import './IntroContainer.css'
const IntroContainer = ({}) => (
  <div className="Intro__container">
    <div className="Intro__container_sloganbtns">
      <h1 className="Intro__container_slogan">Share Meals Reduce Waste</h1>
      <div className="Intro__container_buttons">
        <Button variant="secondary" text={`Post Food`}></Button>
        <Button variant="secondary" text={`Find Meals Nearby`}></Button>
      </div>
    </div>
    <p className="Intro__container__ntroduction">
      Every day, individuals, catering companies, and bulk kitchens throw away
      perfectly good food due to lack of an easy way to give it away before it
      expires. Meanwhile, many people in the same communities go hungry or
      struggle to afford groceries. MealMatch creates a local sharing economy
      for surplus meals, groceries, and ingredients — reducing waste and helping
      those in need.
    </p>
  </div>
)
export default IntroContainer
