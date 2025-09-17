const express = require('express')

const router = express.Router()

const { registerUser, loginUser } = require('../controllers/userController')

// Route : POST /api/users/register

router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router
