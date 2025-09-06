import './ExploreFoodBody.css'
import GoogMeal from '../../../common/googMeal/GoogMeal'
import SearchBox from '../../../common/searchBox/SearchBox'
const ExploreFoodBody = ({}) => {
  return (
    <div className="body__content">
      <GoogMeal></GoogMeal>
      {/* add map api here as a second elemend of the body */}
    </div>
  )
}
export default ExploreFoodBody
