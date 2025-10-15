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
    servings: {
      type: Number,
      min: [1, 'Servings must be bigger then 0.'],
    },
    useBy: { type: Date, required: true },
    pickUpLoc: { type: String, required: true },
    contactPhone: { type: String },
    hold: { type: Boolean, default: false },
    live: { type: Boolean, default: true },
    karm: { type: Boolean, default: false },
    pickedUp: { type: Boolean, default: false },
    pickedUpAt: { type: Date, default: null },
    claimedUpBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `User`,
      default: null,
    },
    claimedUpAt: { type: Date, default: null },
  },
  { timestamps: true }
)
const Meal = mongoose.model(`Meal`, mealSchema)

module.exports = Meal
