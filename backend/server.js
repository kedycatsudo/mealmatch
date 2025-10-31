//Import required modules

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware')

//Load environment variables from . env file
dotenv.config()

//Create express app
const app = express()

//Middleware
// Enable CORS
app.use(
  cors({
    origin: 'https://mealmatch.online', // or ['https://mealmatch.online']
    credentials: true, // if you use cookies/sessions
  })
)

//MongoDb connection

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mealmatch'
app.get('/favicon.ico', (req, res) => res.status(204).end())
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

app.use('/mealmatch/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/users/login', loginLimiter)
app.use('/api/users', userRoutes)
app.use('/api/meals', mealRoutes)

// Catch malformed JSON errors from express.json()
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Malformed JSON in request body.' })
  }
  next(err)
})

app.use(errorHandlerMiddleware)
//Start server

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
