import './ParticipantsContainer.css'
import { participants } from '../../../../utils/constants/participantsConstants'
import { ArrowRight } from '../../../../assets/icons/index'
import participantContainerListItem from './ParticipantsContainerListItem'
const ParticipantsContainer = ({ participantName }) => (
  <div className="participantsContainer__container">
    <ul className="participantsContainer__container_list">
      <li className="participantsContainer__container_list-item">
        <h2 className="participantsContainer__container_list-item-participant">
          asdsad
        </h2>
      </li>
      <li className="participantsContainer__container_list-item">
        <h2 className="participantsContainer__container_list-item-participant">
          asdsad
        </h2>
      </li>
      <li className="participantsContainer__container_list-item">
        <h2 className="participantsContainer__container_list-item-participant">
          asdsad
        </h2>
      </li>
    </ul>
    <img className="testimonial__container_cards-skip" src={ArrowRight}></img>
  </div>
)
export default ParticipantsContainer
