import './TestimonialCardsContainer.css'
import { ArrowRight } from '../../../../assets/icons/index'
import TestimonialCardsItem from './TestimonialCardsItem'
const TestimonialCardsContainer = ({}) => (
  <div className="testimonial__container">
    <ul className="testimonail__container_cards">
      <TestimonialCardsItem></TestimonialCardsItem>
      <TestimonialCardsItem></TestimonialCardsItem>
      <TestimonialCardsItem></TestimonialCardsItem>
      <TestimonialCardsItem></TestimonialCardsItem>
    </ul>
    <img className="testimonial__container_cards-skip" src={ArrowRight}></img>
  </div>
)

export default TestimonialCardsContainer
