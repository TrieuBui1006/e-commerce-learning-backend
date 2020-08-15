const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
    unique: true,
  },
  birthPlace: {
    type: String,
  },
  bio: {
    type: String,
  },
  photos: {
    type: Array,
  },
})

module.exports = mongoose.model('Author', authorSchema)
