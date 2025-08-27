import './SearchBox.css'
import Input from '../inputs/Inputs'
import Button from '../buttons/Buttons'
const SearchBox = ({ onSearchChange, onSortByPostedDate, sortOrder }) => {
  return (
    <div className="search__box-container">
      <div className="container__searchBox">
        <Input
          type="text"
          id="seachBox"
          placeholder="Search meal..."
          className="container__search-input"
          onChange={(e) => {
            onSearchChange(e.target.value)
          }}
        ></Input>
      </div>
      <div className="container__tags">
        <Button
          text={`Posted Date (${sortOrder === 'asc' ? 'Old→New' : 'New→Old'})`}
          variant="allergy__tags"
          onClick={onSortByPostedDate}
        />
        <Button text="Servings" variant="allergy__tags"></Button>
        <Button text="useBy" variant="allergy__tags"></Button>
      </div>
    </div>
  )
}
export default SearchBox
