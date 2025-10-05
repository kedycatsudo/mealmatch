import './ExploreFood.css'
import mealsData from '../../../public/data/meals.json'
import ContainerSeperation from '../../components/common/containerSeperation/ContainerSeperation'
import ExploreFoodHeader from '../../components/layout/pageHeaders/exploreFoodHeader/ExploreFoodHeader'
import ExploreFoodBody from '../../components/layout/pageBodies/exploreFoodBody/ExploreFoodBody'

const ExploreFood = () => {
  // Only pass live meals
  const liveMeals = Array.isArray(mealsData)
    ? mealsData.filter((meal) => meal.live)
    : []

  return (
    <div className="page">
      <div className="page__content">
        <header className="explore__food-header">
          <ExploreFoodHeader />
        </header>
        <ContainerSeperation text="Search Meal" />
        <main className="explore__food-body">
          <ExploreFoodBody activeDonations={liveMeals} />
        </main>
      </div>
    </div>
  )
}

export default ExploreFood
