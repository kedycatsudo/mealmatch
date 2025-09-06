import './GoogMeal.css'
import SearchBox from '../searchBox/SearchBox'
import GoogMealList from './googMealList/GoogMealList'
const GoogMeal = ({}) => {
  return (
    <div className="googMeal__container">
      <SearchBox></SearchBox>
      <div className="googMeal__container-list-cards">
        <div className="googMeal__container-list">
          <GoogMealList></GoogMealList>
        </div>
        <div className="googMeal__container-card"></div>
      </div>
    </div>
  )
}
export default GoogMeal
