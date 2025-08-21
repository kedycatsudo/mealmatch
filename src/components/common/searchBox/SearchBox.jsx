import './SearchBox.css'
import Input from '../inputs/Inputs'
import Button from '../buttons/Buttons'
const SearchBox = ({}) => {
  return (
    <>
      <div className="container__searchBox">
        <Input
          id="seachBox"
          placeholder="Search meal..."
          className="container__search-input"
        ></Input>
        <Button
          className="container__search-btn"
          text="Search"
          variant=""
        ></Button>
      </div>
      <div className="container__tags">
        <Button text="Allergy tags" variant="allergy__tags"></Button>
        <Button text="Posted Date" variant="allergy__tags"></Button>
        <Button text="Portion Size" variant="allergy__tags"></Button>
        <Button text="useBy" variant="allergy__tags"></Button>
      </div>
    </>
  )
}
export default SearchBox
