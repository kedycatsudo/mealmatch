const mongoose = require(`mongoose`)

const mealSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mealName: { type: String, required: true },
    allergens: [{ type: String }],
    postDate: { type: Date, required: true, default: Date.now },
    servings: { type: Number, min: [0, 'Servings must be a positive number.'] },
    useBy: { type: Date, required: true },
    pickUpLoc: { type: String, required: true },
    contactPhone: { type: String },
    hold: { type: Boolean, default: false },
    live: { type: Boolean, default: true },
    karm: { type: Boolean, default: false },
    pickedUp: { type: Boolean, default: false },
  },
  { timestamps: true }
)
const Meal = mongoose.model(`Meal`, mealSchema)

module.exports = Meal
