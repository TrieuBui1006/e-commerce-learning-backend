const mongoose = require('mongoose')

const saleCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('SaleCode', saleCodeSchema)
