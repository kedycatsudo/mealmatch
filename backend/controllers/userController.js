const User = require('../models/User')
const Meal = require('../models/Meal')

const errors = require('../utils/errors')

const success = require('../utils/succesStatuses')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const multer = require('multer')
const path = require('path')
const allowedExt = ['.jpg', '.jpeg', '.png', '.gif']

//set up multer storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/avatars'))
  },
  filename: function (req, file, cb) {
    //unique filename:userId+timestamp+ext
    const ext = path.extname(file.originalname)
    cb(null, req.user.userId + '-' + Date.now() + ext)
  },
})

const fileFilter = (req, res, cb) => {
  const ext = path.extname(file.originalname).toLowerCase()
  if (allowedExt.includes(ext)) {
    cb(null, true)
  } else {
    cb(
      new Error('Only image files (.jpg, .jpeg, .png, .gif) are allowed!'),
      false
    )
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB size limit
  fileFilter,
})
//path /profile/avatar

const updateAvatar = (req, res) => {
  const userId = req.user.userId
  console.log('req.file:', req.file)
  //file will be on req.file
  if (!req.file) {
    return res
      .status(errors.BAD_REQUEST_ERROR_CODE)
      .json({ message: 'No file uploaded' })
  }

  const avatarPath = '/uploads/avatars' + req.file.filename

  User.findByIdAndUpdate(userId, { avatar: avatarPath }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res
          .status(errors.NOT_FOUND_ERROR_CODE)
          .json({ message: 'User not found.' })
      }
      return res.status(success.OK_SUCCESS_CODE).json({
        message: 'Avatar updated succesfully.',
        avatar: updatedUser.avatar,
      })
    })
    .catch((err) => {
      console.log(err)
      return res
        .status(errors.INTERNAL_SERVER_ERROR_CODE)
        .json({ message: 'Server Error.', error: err.message })
    })
}

//Login

const loginUser = (req, res) => {
  console.log(req.body)

  const { userName, password } = req.body

  //check the username first
  User.findOne({ userName })
    .then((user) => {
      if (!user) {
        return res
          .status(errors.BAD_REQUEST_ERROR_CODE)
          .json({ message: 'Invalid Credentials' })
      }
      //compare the password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res
            .status(errors.BAD_REQUEST_ERROR_CODE)
            .json({ message: 'Invalid credentials' })
        }
        const token = jwt.sign(
          { userId: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        )
        // Respond with token and user info (omit password)
        const { password, ...userData } = user.toObject()
        res.json({ token, message: 'Welcome ' + user.userName })
      })
    })
    .catch((err) => {
      console.log(err)
      return res
        .status(errors.INTERNAL_SERVER_ERROR_CODE)
        .json({ message: err.message })
    })
}

//Register a new user (with Promises)

const registerUser = (req, res) => {
  const {
    avatar,
    printName,
    userName,
    email,
    isKarmDonor,
    phone,
    country,
    city,
    state,
    address,
    zipcode,
    password,
    isAdmin,
  } = req.body

  User.findOne({ userName })
    .then((userExists) => {
      if (userExists) {
        // Stop the chain by returning here
        res
          .status(errors.BAD_REQUEST_ERROR_CODE)
          .json({ message: 'User already exist' })
        return
      }
      return bcrypt.hash(password, 10)
    })
    .then((hashedPassword) => {
      if (!hashedPassword) return

      return User.create({
        avatar,
        printName,
        userName,
        email,
        isKarmDonor,
        phone,
        country,
        city,
        state,
        address,
        zipcode,
        password: hashedPassword,
        isAdmin,
      })
    })
    .then((user) => {
      if (!user) return

      return res
        .status(success.CREATED_SUCCESS_CODE)
        .json({ message: 'User registered succesfully.', user })
    })
    .catch((err) => {
      if (err.code === 11000) {
        // Detect which field is duplicated:
        const duplicateField = Object.keys(err.keyPattern)[0]
        let message = 'Duplicate value.'
        if (duplicateField === 'email') {
          message = 'Email already used.'
        } else if (duplicateField === 'userName') {
          message = 'Username already used.'
        }
        return res.status(errors.BAD_REQUEST_ERROR_CODE).json({ message })
      }
      // handle other errors
      return res
        .status(errors.INTERNAL_SERVER_ERROR_CODE)
        .json({ message: err.message || 'Error occurred on the Server' })
    })
}

//Update user info

