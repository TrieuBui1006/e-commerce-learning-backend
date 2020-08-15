const express = require('express')
const router = express.Router()

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')
const { userById } = require('../controllers/user')
const { create } = require('../controllers/author')

// router.get('/category/:categoryId', read)
router.post('/author/create/:userId', requireSignin, isAuth, isAdmin, create)
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
// router.get('/authors', list)

// router.param('authorId', categoryById)
router.param('userId', userById)

module.exports = router
