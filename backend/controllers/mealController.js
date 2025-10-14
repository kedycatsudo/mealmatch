const Meal = require('../models/Meal')
const User = require('../models/User')
const normalizeError = require('../utils/errors/normalizeError')
const mongoose = require('mongoose')

const errors = require(`../utils/errors/errors`)
const success = require(`../utils/succesStatuses`)

//error classes
const {
  AppError,
  BadRequestError,
  NotFoundError,
  ConflictError,
  InternalServerError,
  UnauthorizedError,
  ForbiddenError,
} = require('../utils/errors/errorClasses')

//nodemailer
const {
  sendDonationToKarm,
  sendClaimNotificationToOwner,
} = require('../utils/helpers/nodemailer')

// Create a new meal/donation
const createMeal = (req, res, next) => {
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
  const ownerName = req.userDoc.printName
  let allergens = req.body.allergens

  function isBlank(str) {
    return typeof str !== 'string' || str.trim() === ''
  }
  //Validation
  if (typeof servings !== 'number' || Number.isNaN(servings)) {
    return next(new BadRequestError('Servings must be a number.'))
  }
  if (isBlank(mealName)) {
    return next(new BadRequestError('Meal name cannot be empty'))
  }
  if (isBlank(useBy)) {
    return next(new BadRequestError('Use by date cannot be empty.'))
  }
  if (isBlank(pickUpLoc)) {
    return next(new BadRequestError('Pick up location cannot be empty '))
  }
  //handle allergens

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
    return next(new BadRequestError('Invalid allergens format'))
  }

  //handle useBy and postDate
  const today = new Date()
  const postDateObj = new Date(postDate)
  const useByObj = new Date(useBy)

  if (useByObj < postDateObj) {
    return next(new BadRequestError('Use by date must be after postDate'))
  }
  if (useByObj < today.setHours(0, 0, 0, 0)) {
    return next(new BadRequestError('useBy date must be in the future'))
  }

  //Duplicate prevention
  Meal.findOne({ ownerId, mealName, postDate })
    .then((existingMeal) => {
      if (existingMeal) {
        throw new ConflictError('You already submitted this meal for this date')
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
      if (!meal) return //already handled conflict
      //If karm is true, send email to karm
      if (meal.karm) {
        const mealForEmail = {
          ownerName,
          mealName: meal.mealName,
          servings: meal.servings,
          pickUpLoc: meal.pickUpLoc,
          contactPhone: meal.contactPhone,
          useBy: meal.useBy,
        }
        return sendDonationToKarm({
          to: process.env.KARM_ADMIN_EMAIL,
          subject: 'New KARM Food Donation',
          meal: mealForEmail,
        })
          .then(() => {
            res
              .status(success.CREATED_SUCCESS_CODE)
              .json({ message: 'Meal created (KARM notified)', meal })
          })
          .catch((err) => {
            // Email error should not block meal creation; notify user
            return res.status(success.CREATED_SUCCESS_CODE).json({
              message:
                'Meal created, but failed to notify KARM admin by email.',
              meal,
              error: err.message,
            })
          })
      } else {
        //karm false no email to karm, donation shared at the public list
        return res
          .status(success.CREATED_SUCCESS_CODE)
          .json({ message: 'Meal created, and shared at public list.', meal })
      }
    })
    .catch((err) => {
      return next(normalizeError(err))
    })
}

//Get user`s profile donations

const getMyDonations = (req, res, next) => {
  const requestedUserId = req.query.userId
  const authUserId = req.user.userId

  if (requestedUserId && requestedUserId !== authUserId) {
    return next(new ForbiddenError('You are not allowed to access these meals'))
  }

  Meal.find({ ownerId: authUserId })
    .then((meals) => {
      const totalDonations = meals.length
      const availableDonations = meals.filter(
        (meal) => meal.live === true
      ).length

      return res.status(success.OK_SUCCESS_CODE).json({
        meals,
        totalDonations,
        availableDonations,
        message:
          totalDonations === 0
            ? 'There is no donation on your profile'
            : undefined,
      })
    })
    .catch((err) => {
      return next(normalizeError(err))
    })
}

// Delete a meal/donation

const deleteMeal = (req, res, next) => {
  const mealId = req.params.mealId
  const ownerId = req.user.userId

  Meal.findById(mealId)
    .then((meal) => {
      if (!meal) {
        return next(new NotFoundError('Meal not found.'))
      }

      //check ownership
      if (meal.ownerId.toString() !== ownerId) {
        return next(
          new ForbiddenError('You are not allowed to delete this meal.')
        )
      }

      return Meal.deleteOne({ _id: mealId }).then(() => {
        res
          .status(success.OK_SUCCESS_CODE)
          .json({ message: 'Meal deleted successfully.' })
      })
    })
    .catch((err) => {
      return next(normalizeError(err))
    })
}

// Update a meal/donation

const updateMyDonation = (req, res, next) => {
  const mealId = req.params.mealId
  const userId = req.user.userId
  const isAdmin = req.user.isAdmin

  //Only allow these field to be updated

  const allowedUpdates = ['mealName', 'useBy', 'karm', 'servings', 'allergens']

  const updates = {}

  allowedUpdates.forEach((key) => {
    if (key in req.body) updates[key] = req.body[key]
  })

  Meal.findById(mealId)
    .then((meal) => {
      if (!meal) {
        return next(new NotFoundError('Meal not found.'))
      }
      //Only owner or adming can update the meal card

      if (meal.ownerId.toString() !== userId && !isAdmin) {
        return next(new ForbiddenError('Not authorized to update this meal'))
      }

      Object.keys(updates).forEach((key) => {
        meal[key] = updates[key]
      })
      return meal.save()
    })
    .then((updatedMeal) => {
      if (!updatedMeal) {
        return
      }
      return res
        .status(success.OK_SUCCESS_CODE)
        .json({ message: 'Meal updated succesfully.', updatedMeal })
    })
    .catch((err) => {
      return next(normalizeError(err))
    })
}

// get Available public donations

const getExploreMeals = (req, res, next) => {
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
      return next(normalizeError(err))
    })
}

// claim Meal

const claimMeal = (req, res, next) => {
  const userId = req.user.userId
  const mealId = req.params.mealId

  //Validate mealId format
  if (!mongoose.Types.ObjectId.isValid(mealId)) {
    return next(new BadRequestError('Invalid meal ID format'))
  }
  //Check if the user has already an active claim (not picked up)
  Meal.findOne({ claimedUpBy: userId, pickedUp: false })
    .then((activeClaim) => {
      if (activeClaim) {
        return next(new ForbiddenError('You already have an active claim'))
      }

      //Find the meal to claim

      return Meal.findById(mealId).then((meal) => {
        if (!meal) {
          return next(new NotFoundError('Meal not found'))
        }
        if (meal.pickedUp) {
          return next(new ConflictError('Meal already picked up'))
        }
        if (meal.claimedUpBy) {
          const now = new Date()
          const sixHoursMs = 6 * 60 * 60 * 1000
          if (meal.claimedUpAt && now - meal.claimedUpAt > sixHoursMs) {
            meal.claimedUpBy = null
            meal.claimedUpAt = null
            meal.hold = false
          } else {
            return next(
              new ConflictError('Meal is currently claimed by another user')
            )
          }
        }

        // set claim info
        meal.claimedUpBy = userId
        meal.claimedUpAt = new Date()
        meal.hold = true
        return meal.save().then((updatedMeal) => {
          // --- BEGIN EMAIL NOTIFICATION ---

          User.findById(updatedMeal.ownerId)
            .then((ownerUser) => {
              if (!ownerUser || !ownerUser.email) {
                return //owner doesn`t exist or hsa no email; skip email
              }

              // Get claimant's name (from req.userDoc or req.user)

              const claimerName =
                (req.userDoc &&
                  (req.userDoc.printName ||
                    req.userDoc.name ||
                    req.userDoc.username)) ||
                req.user.printName ||
                req.user.name ||
                req.user.username ||
                'MealMatch User'

              const mealForEmail = {
                mealName: updatedMeal.mealName,
                postDate: updatedMeal.postDate.toLocaleString(),
                claimedUpAt: updatedMeal.claimedUpAt,
                claimerName,
              }

              return sendClaimNotificationToOwner({
                to: ownerUser.email,
                subject: 'Your meal has been claimed!',
                meal: mealForEmail,
              }).catch((err) => {
                console.log('Failed to send claim notification emal', err)
              })
            })
            .finally(() => {
              //Respond to the frontend as before
              return res.status(success.OK_SUCCESS_CODE).json({
                message: 'Meal successfully claimed!',
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
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid meal ID format'))
      }
      return next(normalizeError(err))
    })
}

//unclaim Meal

const unclaimMeal = (req, res, next) => {
  const userId = req.user.userId
  const mealId = req.params.mealId

  if (!mongoose.Types.ObjectId.isValid(mealId)) {
    return res
      .status(errors.BAD_REQUEST_ERROR_CODE)
      .json({ message: 'Invalid meal ID format' })
  }

  Meal.findById(mealId)
    .then((meal) => {
      if (!meal) {
        return next(new NotFoundError('Meal not found'))
      }
      if (meal.pickedUp) {
        return next(new ConflictError('Meal already picked up'))
      }
      if (!meal.claimedUpBy) {
        return next(new ConflictError('Meal is not currently claimed'))
      }
      if (meal.claimedUpBy.toString() !== userId) {
        return next(new ForbiddenError('You are not the claimer of this meal'))
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
            pickedUp: updatedMeal.pickedUp,
            hold: updatedMeal.hold,
          },
        })
      })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid meal ID format'))
      }
      return next(normalizeError(err))
    })
}

const completeMealPickUp = (req, res, next) => {
  const mealId = req.params.mealId
  const userId = req.user.userId

  Meal.findById(mealId)
    .then((meal) => {
      if (!meal) {
        return next(new NotFoundError('Meal not found.'))
      }

      // only the meal owner can complete pickup
      if (meal.ownerId.toString() !== userId) {
        return next(
          new ForbiddenError('You are not allowed to update this meal.')
        )
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
      return next(normalizeError(err))
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
