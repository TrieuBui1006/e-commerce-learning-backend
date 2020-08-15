const Author = require('../models/author')
const { errorHandler } = require('../helpers/dbErrorHandler')

// find author by id
exports.authorId = (req, res, next, id) => {
  Author.findById(id).exec((err, author) => {
    if (err || !author) {
      return res.status(400).json({
        error: 'Author does not exist',
      })
    }
    req.author = author

    next()
  })
}

//create author
exports.create = () => {}
