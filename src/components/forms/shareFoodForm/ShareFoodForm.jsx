import './ShareFoodForm.css'
import Input from '../../common/inputs/Inputs'
import Button from '../../common/buttons/Buttons'
const ShareFoodForm = ({}) => {
  return (
    <form className="food__form">
      <div className="food__form-inputs-container">
        <div className="food__form-inputs">
          <Input
            required={true}
            text="Meal Name *"
            type="text"
            variant="text"
          ></Input>
          <Input
            required={true}
            text="Use By *"
            type="date"
            variant="text"
          ></Input>
          <Input
            required={true}
            text="Pick Up Location *"
            type="text"
            variant="text"
          ></Input>
        </div>
        <div className="food__form-inputs">
          <Input text="Allergens" type="text" variant="text"></Input>
          <Input text="Contact Person Phone" type="text" variant="text"></Input>
          <Input text="Serving Size" type="number" variant="text"></Input>
        </div>
      </div>
      <div className="karm__toggle-container">
        <p className="karm__togle-p">Offer this donation to KARM</p>
        <Input checked={false} type="checkbox"></Input>
      </div>
      <div className="food__form-footer">
        <Button type="button" text="Upload Avatar"></Button>
        <img className="avatar__display" alt="Avatar"></img>
      </div>
      <Button text="Donate" type="button"></Button>
    </form>
  )
}
export default ShareFoodForm
