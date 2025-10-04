import './SearchBox.css'
import Input from '../inputs/Inputs'
import Button from '../buttons/Buttons'
const SearchBox = ({
  searchTerm,
  onSearchChange,
  onSortByPostedDate,
  sortOrder,
  sortSize,
  onSortByServingSize,
  onSortByUseBy,
  sortOrderUseBy,
}) => {
  return (
    <div className="search__box-container">
      <div className="container__searchBox">
        <Input
          variant="searchbox"
          type="text"
          id="searchBox"
          placeholder="Search meal..."
          className=""
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="container__tags">
        <Button
          text={`Posted Date (${sortOrder === 'asc' ? 'Old→New' : 'New→Old'})`}
          variant="allergy__tags"
          onClick={onSortByPostedDate}
        />
        <Button
          text={`Serving Size (${sortSize === 'big' ? 'Big→Small' : 'Small→Big'})`}
          variant="allergy__tags"
          onClick={onSortByServingSize}
        ></Button>
        <Button
          text={`UseBy Date (${sortOrderUseBy === 'asc' ? 'Old→New' : 'New→Old'})`}
          variant="allergy__tags"
          onClick={onSortByUseBy}
        ></Button>
      </div>
    </div>
  )
}
export default SearchBox
