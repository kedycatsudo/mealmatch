const express = require('express')

const authenticate = require('../middleware/authMiddleware')

const router = express.Router()

const {
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
} = require('../controllers/userController')

// Route : POST /api/users/register

router.post('/register', registerUser)
router.post('/login', loginUser)

// GET /api/users/profile - protected route

router.get('/profile', authenticate, getUserProfile)

router.patch('/profile', authenticate, updateUserProfile)

module.exports = router
