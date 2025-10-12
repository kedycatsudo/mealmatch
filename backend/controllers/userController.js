const User = require('../models/User')
const Meal = require('../models/Meal')

const errors = require('../utils/errors/errors')

const success = require('../utils/succesStatuses')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const normalizeError = require('../utils/errors/normalizeError')

const multer = require('multer')
const path = require('path')
const {
  AppError,
  BadRequestError,
  NotFoundError,
  ConflictError,
  InternalServerError,
  UnauthorizedError,
} = require('../utils/errors/errorClasses')
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

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase()
  if (allowedExt.includes(ext)) {
    cb(null, true)
  } else {
    cb(
      new BadRequestError(
        'Only image files (.jpg, .jpeg, .png, .gif) are allowed!'
      ),
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

const updateAvatar = (req, res, next) => {
  const userId = req.user.userId
  //Multer popultates req.file, handle file errors via Multer error Middleware
  if (!req.file) {
    return next(new BadRequestError('No file uploaded.'))
  }

  const avatarPath = '/uploads/avatars/' + req.file.filename

  User.findByIdAndUpdate(userId, { avatar: avatarPath }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new NotFoundError('User not found.')
      }
      return res.status(success.OK_SUCCESS_CODE).json({
        message: 'Avatar updated succesfully.',
        avatar: updatedUser.avatar,
      })
    })
    .catch((err) => {
      return next(normalizeError(err))
    })
}

//Login

const loginUser = (req, res, next) => {
  const { userName, password } = req.body

  // Early synchronous validation -> use next(...) with a typed error

  if (!userName || !password) {
    return next(new BadRequestError('Username and password are required.'))
  }
  // Promise chain: throw typed errors so they bubble to .catch(...)

  User.findOne({ userName })
    .then((user) => {
      if (!user) {
        return next(new BadRequestError('Invalid Credentials'))
      }
      //compare the password
      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return next(new BadRequestError('Invalid Credentials'))
        }
        const token = jwt.sign(
          { userId: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        )
        // Respond with token and user info (omit password)
        const { password, ...userData } = user.toObject()
        return res.json({
          token,
          user: userData,
          message: `Welcome ${user.userName}`,
        })
      })
    })
    .catch((err) => {
      console.log(err)
      err = new InternalServerError(
        err.message || 'An unexpected error occuder in server.'
      )
      return next(err)
    })
}

//Register a new user (with Promises)

const registerUser = (req, res, next) => {
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

  //Check for required fields

  const rawPassword = req.body.password

  if (!userName || !email || !password) {
    return next(
      new BadRequestError('Username, email, and password are required.')
    )
  }
  if (
    !rawPassword ||
    rawPassword.length < 8 ||
    !/[A-Za-z]/.test(rawPassword) ||
    !/\d/.test(rawPassword)
  ) {
    return next(
      new ValidationError(
        'Password must be at least 8 characters and contain at least one letter and one number'
      )
    )
  }
  User.findOne({ $or: [{ userName }, { email }] })
    .then((userExists) => {
      if (userExists) {
        //Instead of responding throw error
        throw new BadRequestError('User already exist.')
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
      console.log(err)
      // Normalize unknown errors and forward to centralized handler

      const normalized = normalizeError(err)
      return next(normalized)
    })
}

//Update user info

const updateUserProfile = (req, res, next) => {
  const userId = req.user.userId
  const updates = req.body || {}

  //Only allow certain fieldsto be updated

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
    'avatar',
  ]

  const fieldsToUpdate = {}

  //Build fieldsToUpdate object

  allowedFields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(updates, field)) {
      fieldsToUpdate[field] = updates[field]
    }
  })

  // prevent empty update

  if (Object.keys(fieldsToUpdate).length === 0) {
    return next(new BadRequestError('No valid fields to update.'))
  }

  //helper to send standarized success response

  function sendUpdatedUser(res, updatedUser) {
    const payload = {
      printName: updatedUser.printName,
      userName: updatedUser.userName,
      phone: updatedUser.phone,
      email: updatedUser.email,
      country: updatedUser.country,
      city: updatedUser.city,
      state: updatedUser.state,
      address: updatedUser.address,
      zipcode: updatedUser.zipcode,
      avatar: updatedUser.avatar,
    }
    return res
      .status(success.OK_SUCCESS_CODE)
      .json({ message: 'Profile updated succesfully.', user: payload })
  }
  const updateOptions = {
    new: true,
    runValidators: true,
    context: 'query',
  }
  //if updating email,ensure uniqueness first
  if (fieldsToUpdate.email) {
    return User.findOne({
      email: fieldsToUpdate.email,
      _id: { $ne: userId },
    })
      .then((existing) => {
        if (existing) {
          //email already in use
          throw new ConflictError('Email alread in use')
        }
        return User.findByIdAndUpdate(userId, fieldsToUpdate, updateOptions)
      })
      .then((updatedUser) => {
        if (!updatedUser) {
          throw new NotFoundError('User not found')
        }
        return sendUpdatedUser(res, updatedUser)
      })
      .catch((err) => {
        return next(normalizeError(err))
      })
  }
  // Not updating email — perform update directly

  return User.findByIdAndUpdate(userId, fieldsToUpdate, updateOptions)
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new NotFoundError('User not found')
      }
      return sendUpdatedUser(res, updatedUser)
    })
    .catch((err) => {
      return next(normalizeError(err))
    })
}

//get user info

const getUserProfile = (req, res, next) => {
  const userId = req.user.userId

  User.findById(userId)
    .select('-password -isAdmin -__v')
    .lean()
    .then((user) => {
      if (!user) throw new NotFoundError('User not found.')
      // Send only the fields the UI needs
      const payload = {
        printName: user.printName,
        userName: user.userName,
        avatar: user.avatar,
        donationStatus: user.donationStatus,
        email: user.email, // include only if the UI needs it
        phone: user.phone, // include only if needed
        country: user.country,
        city: user.city,
        state: user.state,
        address: user.address,
        zipcode: user.zipcode,
      }
      return res.status(success.OK_SUCCESS_CODE).json({ user: payload })
    })
    .catch((err) => {
      return next(normalizeError(err))
    })
}

//password change

const changePassword = (req, res, next) => {
  const userId = req.user.userId
  const { currentPassword, newPassword } = req.body

  //validate input
  if (!currentPassword || !newPassword) {
    return next(
      new BadRequestError('Both current and new password is required to fill.')
    )
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found')
      }

      //compare current password

      return bcrypt.compare(currentPassword, user.password).then((isMatch) => {
        if (!isMatch) {
          throw new UnauthorizedError('Current password is incorrect.')
        }

        if (currentPassword === newPassword) {
          throw new BadRequestError(
            'New password must be different from current password'
          )
        }
        //Hash the new password and save

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
          .json({ message: 'Password changed succesfully.' })
      }
    })
    .catch((err) => {
      return next(normalizeError(err))
    })
}

//delete user

const deleteUser = (req, res, next) => {
  const userId = req.user.userId

  User.findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        throw new NotFoundError('User not found.')
      }
      return Meal.deleteMany({ ownerId: userId }).then(() => {
        return res
          .status(success.OK_SUCCESS_CODE)
          .json({ message: 'Your account and donations have been deleted.' })
      })
    })
    .catch((err) => {
      return next(normalizeError(err))
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
