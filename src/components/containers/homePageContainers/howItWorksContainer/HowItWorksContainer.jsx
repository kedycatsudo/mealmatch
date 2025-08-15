import './HowItWorksContainer.css'
import {
  SearchIcon,
  CheckIcon,
  Dollar,
  Globe,
  ChefSvg,
} from '../../../../assets/icons/index'
import Button from '../../../common/buttons/Buttons'

const HowItWorksContainer = ({}) => (
  <div className="howItWorks__container">
    <ul className="howItWorks__container_cards-list">
      <li className="howItWorks__container_cards_lits-item">
        <div className="howItWorks__container_cards-iconbox">
          <img
            className="howItWorks__container_cards-icon"
            src={SearchIcon}
            alt="Search logo"
          ></img>
        </div>
        <p className="howItWorks__container__cards-parapraph">
          Find Food/
          <br />
          Post Food
        </p>
      </li>
      <li className="howItWorks__container_cards_lits-item">
        <div className="howItWorks__container_cards-iconbox">
          <img
            className="howItWorks__container_cards-icon"
            src={CheckIcon}
            alt="Search logo"
          ></img>
        </div>
        <p className="howItWorks__container__cards-parapraph">
          Arrange
          <br />
          Pick Up
        </p>
      </li>
      <li className="howItWorks__container_cards_lits-item">
        <div className="howItWorks__container_cards-iconbox">
          <img
            className="howItWorks__container_cards-icon"
            src={Dollar}
            alt="Search logo"
          ></img>
        </div>
        <p className="howItWorks__container__cards-parapraph">
          Donate to Karm/
          <br />
          Get Tax reciept
        </p>
      </li>
      <li className="howItWorks__container_cards_lits-item">
        <div className="howItWorks__container_cards-iconbox">
          <img
            className="howItWorks__container_cards-icon"
            src={Globe}
            alt="Search logo"
          ></img>
        </div>
        <p className="howItWorks__container__cards-parapraph">
          Reduce
          <br /> Waste
        </p>
      </li>
    </ul>
    <p className="howItWorks__container_information">
      Businesses can donate meals & earn tax benefits through KARM
    </p>
    <div className="howItWorks__container_karm">
      <div className="howItWorks__container_karm-infos">
        <h2 className="howItWorks__container_karm-subtitle">
          Are You a Caterer, School or Restaurant?
        </h2>
        <p className="howItWorks__container_karm-paragraph">
          You can donate surplus food and get tax deductions via our partner
          Karm.
        </p>
        <Button
          className="how__ItWorks__container_karm-btn"
          text={`Join as a Karm Donor `}
          variant="secondary"
        ></Button>
        <p className="howItWorks__container_karm-paragraph">
          But even if you are none of it, MealMatch still connects you directly
          with people in need.{' '}
        </p>
      </div>
      <img className="howItWorks__container_karm-chef" src={ChefSvg}></img>
    </div>
  </div>
)
export default HowItWorksContainer
