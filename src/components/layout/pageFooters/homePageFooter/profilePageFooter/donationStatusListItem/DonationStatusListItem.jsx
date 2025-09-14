const DonationStatusListItem = ({ text, participantsDataCategory, icon }) => {
  return (
    <li className="profile__footer-status-list-item">
      <p className="profile__footer-status-list-item-p">
        {text}:{participantsDataCategory}
        {text === 'Karm Donor' ? <img src={icon}></img> : null}
      </p>
    </li>
  )
}
export default DonationStatusListItem
