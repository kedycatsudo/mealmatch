const Meal = require('../models/Meal')
const errors = require(`../utils/errors`)

const success = require(`../utils/succesStatuses`)
// Create a new meal/donation
const createMeal = (req, res) => {
  const {
    mealName,
    allergens,
    postDate,
    servings,
    useBy,
    pickUpLoc,
    contactPhone,
    hold,
    live,
    karm,
  } = req.body

  const ownerId = req.user.userId

  //handle empty strgin for required fields

  function isBlank(str) {
    return typeof str !== 'string' || str.trim() === ''
  }

  if (isBlank(mealName)) {
    return res
      .status(errors.BAD_REQUEST_ERROR_CODE)
      .json({ message: 'Meal name cannot be empty.' })
  }
  if (isBlank(pickUpLoc)) {
    return res
      .status(errors.BAD_REQUEST_ERROR_CODE)
      .json({ message: 'Pick up location cannot be empty.' })
  }
  if (isBlank(contactPhone)) {
    return res
      .status(errors.BAD_REQUEST_ERROR_CODE)
      .json({ message: 'Contact phone cannot be empty.' })
  }

  //handle if the allergens not array

  if (typeof allergens === 'string') {
    allergens = allergens
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean)
  } else if (Array.isArray(allergens)) {
    allergens = allergens.map((a) => String(a).trim()).filter(Boolean)
  } else if (!allergens) {
    allergens = []
  } else {
    return res
      .status(errors.BAD_REQUEST_ERROR_CODE)
      .json({ message: 'Invalid allergens format.' })
  }

  //handle the useBy and postDate

  const today = new Date()
  const postDateObj = new Date(postDate)
  const useByObj = new Date(useBy)

  if (useByObj < postDateObj) {
    return res
      .status(errors.BAD_REQUEST_ERROR_CODE)
      .json({ message: 'Use By date must be after postDate' })
  }
  if (useByObj < today.setHours(0, 0, 0, 0)) {
    return res
      .status(errors.BAD_REQUEST_ERROR_CODE)
      .json({ message: 'useBy date must be in the future.' })
  }

  // Duplicate prevention: check if meal already exists for this user and date
  Meal.findOne({ ownerId, mealName, postDate })
    .then((existingMeal) => {
      if (existingMeal) {
        return res
          .status(errors.BAD_CONFLICT_ERROR_CODE)
          .json({ message: 'You already submitted this meal for this date.' })
      }

      return Meal.create({
        ownerId,
        mealName,
        allergens,
        postDate,
        servings,
        useBy,
        pickUpLoc,
        contactPhone,
        hold,
        live,
        karm,
      }).then((meal) =>
        res
          .status(success.CREATED_SUCCESS_CODE)
          .json({ message: 'Meal created', meal })
      )
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res
          .status(errors.BAD_REQUEST_ERROR_CODE)
          .json({ message: error.message })
      } else {
        res
          .status(errors.INTERNAL_SERVER_ERROR_CODE)
          .json({ message: error.message })
      }
    })
}

module.exports = {
  createMeal,
}
