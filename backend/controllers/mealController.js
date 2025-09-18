const Meal = require(`../models/Meal`)

const errors = require(`../utils/errors`)

const success = require(`../utils/succesStatuses`)

//Create meal

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

  Meal.create({
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
  })
    .then((meal) => {
      return res
        .status(success.CREATED_SUCCESS_CODE)
        .json({ message: 'Meal created succesfully', meal })
    })
    .catch((err) => {
      console.log(err.name)
      if (err.name === 'ValidationError') {
        // err.errors contains details for each invalid field
        const firstError = Object.values(err.errors)[0]
        return res
          .status(errors.BAD_REQUEST_ERROR_CODE)
          .json({ message: `${firstError.path} field must be filled.` })
      }
      return res
        .status(errors.INTERNAL_SERVER_ERROR_CODE)
        .json({ message: err.message })
    })
}

module.exports = { createMeal }
