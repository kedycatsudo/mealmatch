const express = require(`express`)

const router = express.Router()

const {
  createMeal,
  deleteMeal,
  getMyDonations,
  updateMyDonation,
} = require('../controllers/mealController')

const authenticate = require('../middleware/authMiddleware')

//POST /api/meals create a meal (auth require)

router.post('/', authenticate, createMeal)

router.delete('/profile/:mealId', authenticate, deleteMeal)

router.get(`/profile`, authenticate, getMyDonations)

router.patch('/profile/:mealId', authenticate, updateMyDonation)

module.exports = router
