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
      <a
        className="homefoote__paragraph"
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Facebook
      </a>
      <a
        className="homefoote__paragraph"
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </a>
      <a
        className="homefoote__paragraph"
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        nstagram
      </a>
    </div>
    <div className="homefooter__container">
      <p className="homefoote__paragraph">Terms</p>
    </div>
    <div className="homefooter__container">
      <p className="homefoote__paragraph">Contact</p>
      <p className="homefoote__paragraph">865 307 3143</p>

      <p className="homefoote__paragraph_email">dkocausta.linkedn@gmail.com</p>
    </div>
  </footer>
)
export default HomePageFooter
