const Author = require('../models/author')
const _ = require('underscore')
const fs = require('fs')
const { errorHandler } = require('../helpers/dbErrorHandler')
const { async } = require('q')

const upload = require('../helpers/cloudinary').upload

// find author by id
exports.authorById = (req, res, next, id) => {
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

//upload image
exports.uploadImage = async (req, res) => {
  // console.log(req.file)
  try {
    if (!req.file || _.isEmpty(req.file)) {
      return res.status(400).json({
        error: 'no file uploaded',
      })
    }
    const { path } = req.file
    try {
      const newPath = await upload(path)
      return res.json(newPath)
    } catch (error) {
      return res.status(400).json({
        error: 'Cloudinary Error',
      })
    }
  } catch (err) {
    return res.status(500).json({
      error: 'Server Error',
    })
  }
}

//create author
exports.create = async (req, res, next) => {
  try {
    // let author = await Author.findOne({ name })

    // if (author) {
    //   return res.status(400).json({
    //     error: 'Author already exists',
    //   })
    // }
    if (!req.files || _.isEmpty(req.files)) {
      return res.status(400).json({
        error: 'no file uploaded',
      })
    }
    const files = req.files
    console.log(files)
    try {
      let urls = []
      let multiple = async (path) => await upload(path)
      for (const file of files) {
        const { path } = file
        //   console.log('path', file)

        const newPath = await multiple(path)
        urls.push(newPath)
        fs.unlinkSync(path)
      }
      if (urls) {
        let body = req.body
        let bodyw = _.extend(body, { photos: urls })
        let new_user = new Author(bodyw)
        await new_user
          .save()
          .then((saved) => {
            return res.json(saved)
          })
          .catch((error) => {
            return res.json({
              error: errorHandler(error),
            })
          })
      }
      if (!urls) {
        return res.status(400).json({
          error: 'error',
        })
      }
    } catch (e) {
      console.log('err :', e)
      return next(e)
    }
  } catch (err) {
    return res.status(500).json({
      error: 'Server Error',
    })
  }
}

// list authors
exports.list = (req, res) => {
  Author.find().then((authors) => {
    if (!authors) {
      return res.status(400).json({
        error: 'Not found',
      })
    } else {
      return res.status(200).json(authors)
    }
  })
}

// read author by id
exports.read = (req, res) => {
  return res.json(req.author)
}
