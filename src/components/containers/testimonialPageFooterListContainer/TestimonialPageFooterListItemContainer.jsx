import './TestimonialPageFooterListItemContainer.css'
const TestimonialPageFooterListItemContainer = ({ participant }) => {
  return (
    <div className="testimonial__page_footer-list-item-container">
      <li className="testimonial__page_footer-list-item">
        {`${participant.printName} donated ${participant.totalDonationCount} donations till now and aid  ${participant.totalPersonHelped} people`}
      </li>
    </div>
  )
}
export default TestimonialPageFooterListItemContainer

//make sure wire the donation share button with participant`s totalDonationCount
