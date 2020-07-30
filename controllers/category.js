const Category = require('../models/category')
const { errorHandler } = require('../helpers/dbErrorHandler')

// find category by id
exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: 'Category does not exist',
      })
    }
    req.category = category

    next()
  })
}

// Create new Category
exports.create = (req, res) => {
  const category = new Category(req.body)
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      })
    }
    res.json({ data })
  })
}

// read category by id
exports.read = (req, res) => {
  return res.json(req.category)
}

// update category
exports.update = (req, res) => {
  const category = req.category
  category.name = req.body.name
  category.save((err, data) => {
    if (err) {
      res.status(400).json({
        error: errorHandler(err),
      })
    }
    res.json(data)
  })
}

// remove category
exports.remove = (req, res) => {
  const category = req.category

  category.remove((err, data) => {
    if (err) {
      res.status(400).json({
        error: errorHandler(err),
      })
    }
    res.json({
      message: 'Category deleted',
    })
  })
}

// categories list
exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      })
    }
    res.json(data)
  })
}
