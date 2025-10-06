import './EditMealCardModal.css'
import { useState, useEffect } from 'react'
import Input from '../../inputs/Inputs'
import ContainerSeperation from '../../containerSeperation/ContainerSeperation'
import Button from '../../buttons/Buttons'

const requiredFields = ['mealName', 'useBy']

const EditMealCardModalForm = ({ selectedMeal, onSave, onClose }) => {
  const [mealData, setMealData] = useState({
    mealName: '',
    useBy: '',
    karm: false,
    servings: '',
    allergens: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (selectedMeal) {
      setMealData({
        mealName: selectedMeal.mealName || '',
        useBy: selectedMeal.useBy ? selectedMeal.useBy.split('T')[0] : '', // for <input type="date">
        karm: !!selectedMeal.karm,
        servings: selectedMeal.servings?.toString() || '',
        allergens: Array.isArray(selectedMeal.allergens)
          ? selectedMeal.allergens.join(', ')
          : selectedMeal.allergens || '',
      })
      setError('')
    }
  }, [selectedMeal])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setMealData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setError('')
  }

  // Helper: Check if all required fields are filled
  const allFieldsFilled = requiredFields.every(
    (field) =>
      typeof mealData[field] === 'string' && mealData[field].trim() !== ''
  )

  const onSubmit = (e) => {
    e.preventDefault()
    if (!allFieldsFilled) {
      setError('Please fill all required fields: Meal Name, Use By.')
      return
    }
    if (onSave) {
      // Prepare allergens as array for backend
      const merged = {
        ...selectedMeal,
        ...mealData,
        servings: Number(mealData.servings),
        allergens: mealData.allergens
          ? mealData.allergens
              .split(',')
              .map((a) => a.trim())
              .filter((a) => a)
          : [],
        useBy: mealData.useBy, // let backend format date if needed
      }
      onSave(merged)
      onClose()
    }
  }

  return (
    <div className="edit__meal_modal-container">
      <Button onClick={onClose} text="X" variant="modal__close-btn" />
      <ContainerSeperation
        className="container__seperation"
        text={'Edit Meal'}
      />
      <form onSubmit={onSubmit} className="edit__meal_modal-forms">
        <Input
          variant="text"
          text="Meal Name"
          type="text"
          name="mealName"
          value={mealData.mealName}
          onChange={handleChange}
          className="edit__meal-modal-input"
        />
        <Input
          variant="text"
          text="Use By"
          type="date"
          name="useBy"
          value={mealData.useBy}
          onChange={handleChange}
          className="edit__meal-modal-input"
        />
        <Input
          text="Karm donation"
          variant="edit__meal-modal-input-karm"
          type="checkbox"
          name="karm"
          checked={mealData.karm}
          onChange={handleChange}
          className="edit__meal-modal-input-karm"
        />
        <Input
          variant="text"
          text="Servings"
          name="servings"
          type="number"
          value={mealData.servings}
          onChange={handleChange}
          className="edit__meal-modal-input"
        />
        <Input
          type="text"
          text="Allergens (comma separated)"
          variant="text"
          name="allergens"
          value={mealData.allergens}
          onChange={handleChange}
          className="edit__meal-modal-input"
        />
        {error && (
          <div
            className="edit__meal-form-error"
            style={{ color: 'red', marginBottom: '1em' }}
          >
            {error}
          </div>
        )}
        <Button
          type="submit"
          className="edit__modal_save-changes-btn"
          text="Save Changes"
          variant="login__button-container-submit"
          disabled={!allFieldsFilled}
        />
        {!allFieldsFilled && (
          <div
            className="food__form-error"
            style={{
              color: 'red',
              marginTop: '1em',
              textAlign: 'center',
              marginBottom: '1em',
            }}
          >
            Please fill all required fields: Meal Name, Use By, Pick Up
            Location.
          </div>
        )}
      </form>
    </div>
  )
}

export default EditMealCardModalForm
