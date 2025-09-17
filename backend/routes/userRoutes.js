const express = require('express')

const authenticate = require('../middleware/authMiddleware')

const router = express.Router()

const { registerUser, loginUser } = require('../controllers/userController')

// Route : POST /api/users/register

router.post('/register', registerUser)
router.post('/login', loginUser)

// GET /api/users/profile - protected route

router.get('/profile', authenticate, (req, res) => {
  // req.user was set by the middleware

  res.json({ message: 'Profile data', user: req.user })
})

module.exports = router
