const express = require('express')

const authenticate = require('../middleware/authMiddleware')

const router = express.Router()

const {
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  changePassword,
  deleteUser,
  updateAvatar,
  upload,
} = require('../controllers/userController')

// Route : POST /api/users/register
router.get('/', (req, res) => {
  res.json({ message: 'User route is working!' })
})
router.post(
  '/register',
  express.json(),
  express.urlencoded({ extended: true }),
  registerUser
)
router.post(
  '/login',
  express.json(),
  express.urlencoded({ extended: true }),
  loginUser
)

// GET /api/users/profile - protected route

router.get('/profile', authenticate, getUserProfile)

router.patch(
  '/profile',
  express.json(),
  express.urlencoded({ extended: true }),
  authenticate,
  updateUserProfile
)

router.patch(
  '/profile/changePassword',
  express.json(),
  express.urlencoded({ extended: true }),
  authenticate,
  changePassword
)

router.patch(
  '/profile/avatar',
  authenticate,
  (req, res, next) => {
    upload.single('avatar')(req, res, function (err) {
      if (err) return next(err) // Pass to centralized error handler
      next()
    })
  },
  updateAvatar
)

router.delete('/profile/deleteAccount', authenticate, deleteUser)

module.exports = router
