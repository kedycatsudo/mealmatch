import './Testimonial.css'
import ContainerSeperation from '../../components/common/containerSeperation/ContainerSeperation'
import TestimonialHeader from '../../components/layout/pageHeaders/testimonialHeader/TestimonailHeader'
import TestimonialBody from '../../components/layout/pageBodies/testimonialBody/TestimonialBody'
const Testimonial = ({}) => {
  return (
    <div className="page">
      <div className="page__content">
        <header className="testimonial__header">
          <TestimonialHeader></TestimonialHeader>
        </header>
        <ContainerSeperation
          text={'Donation Meal Testimonials'}
        ></ContainerSeperation>
        <main className="testimonail__body">
          <TestimonialBody></TestimonialBody>
        </main>
      </div>
    </div>
  )
}
export default Testimonial
