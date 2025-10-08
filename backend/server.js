//Import required modules

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

//Load environment variables from . env file
dotenv.config()

//Create express app
const app = express()

//Middleware
app.use(cors()) // Enable CORS

//MongoDb connection

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mealmatch'

mongoose
  .connect(mongoURI)
  .then(() => console.log(`MongoDB Connected`))
  .catch((err) => console.log(`MongoDB Connection error:`, err))

//Basic route to test server
app.get('/', (req, res) => {
  res.send('MealMatch Backend is running')
})
const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Too many login attempts, please try again later' },
})
const userRoutes = require('./routes/userRoutes')

const mealRoutes = require('./routes/mealRoutes')

app.use('/uploads', express.static('backend/uploads'))

app.use('/api/users/login', loginLimiter)
app.use('/api/users', userRoutes)
app.use('/api/meals', mealRoutes)

//Start server

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
