import './TestimonialListItem.css'
import donationsData from '../../../../../constants/donationsData'
const TestimonialListItem = ({ participant }) => {
  return (
    <div className="testimonial__list-item-container">
      <span className="span__top">“</span>
      <li className="testimonial__list-item">
        {`${participant.printName} donated to the Karm ${donationsData[0].servings} servings ${donationsData[0].mealName}`}
      </li>
      <span className="span__bottom">“</span>
    </div>
  )
}
export default TestimonialListItem

//reusable item component that i can use for home page too.
// recent donations stack sounds good idea::
//only karm donations
//function in share donations.button:: get the donation check if is karm
//if is Karm keep it to the context and then use it in the testimonials and home page
