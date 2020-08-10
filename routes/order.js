const express = require('express')
const router = express.Router()

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')
const { userById, addOrderToUserHistory } = require('../controllers/user')
const { create } = require('../controllers/order')
const { descreaseQuanity } = require('../controllers/product')

router.post(
  '/order/create/:userId',
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  descreaseQuanity,
  create
)

router.param('userId', userById)

module.exports = router
