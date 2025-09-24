const express = require(`express`)

const router = express.Router()

const {
  createMeal,
  deleteMeal,
  getMyDonations,
} = require('../controllers/mealController')

const authenticate = require('../middleware/authMiddleware')

//POST /api/meals create a meal (auth require)

router.post('/', authenticate, createMeal)

router.delete('/:id', authenticate, deleteMeal)

router.get(`/profile`, authenticate, getMyDonations)

module.exports = router
