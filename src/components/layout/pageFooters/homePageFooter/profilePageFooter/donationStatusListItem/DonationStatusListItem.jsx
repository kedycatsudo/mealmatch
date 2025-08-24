const DonationStatusListItem = ({ text, participantsDataCategory }) => {
  return (
    <li className="profile__footer-status-list-item">
      <p className="profile__footer-status-list-item-p">
        {text}:{participantsDataCategory}
      </p>
    </li>
  )
}
export default DonationStatusListItem
