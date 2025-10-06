import './ExploreFood.css'
import { useEffect, useState } from 'react'
import ContainerSeperation from '../../components/common/containerSeperation/ContainerSeperation'
import ExploreFoodHeader from '../../components/layout/pageHeaders/exploreFoodHeader/ExploreFoodHeader'
import ExploreFoodBody from '../../components/layout/pageBodies/exploreFoodBody/ExploreFoodBody'

const ExploreFood = () => {
  const [liveMeals, setLiveMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/meals.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch meals data`)
        return res.json()
      })
      .then((meals) => {
        const filteredMeals = Array.isArray(meals)
          ? meals.filter((meal) => meal.live)
          : []
        setLiveMeals(filteredMeals)
      })
      .catch((err) => {
        console.log(err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  })

  return (
    <div className="page">
      <div className="page__content">
        <header className="explore__food-header">
          <ExploreFoodHeader />
        </header>
        <ContainerSeperation text="Search Meal" />
        <main className="explore__food-body">
          {loading && <p>Loading meals...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {!loading && !error && <ExploreFoodBody liveMeals={liveMeals} />}
        </main>
      </div>
    </div>
  )
}

export default ExploreFood
