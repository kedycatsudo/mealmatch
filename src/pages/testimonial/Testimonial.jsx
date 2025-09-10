import './Testimonial.css'
import ContainerSeperation from '../../components/common/containerSeperation/ContainerSeperation'
import TestimonialHeader from '../../components/layout/pageHeaders/testimonialHeader/TestimonailHeader'
import TestimonialBody from '../../components/layout/pageBodies/testimonialBody/TestimonialBody'
import TestimonialPageFooter from '../../components/layout/pageFooters/testimonialPageFooter/TestimonialPageFooter'
const Testimonial = ({}) => {
  return (
    <div className="page">
      <div className="page__content">
        <header className="testimonial__header">
          <TestimonialHeader></TestimonialHeader>
        </header>
        <ContainerSeperation
          text={'KARM Donation Testimonials'}
        ></ContainerSeperation>
        <main className="testimonail__body">
          <TestimonialBody></TestimonialBody>
        </main>
        <ContainerSeperation
          text={'Participant`s Donations Status'}
        ></ContainerSeperation>
        <footer className="testimonial__footer">
          <TestimonialPageFooter></TestimonialPageFooter>
        </footer>
      </div>
    </div>
  )
}
export default Testimonial
