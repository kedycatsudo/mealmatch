import './ParticipantsContainer.css'
import { useParticipant } from '../../../../context/ParticipantContext'
import ParticipantContainerItem from './ParticipantsContainerItem'

const ParticipantsContainer = ({}) => {
  const { participantsData } = useParticipant() // <-- move this inside the component
  const bestFourParticipant = Array.isArray(participantsData)
    ? participantsData.slice(-4)
    : []
  return (
    <div className="participantsContainer__container">
      <ul className="participantsContainer__container_list">
        {bestFourParticipant.map((participant, id) => (
          <ParticipantContainerItem
            key={participant.id}
            participantName={participant.username}
          />
        ))}
      </ul>
    </div>
  )
}

export default ParticipantsContainer
