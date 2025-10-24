import './ExploreFood.css'
import { useEffect, useState, useContext } from 'react'
import ContainerSeperation from '../../components/common/containerSeperation/ContainerSeperation'
import ExploreFoodHeader from '../../components/layout/pageHeaders/exploreFoodHeader/ExploreFoodHeader'
import ExploreFoodBody from '../../components/layout/pageBodies/exploreFoodBody/ExploreFoodBody'
import { getDonationsExplorePageApi } from '../../api'
import { ParticipantContext } from '../../context/ParticipantContext'
const ExploreFood = () => {
  const [liveMeals, setLiveMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { currentUser } = useContext(ParticipantContext)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getDonationsExplorePageApi()
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch meals data.')
        return res.json()
      })
      .then((data) => {
        setLiveMeals(Array.isArray(data.meals) ? data.meals : [])
      })
      .catch((err) => {
        console.error(err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [])

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
          {!loading && !error && (
            <ExploreFoodBody currentUser={currentUser} liveMeals={liveMeals} />
          )}
        </main>
      </div>
    </div>
  )
}

export default ExploreFood
