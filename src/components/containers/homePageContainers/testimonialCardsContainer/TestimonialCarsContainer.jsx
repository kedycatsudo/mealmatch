import './TestimonialCardsContainer.css'
import { ArrowRight } from '../../../../assets/icons/index'
import TestimonialCardsListItem from './TestimonialCardsListItem'
//import testimonialCards from './testimonialCards' use after create donationCounter context
import { testimonialCards } from '../../../../utils/constants/homePageConstants/testimonialCardConstants'
const lastFourTestimonials = testimonialCards.slice(-4)

const TestimonialCardsContainer = ({}) => (
  <div className="testimonial__container">
    <ul className="testimonail__container_cards">
      {lastFourTestimonials.map((testimonial) => (
        <TestimonialCardsListItem
          participantName={testimonial.participantName}
          recentDonation={testimonial.recentDonation}
          key={testimonial.id}
        ></TestimonialCardsListItem>
      ))}
    </ul>
    <img className="testimonial__container_cards-skip" src={ArrowRight}></img>
  </div>
)

export default TestimonialCardsContainer
