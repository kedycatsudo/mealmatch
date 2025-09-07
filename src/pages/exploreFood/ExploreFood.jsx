import './ExploreFood.css'
import activeDonations from '../../constants/exploreDonationsData'
import ContainerSeperation from '../../components/common/containerSeperation/ContainerSeperation'
import ExploreFoodHeader from '../../components/layout/pageHeaders/exploreFoodHeader/ExploreFoodHeader'
import ExploreFoodBody from '../../components/layout/pageBodies/exploreFoodBody/ExploreFoodBody'
const ExploreFood = ({}) => {
  return (
    <div className="page">
      <div className="page__content">
        <header className="explore__food-header">
          <ExploreFoodHeader></ExploreFoodHeader>
        </header>
        <ContainerSeperation text={'Search Meal'}></ContainerSeperation>
        <main className="explore__food-body">
          <ExploreFoodBody activeDonations={activeDonations}></ExploreFoodBody>
        </main>
      </div>
    </div>
  )
}
export default ExploreFood
