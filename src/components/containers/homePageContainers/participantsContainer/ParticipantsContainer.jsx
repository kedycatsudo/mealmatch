import './ParticipantsContainer.css'
import { useContext } from 'react'
import { ParticipantContext } from '../../../../context/ParticipantContext'
import ParticipantContainerItem from './ParticipantsContainerItem'

const ParticipantsContainer = () => {
  const { users } = useContext(ParticipantContext) // get users array from context

  // Pick "best" four participants - here last four, you can adjust sorting logic as needed
  const bestFourParticipants = Array.isArray(users) ? users.slice(-4) : []

  return (
    <div className="participantsContainer__container">
      <ul className="participantsContainer__container_list">
        {bestFourParticipants.map((participant) => (
          <ParticipantContainerItem
            key={participant._id}
            participantName={participant.userName}
            // pass other props as needed, e.g. avatar, donationStatus, etc.
          />
        ))}
      </ul>
    </div>
  )
}

export default ParticipantsContainer
