import './PostFood.css'
import ContainerSeperation from '../../components/common/containerSeperation/ContainerSeperation'
import ShareFoodHeader from '../../components/layout/pageHeaders/shareFoodHeader/ShareFoodHeader'
import ShareFoodBody from '../../components/layout/pageBodies/donationForm/ShareFoodBody'
const PostFood = ({}) => {
  return (
    <div className="page">
      <div className="page__content">
        <ShareFoodHeader></ShareFoodHeader>
        <ContainerSeperation text={'New Donation'}></ContainerSeperation>
        <ShareFoodBody></ShareFoodBody>
      </div>
    </div>
  )
}
export default PostFood
