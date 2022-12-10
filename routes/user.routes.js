const router = require('express').Router()
const userController = require('../controllers/user.controller')
const catchAsync = require('../utils/catchAsync')

router.get('/details/:id', catchAsync(userController.getUser))

router.put('/', catchAsync(userController.updateUser))

router.get('/uploads/user/:id', catchAsync(userController.getUploads))

module.exports = router
