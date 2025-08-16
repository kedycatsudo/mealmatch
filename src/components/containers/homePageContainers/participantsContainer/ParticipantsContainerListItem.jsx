import './ParticipantsContainer.css'
const participantContainerListItem = ({ participantName }) => (
  <li className="participantsContainer__container_list-item">
    <h2 className="participantsContainer__container_list-item-participant">
      {participantName}
    </h2>
  </li>
)
export default participantContainerListItem
