import { participants } from '../../../../utils/constants/participantsConstants'
import { useRecentDonation } from '../../../../context/RecentDonationsContext'

import './TestimonialCardsContainer.css'
const TestimonialCardsListItem = ({ donation }) => {
  return (
    <li className="testimonial__container_cards-item">
      <p className="testimonial__container_cards-item-p">
        We received{donation} meals donation from {}
        last week
      </p>
    </li>
  )
}

export default TestimonialCardsListItem
