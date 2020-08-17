const express = require('express')
const router = express.Router()
const multer = require('multer')

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')
const { userById } = require('../controllers/user')
const {
  create,
  list,
  read,
  authorById,
  uploadImage,
} = require('../controllers/author')

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // console.log('file', file)
    callback(null, './Uploads/')
  },
  filename: function (req, file, callback) {
    // console.log("multer file:", file);
    callback(null, file.originalname)
  },
})
let maxSize = 1000000 * 1000
let upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
})

router.get('/author/:authorId', read)
router.post(
  '/author/upload/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  upload.array('photos', 6),
  uploadImage
)
// router.put(
//   '/category/:categoryId/:userId',
//   requireSignin,
//   isAuth,
//   isAdmin,
//   update
// )

// router.delete(
//   '/category/:categoryId/:userId',
//   requireSignin,
//   isAuth,
//   isAdmin,
//   remove
// )
router.get('/authors', list)

router.param('authorId', authorById)
router.param('userId', userById)

module.exports = router
