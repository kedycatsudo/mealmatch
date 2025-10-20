import { useContext } from 'react'
import './PostFood.css'
import ContainerSeperation from '../../components/common/containerSeperation/ContainerSeperation'
import ShareFoodHeader from '../../components/layout/pageHeaders/shareFoodHeader/ShareFoodHeader'
import ShareFoodBody from '../../components/layout/pageBodies/donationForm/ShareFoodBody'
import { ParticipantContext } from '../../context/ParticipantContext'

const PostFood = () => {
  const { currentUser } = useContext(ParticipantContext)

  // If not logged in, show a message (or redirect, or render a login form)
  if (!currentUser) {
    return (
      <div className="page">
        <div className="page__content">
          <h2>Please log in to create a new donation.</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page__content">
        <ShareFoodHeader />
        <ContainerSeperation text="New Donation" />
        <ShareFoodBody currentUser={currentUser} />
      </div>
    </div>
  )
}

export default PostFood
