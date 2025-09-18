const express = require(`express`)

const router = express.Router()

const { createMeal } = require('../controllers/mealController')

const authenticate = require('../middleware/authMiddleware')

//POST /api/meals create a meal (auth require)

router.post('/', authenticate, createMeal)

module.exports = router
