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

router.post('/register', registerUser)

router.post('/login', loginUser)

// GET /api/users/profile - protected route

router.get('/profile', authenticate, getUserProfile)

router.patch('/profile', authenticate, updateUserProfile)

router.delete('/profile/deleteAccount', authenticate, deleteUser)

router.patch(
  '/profile/avatar',
  authenticate,
  upload.single('avatar'),
  updateAvatar
)

router.patch('/profile/changePassword', authenticate, changePassword)
module.exports = router
