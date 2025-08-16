import { participants } from '../../../../utils/constants/participantsConstants'
import './TestimonialCardsContainer.css'
const testimonialCardsListItem = ({ participantName, recentDonation }) => (
  <li className="testimonial__container_cards-item">
    <p className="testimonial__container_cards-item-p">
      We received{recentDonation} meals donation from {participantName} last
      week
    </p>
  </li>
)
export default testimonialCardsListItem
//Task:
