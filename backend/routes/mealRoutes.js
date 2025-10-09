const express = require(`express`)

const router = express.Router()

const rateLimit = require('express-rate-limit')
const mealLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit to 5 meal creates per window per IP
  message: {
    message: 'Too many meal creation attempts, please try again later.',
  },
})
const {
  createMeal,
  deleteMeal,
  getMyDonations,
  updateMyDonation,
  getExploreMeals,
  claimMeal,
  unclaimMeal,
  completeMealPickUp,
} = require('../controllers/mealController')

const authenticate = require('../middleware/authMiddleware')

router.post(
  '/',
  express.json(),
  express.urlencoded({ extended: true }),
  mealLimiter,
  authenticate,
  createMeal
)

router.delete('/profile/:mealId', authenticate, deleteMeal)

router.get(`/profile`, authenticate, getMyDonations)

router.patch(
  '/:mealId/completePickup',
  express.json(),
  express.urlencoded({ extended: true }),
  authenticate,
  completeMealPickUp
)

router.get('/exploreFood', authenticate, getExploreMeals)

router.patch(
  '/profile/:mealId',
  express.json(),
  express.urlencoded({ extended: true }),
  authenticate,
  updateMyDonation
)

router.patch(
  '/:mealId/claim',
  express.json(),
  express.urlencoded({ extended: true }),
  authenticate,
  claimMeal
)

router.patch(
  '/:mealId/unclaim',
  express.json(),
  express.urlencoded({ extended: true }),
  authenticate,
  unclaimMeal
)

module.exports = router
