const Meal = require('../models/Meal')
const errors = require(`../utils/errors`)

const success = require(`../utils/succesStatuses`)
// Create a new meal/donation
const createMeal = (req, res) => {
  const {
    mealName,
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
  let allergens = req.body.allergens
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

//Get user`s profile donations

const getMyDonations = (req, res) => {
  const requestedUserId = req.query.userId
  const authUserId = req.user.userId
  const { userId } = req.user

  if (requestedUserId && requestedUserId !== authUserId) {
    return res
      .status(errors.FORBIDDEN_ERROR_CODE)
      .json({ message: 'You are not allowed to access these meals.' })
  }

  Meal.find({ ownerId: userId })
    .then((meals) => {
      if (meals.length === 0) {
        return res
          .status(success.OK_SUCCESS_CODE)
          .json({ message: 'There is no donation on your profile' })
      }
      return res.status(success.OK_SUCCESS_CODE).json({ meals })
    })
    .catch((err) => {
      console.log(err)
      res
        .status(errors.INTERNAL_SERVER_ERROR_CODE)
        .json({ message: err.message })
    })
}

// Delete a meal/donation

const deleteMeal = (req, res) => {
  const mealId = req.params.mealId
  const ownerId = req.user.userId

  Meal.findById(mealId).then((meal) => {
    if (!meal) {
      return res
        .status(errors.NOT_FOUND_ERROR_CODE)
        .json({ message: 'Meal not found' })
    }

    if (meal.ownerId.toString() !== ownerId) {
      return res
        .status(errors.FORBIDDEN_ERROR_CODE)
        .json({ message: 'You are not allowed to delete this meal.' })
    }

    return Meal.deleteOne({ _id: mealId })
      .then(() => {
        res
          .status(success.OK_SUCCESS_CODE)
          .json({ message: 'Meal deleted succesfully.' })
      })
      .catch((err) => {
        console.log(err)
        return res
          .status(errors.INTERNAL_SERVER_ERROR_CODE)
          .json({ message: err.message })
      })
  })
}

// Update a meal/donation

const updateMyDonation = (req, res) => {
  const mealId = req.params.mealId
  const userId = req.user.userId
  const isAdmin = req.user.isAdmin

  //Only allow these fields to be updated

  const allowedUpdates = ['mealName', 'useBy', 'karm', 'servings', 'allergens']
  const updates = {}
  allowedUpdates.forEach((key) => {
    if (key in req.body) updates[key] = req.body[key]
  })

  Meal.findById(mealId)
    .then((meal) => {
      if (!meal) {
        res
          .status(errors.NOT_FOUND_ERROR_CODE)
          .json({ message: 'Meal not found' })
        return
      }
      //only owner or adming can update the meal cards
      if (meal.ownerId.toString() !== userId && !isAdmin) {
        return res
          .status(errors.FORBIDDEN_ERROR_CODE)
          .json({ message: 'Not authorized to update this meal' })
      }
      //Apply updates

      Object.keys(updates).forEach((key) => {
        meal[key] = updates[key]
      })
      return meal.save()
    })
    .then((updatedMeal) => {
      if (!updatedMeal) return
      return res
        .status(success.OK_SUCCESS_CODE)
        .json({ message: 'Meal updated succesfully.' })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(errors.BAD_REQUEST_ERROR_CODE)
          .json({ message: 'Make sure you filled with proper value.' })
      }

      console.log('error name:' + err.name)
      return res
        .status(errors.INTERNAL_SERVER_ERROR_CODE)
        .json({ message: 'Server Error' })
    })
}

module.exports = {
  createMeal,
  deleteMeal,
  getMyDonations,
  updateMyDonation,
}
