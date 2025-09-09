import './TestimonialBody.css'
import { useParticipant } from '../../../../context/ParticipantContext'
import TestimonialListItem from './testimonialListItem/TestimonialListItem'
const TestimonialBody = ({}) => {
  const { participant } = useParticipant()

  return (
    <div>
      <ul className="testimonials__list-container">
        <TestimonialListItem participant={participant}></TestimonialListItem>
        <TestimonialListItem participant={participant}></TestimonialListItem>
        <TestimonialListItem participant={participant}></TestimonialListItem>
        <TestimonialListItem participant={participant}></TestimonialListItem>
        <TestimonialListItem participant={participant}></TestimonialListItem>
        <TestimonialListItem participant={participant}></TestimonialListItem>
        <TestimonialListItem participant={participant}></TestimonialListItem>
        <TestimonialListItem participant={participant}></TestimonialListItem>
      </ul>
    </div>
  )
}
export default TestimonialBody
