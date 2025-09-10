import './TestimonialPageFooter.css'
import { useParticipant } from '../../../../context/ParticipantContext'
import TestimonialPageFooterListItemContainer from '../../../containers/testimonialPageFooterListContainer/TestimonialPageFooterListItemContainer'
const TestimonialPageFooter = ({}) => {
  const { participant, participantsData } = useParticipant()

  return (
    <>
      <ul className="testimonial__page_footer-list-container">
        {participantsData
          .filter((part) => part.karm)
          .map((part) => (
            <TestimonialPageFooterListItemContainer
              key={part.id}
              participant={part}
            ></TestimonialPageFooterListItemContainer>
          ))}
      </ul>
    </>
  )
}
export default TestimonialPageFooter

//go thru on participant`s list and send the karm donors to ListItemContainer
//
