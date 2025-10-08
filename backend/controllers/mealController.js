const Meal = require('../models/Meal')
const errors = require(`../utils/errors`)
const { sendDonationToKarm } = require('../utils/helpers/nodemailer')
const mongoose = require('mongoose')

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

  // handle allergens
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

  // handle useBy and postDate
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

  // Duplicate prevention
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
      })
    })
    .then((meal) => {
      if (!meal) return // Already handled conflict

      // If karm is true, send email
      if (meal.karm) {
        const emailText =
          `User ${ownerId} shared a donation for KARM:\n` +
          `Meal: ${meal.mealName}\n` +
          `Servings: ${meal.servings}\n` +
          `Pick up: ${meal.pickUpLoc}\n` +
          `Contact: ${meal.contactPhone}\n` +
          `Use by: ${meal.useBy}\n`

        return sendDonationToKarm({
          to: process.env.KARM_ADMIN_EMAIL,
          subject: 'New KARM Food Donation',
          text: emailText,
        })
          .then(() =>
            res
              .status(success.CREATED_SUCCESS_CODE)
              .json({ message: 'Meal created (KARM notified)', meal })
          )
          .catch((err) => {
            console.log(err)
            return res.status(success.CREATED_SUCCESS_CODE).json({
              message:
                'Meal created, but failed to notify KARM admin by email.',
              meal,
              error: err.message,
            })
          })
      } else {
        // No email to send
        return res
          .status(success.CREATED_SUCCESS_CODE)
          .json({ message: 'Meal created', meal })
      }
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

  // calculate status counts

  Meal.find({ ownerId: userId })
    .then((meals) => {
      if (meals.length === 0) {
        return res
          .status(success.OK_SUCCESS_CODE)
          .json({ message: 'There is no donation on your profile' })
      }
      const totalDonations = meals.length
      const availableDonations = meals.filter(
        (meal) => meal.live === true
      ).length
      return res
        .status(success.OK_SUCCESS_CODE)
        .json({ meals, totalDonations, availableDonations })
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

  Meal.findById(mealId)
    .then((meal) => {
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
            .json({ message: 'Meal deleted successfully.' })
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            return res
              .status(errors.BAD_REQUEST_ERROR_CODE)
              .json({ message: 'Invalid meal id format' })
          }
          return res
            .status(errors.INTERNAL_SERVER_ERROR_CODE)
            .json({ message: err.message })
        })
    })
    .catch((err) => {
      console.log(err)
      if (err.name === 'CastError') {
        return res
          .status(errors.BAD_REQUEST_ERROR_CODE)
          .json({ message: 'Invalid meal id format' })
      }
      return res
        .status(errors.INTERNAL_SERVER_ERROR_CODE)
        .json({ message: err.message })
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

// get Available public donations

const getExploreMeals = (req, res) => {
  Meal.find({ karm: false, live: true })
    .select('mealName useBy servings postDate allergens')
    .sort({ postDate: -1 })
    .then((meals) => {
      if (meals.length === 0) {
        return res
          .status(success.OK_SUCCESS_CODE)
          .json({ message: 'There is no donation yet.' })
      }
      return res.status(success.OK_SUCCESS_CODE).json({ meals })
    })
    .catch((err) => {
      console.log(err)
      res
        .status(errors.INTERNAL_SERVER_ERROR_CODE)
        .json({ message: 'Error occured on server' })
    })
}

// claim Meal

const claimMeal = (req, res) => {
  const userId = req.user.userId
  const mealId = req.params.mealId

  //Validate mealId format

  if (!mongoose.Types.ObjectId.isValid(mealId)) {
    return res
      .status(errors.BAD_REQUEST_ERROR_CODE)
      .json({ message: 'Invalid meal ID format' })
  }
  // 2. Check if user already has an active claim (not picked up)
  Meal.findOne({ claimedUpBy: userId, pickedUp: false })
    .then((activeClaim) => {
      if (activeClaim) {
        return res
          .status(errors.FORBIDDEN_ERROR_CODE)
          .json({ message: 'You already have an active claim' })
      }
      //Find the meal to claim

      return Meal.findById(mealId).then((meal) => {
        if (!meal) {
          return res
            .status(errors.NOT_FOUND_ERROR_CODE)
            .json({ message: 'Meal not found' })
        }
        if (meal.pickedUp) {
          return res
            .status(errors.BAD_CONFLICT_ERROR_CODE)
            .json({ message: 'Meal already picked up' })
        }
        if (meal.claimedUpBy) {
          const now = new Date()
          const sixHoursMs = 6 * 60 * 60 * 1000
          if (meal.claimedUpAt && now - meal.claimedUpAt > sixHoursMs) {
            meal.claimedUpBy = null
            meal.claimedUpAt = null
            meal.hold = false
          } else {
            return res
              .status(errors.BAD_CONFLICT_ERROR_CODE)
              .json({ message: 'Meal is currently claimed by another user' })
          }
        }
        // 4. Set claim info
        meal.claimedUpBy = userId
        meal.claimedUpAt = new Date()
        meal.hold = true

        return meal.save().then((updatedMeal) => {
          // Respond with essential info for frontend

          return res.status(success.OK_SUCCESS_CODE).json({
            message: 'Meal succesfully claimed!',
            meal: {
              _id: updatedMeal._id,
              mealName: updatedMeal.mealName,
              pickUpLocation: updatedMeal.pickUpLoc,
              claimedUpBy: updatedMeal.claimedUpBy,
              claimedUpAt: updatedMeal.claimedUpAt,
              pickedUp: updatedMeal.pickedUp,
              hold: updatedMeal.hold,
            },
          })
        })
      })
    })
    .catch((err) => {
      console.log(err)
      if (err.name === 'CastError') {
        return res
          .status(errors.BAD_REQUEST_ERROR_CODE)
          .json({ message: 'Invalid meal ID format' })
      }
      return res
        .status(errors.INTERNAL_SERVER_ERROR_CODE)
        .json({ message: 'Error occured on server' })
    })
}

//unclaim Meal

const unclaimMeal = (req, res) => {
  const userId = req.user.userId
  const mealId = req.params.mealId

  if (!mongoose.Types.ObjectId.isValid(mealId)) {
    return res
      .status(errors.BAD_REQUEST_ERROR_CODE)
      .json({ message: 'Invaild meal ID format' })
  }

  Meal.findById(mealId)
    .then((meal) => {
      if (!meal) {
        return res
          .status(errors.NOT_FOUND_ERROR_CODE)
          .json({ message: 'Meal not founded' })
      }
      if (meal.pickedUp) {
        return res
          .status(errors.BAD_CONFLICT_ERROR_CODE)
          .json({ message: 'Meal already picked up' })
      }
      if (!meal.claimedUpBy) {
        return res
          .status(errors.BAD_CONFLICT_ERROR_CODE)
          .json({ message: 'Meal is not currently claimed' })
      }
      if (meal.claimedUpBy.toString() !== userId) {
        return res
          .status(errors.FORBIDDEN_ERROR_CODE)
          .json({ message: 'You are not the claimer of this meal' })
      }

      //Unclaim the meal

      meal.claimedUpBy = null
      meal.claimedUpAt = null
      meal.hold = false

      return meal.save().then((updatedMeal) => {
        return res.status(success.OK_SUCCESS_CODE).json({
          message: 'Meal claim cancelled',
          meal: {
            _id: updatedMeal._id,
            mealName: updatedMeal.mealName,
            pickUpLoc: updatedMeal.pickUpLoc,
            claimedUpBy: updatedMeal.claimedUpBy,
            claimedUpAt: updatedMeal.claimedUpAt,
            pickUpLoc: updatedMeal.pickedUp,
            hold: updatedMeal.hold,
          },
        })
      })
    })
    .catch((err) => {
      console.log(err)
      if (err.name === 'CastError') {
        return res
          .status(errors.BAD_REQUEST_ERROR_CODE)
          .json({ message: 'Invalid meal ID format' })
      }
      return res
        .status(errors.INTERNAL_SERVER_ERROR_CODE)
        .json({ message: 'Error occured on server' })
    })
}

const completeMealPickUp = (req, res) => {
  const { mealId } = req.params
  const userId = req.user.userId

  Meal.findById(mealId)
    .then((meal) => {
      if (!meal) {
        return res
          .status(errors.NOT_FOUND_ERROR_CODE)
          .json({ message: `Meal not found.` })
      }

      //only the meal owner can complete pickup

      if (meal.ownerId.toString() !== userId) {
        return res
          .status(errors.FORBIDDEN_ERROR_CODE)
          .json({ message: 'You are not allow to update this meal.' })
      }

      meal.live = false
      meal.pickedUp = true
      meal.claimedUpAt = new Date()
      return meal.save()
    })
    .then((updatedMeal) => {
      if (updatedMeal) {
        res
          .status(success.OK_SUCCESS_CODE)
          .json({ message: 'Meal marked as picked up', meal: updatedMeal })
      }
    })
    .catch((err) => {
      console.log(err)
      res
        .statu(errors.INTERNAL_SERVER_ERROR_CODE)
        .json({ message: `Server error`, error: err.message })
    })
}

module.exports = {
  createMeal,
  deleteMeal,
  getMyDonations,
  updateMyDonation,
  getExploreMeals,
  claimMeal,
  unclaimMeal,
  completeMealPickUp,
}
