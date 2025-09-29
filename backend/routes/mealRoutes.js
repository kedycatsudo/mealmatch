const express = require(`express`)

const router = express.Router()

const {
  createMeal,
  deleteMeal,
  getMyDonations,
  updateMyDonation,
  getExploreMeals,
  claimMeal,
  unclaimMeal,
} = require('../controllers/mealController')

const authenticate = require('../middleware/authMiddleware')

router.post('/', authenticate, createMeal)

router.delete('/profile/:mealId', authenticate, deleteMeal)

router.get(`/profile`, authenticate, getMyDonations)

router.get('/exploreFood', authenticate, getExploreMeals)

router.patch('/profile/:mealId', authenticate, updateMyDonation)

router.patch('/:mealId/claim', authenticate, claimMeal)

router.patch('/:mealId/unclaim', authenticate, unclaimMeal)

module.exports = router
