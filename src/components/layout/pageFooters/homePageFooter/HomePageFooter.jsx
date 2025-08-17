import mmLogo from '../../../../assets/logos/logo.png'
import karmLogo from '../../../../assets/logos/karmLogo.svg'
import './HomePageFooter.css'
const HomePageFooter = ({}) => (
  <footer className="homefooter">
    <div className="homefooter__logos">
      <img src={mmLogo} className="homefooter__logo"></img>
      <img src={karmLogo} className="homefooter__logo"></img>
    </div>
    <div className="homefooter__social">
      <p className="homefoote__paragraph">facebook</p>
      <p className="homefoote__paragraph">twitter</p>
      <p className="homefoote__paragraph">instagram</p>
    </div>
    <div className="homefooter__container">
      <p className="homefoote__paragraph">Terms</p>
      <p className="homefoote__paragraph">Partner With Us</p>
    </div>
    <div className="homefooter__container">
      <p className="homefoote__paragraph">About MealMatch</p>
      <p className="homefoote__paragraph">Contact</p>
    </div>
  </footer>
)
export default HomePageFooter
