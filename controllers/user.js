const { requireSignin } = require('./auth')

const User = require('../models/user')
const router = require('../routes/auth')

// Find user by id
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: 'User not found',
      })
    }

    req.profile = user
    next()
  })
}

// read user by Id
exports.read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

// update user
exports.update = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: 'you are not authorized to perform this action',
        })
      }
      user.profile.hashed_password = undefined
      user.profile.salt = undefined
      res.json(user)
    }
  )
}
