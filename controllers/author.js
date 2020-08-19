const Author = require('../models/author')
const _ = require('underscore')
const fs = require('fs')
const { errorHandler } = require('../helpers/dbErrorHandler')
const { async } = require('q')

const upload = require('../helpers/cloudinaryUpload').upload
const destroy = require('../helpers/cloundinaryRemove').destroy

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
      fs.unlinkSync(path)
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

// create author
exports.create = async (req, res, next) => {
  const { name, bio, birthPlace, photos } = req.body

  if (!name) {
    return res.status(400).json({
      error: 'Author must have name',
    })
  }

  try {
    let author = await Author.findOne({ name })

    if (author) {
      return res.status(400).json({
        error: 'Author already exists',
      })
    }

    const newAuthor = new Author({
      name: name,
      bio: bio || '',
      birthPlace: birthPlace || '',
      photos: photos || [],
    })

    const data = await newAuthor.save()

    res.json(data)
  } catch (err) {
    return res.status(500).json({
      error: 'Server Error',
    })
  }
}

// remove author
exports.remove = async (req, res) => {
  const author = req.author
  const photos = author.photos

  try {
    let removeImage = async (id) => await destroy(id)
    for (const photo of photos) {
      const { public_id } = photo
      await removeImage(public_id)
    }

    await Author.findOneAndRemove({ _id: author._id })

    res.json({ message: 'User deleted' })
  } catch (error) {
    return res.status(400).json({
      error: 'error',
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