const updateUserProfile = (req, res) => {
  const userId = req.user.userId
  const updates = req.body

  // Only allow certain fields to be updated
  const allowedFields = [
    'printName',
    'userName',
    'phone',
    'email',
    'country',
    'city',
    'state',
    'address',
    'zipcode',
    'avatar', // or 'avatarPic' if your model uses that
  ]

  const fieldsToUpdate = {}

  // Build fieldsToUpdate object
  allowedFields.forEach((field) => {
    if (updates[field] !== undefined) {
      fieldsToUpdate[field] = updates[field]
    }
  })

  // Prevent empty update
  if (Object.keys(fieldsToUpdate).length === 0) {
    return res
      .status(errors.BAD_REQUEST_ERROR_CODE)
      .json({ message: 'No valid fields to update.' })
  }

  // Check for unique email
  if (fieldsToUpdate.email) {
    return User.findOne({ email: fieldsToUpdate.email, _id: { $ne: userId } })
      .then((existing) => {
        if (existing) {
          return res
            .status(errors.BAD_CONFLICT_ERROR_CODE)
            .json({ message: 'Email already in use' })
        }
        // Update user
        return User.findByIdAndUpdate(userId, fieldsToUpdate, {
          new: true,
        }).then((updatedUser) => {
          return res.status(success.OK_SUCCESS_CODE).json({
            message: 'Profile updated successfully.',
            user: {
              printName: updatedUser.printName,
              userName: updatedUser.userName,
              phone: updatedUser.phone,
              email: updatedUser.email,
              country: updatedUser.country,
              city: updatedUser.city,
              state: updatedUser.state,
              address: updatedUser.address,
              zipcode: updatedUser.zipcode,
              avatar: updatedUser.avatar, // or avatarPic if that's the field
            },
          })
        })
      })
      .catch((err) => {
        console.log(err)
        return res
          .status(errors.INTERNAL_SERVER_ERROR_CODE)
          .json({ message: 'Error occured on server' })
      })
  }

  // If not updating email, just update
  return User.findByIdAndUpdate(userId, fieldsToUpdate, { new: true })
    .then((updatedUser) => {
      return res.status(success.OK_SUCCESS_CODE).json({
        message: 'Profile updated successfully.',
        user: {
          printName: updatedUser.printName,
          userName: updatedUser.userName,
          phone: updatedUser.phone,
          email: updatedUser.email,
          country: updatedUser.country,
          city: updatedUser.city,
          state: updatedUser.state,
          address: updatedUser.address,
          zipcode: updatedUser.zipcode,
          avatar: updatedUser.avatar, // or avatarPic if that's the field
        },
      })
    })
    .catch((err) => {
      console.error(err)
      return res
        .status(errors.INTERNAL_SERVER_ERROR_CODE)
        .json({ message: 'Error occurred on server.' })
    })
}

//get user info

const getUserProfile = (req, res) => {
  const userId = req.user.userId

  User.findById(userId)
    .select(`-password -isAdmin`)
    .then((user) => {
      if (!user) {
        return res
          .status(errors.NOT_FOUND_ERROR_CODE)
          .json({ message: 'User not found' })
      }

      //send only necessary fields

      res.status(success.OK_SUCCESS_CODE).json({
        user: {
          printName: user.printName,
          avatar: user.avatar,
          donationStatus: user.donationStatus, // Access donationStatus directly if it's a field in your User schema
        },
      })
    })
    .catch((err) => {
      console.log(err)
      return res
        .status(errors.INTERNAL_SERVER_ERROR_CODE)
        .json({ message: 'Error occured on server' })
    })
}

//password change

const changePassword = (req, res) => {
  const userId = req.user.userId
  const { currentPassword, newPassword } = req.body

  //Validate Input
  if (!currentPassword || !newPassword) {
    return res
      .status(errors.BAD_REQUEST_ERROR_CODE)
      .json({ message: 'Both current and new password is required' })
  }
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(errors.BAD_REQUEST_ERROR_CODE)
          .json({ message: `user not found` })
      }
      //compate current password

      return bcrypt.compare(currentPassword, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(errors.UNAUTHORIZED__ERROR_CODE).json({
            message: 'Current password can not be same with new password',
          })
        }
        //hash the new  password
        return bcrypt.hash(newPassword, 10).then((hashedPassword) => {
          user.password = hashedPassword
          return user.save()
        })
      })
    })
    .then((updatedUser) => {
      if (updatedUser) {
        return res
          .status(success.OK_SUCCESS_CODE)
          .json({ message: 'Password changed successfully' })
      }
    })
    .catch((err) => {
      console.log(err)
      return res
        .status(errors.INTERNAL_SERVER_ERROR_CODE)
        .json({ message: 'Server Error' })
    })
}

//delete user

const deleteUser = (req, res) => {
  const userId = req.user.userId // Authenticated user

  User.findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res
          .status(errors.NOT_FOUND_ERROR_CODE)
          .json({ message: 'User not found.' })
      }

      // Optional: Delete all meals donated by this user
      return Meal.deleteMany({ ownerId: userId }).then(() => {
        return res
          .status(success.OK_SUCCESS_CODE)
          .json({ message: 'Your account and donations have been deleted.' })
      })
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server error', error: err.message })
    })
}

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  changePassword,
  deleteUser,
  updateAvatar,
  upload,
}
