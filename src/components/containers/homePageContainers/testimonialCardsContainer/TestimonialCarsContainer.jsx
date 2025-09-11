import './TestimonialCardsContainer.css'
import { useRecentDonation } from '../../../../context/RecentDonationsContext'
import TestimonialCardsListItem from './TestimonialCardsListItem'
import { ArrowRight } from '../../../../assets/icons/index'
const TestimonialCardsContainer = ({}) => {
  const { recentDonationStack } = useRecentDonation()
  if (!recentDonationStack || recentDonationStack.length === 0) {
    return (
      <div className="testimonial__container">
        <div className="testimonial__no-donation">
          There is no donation to display
        </div>
      </div>
    )
  }

  const itemsToShow =
    recentDonationStack.length > 4
      ? recentDonationStack.slice(-4)
      : recentDonationStack

  return (
    <div className="testimonial__container">
      <ul className="testimonail__container_cards">
        {itemsToShow.map((donation, idx) => (
          <TestimonialCardsListItem key={idx} donation={donation} />
        ))}
      </ul>
      <img
        className="testimonial__container_cards-skip"
        src={ArrowRight}
        alt="Next"
      />
    </div>
  )
}

export default TestimonialCardsContainer
