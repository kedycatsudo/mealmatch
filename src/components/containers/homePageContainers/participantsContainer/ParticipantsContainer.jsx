import './ParticipantsContainer.css'
import { participants } from '../../../../utils/constants/participantsConstants'
import { ArrowRight } from '../../../../assets/icons/index'
import ParticipantContainerItem from './ParticipantsContainerItem'
const bestFourParticipant = participants.slice(-4)

const ParticipantsContainer = ({ participantName }) => (
  <div className="participantsContainer__container">
    <ul className="participantsContainer__container_list">
      {bestFourParticipant.map((participant, idx) => (
        <ParticipantContainerItem
          key={idx}
          participantName={participant.profileInfo.basic.name}
        ></ParticipantContainerItem>
      ))}
    </ul>
  </div>
)
export default ParticipantsContainer
