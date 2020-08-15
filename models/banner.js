const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema(
  {
    banner: {
      type: Array,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Banner', bannerSchema)
