import { testimonialCards } from '../../../../utils/constants/homePageConstants'
import './TestimonialCardsContainer.css'
const testimonialCardsItem = ({}) => (
  <li className="testimonial__container_cards-item">
    <p className="testimonial__container_cards-item-p">
      We received {testimonialCards[1].recentDonation} meals last week from
      {testimonialCards[1].participantName}.
    </p>
  </li>
)
export default testimonialCardsItem
