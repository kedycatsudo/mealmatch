import './EditMealCardModal.css'
import { useState, useEffect } from 'react'
import Input from '../../inputs/Inputs'
import ContainerSeperation from '../../containerSeperation/ContainerSeperation'
import Button from '../../buttons/Buttons'
const EditMealCardModalForm = ({ selectedMeal, onSave, onClose }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setMealData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const [mealData, setMealData] = useState({
    mealName: '',
    useBy: '',
    karm: false,
    servings: '',
    allergens: '',
  })

  useEffect(() => {
    if (selectedMeal) {
      setMealData({
        mealName: selectedMeal.mealName || '',
        useBy: selectedMeal.useBy || '',
        karm: selectedMeal.karm || false,
        servings: selectedMeal.servings || '',
        allergens: selectedMeal.allergens || '',
      })
    }
  }, [selectedMeal])

  const onSubmit = (e) => {
    e.preventDefault()
    if (onSave) {
      // Merge the original selectedMeal with updated form fields
      const merged = { ...selectedMeal, ...mealData }
      onSave(merged)
      onClose()
    }
  }
  return (
    <div className="edit__meal_modal-container">
      <Button onClick={onClose} text="X" variant="modal__close-btn"></Button>
      <ContainerSeperation
        className="container__seperation"
        text={'Edit Meal'}
      ></ContainerSeperation>
      <form onSubmit={onSubmit} className="edit__meal_modal-forms">
        <Input
          variant="text"
          text="Meal Name"
          type="text"
          name="mealName"
          value={mealData.mealName}
          onChange={handleChange}
          className="edit__meal-modal-input"
        ></Input>
        <Input
          variant="text"
          text="Use By"
          type="date"
          name="useBy"
          value={mealData.useBy}
          onChange={handleChange}
          className="edit__meal-modal-input"
        ></Input>
        <Input
          text="Karm donation"
          variant="edit__meal-modal-input-karm"
          type="checkbox"
          name="karm"
          checked={mealData.karm}
          onChange={handleChange}
          className="edit__meal-modal-input-karm"
        ></Input>
        <Input
          variant="text"
          text="Servings"
          name="servings"
          type="number"
          value={mealData.servings}
          onChange={handleChange}
          className="edit__meal-modal-input"
        ></Input>
        <Input
          type="text"
          name="allergens"
          value={mealData.allergens}
          onChange={handleChange}
          className="edit__meal-modal-input"
        ></Input>
        <Button
          type="submit"
          className="edit__modal_save-changes-btn"
          text="Save Changes"
          variant="login__button-container-submit"
        ></Button>
      </form>
    </div>
  )
}
export default EditMealCardModalForm
