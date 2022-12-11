const router = require('express').Router()
const userController = require('../controllers/user.controller')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')

router.put('/', catchAsync(userController.updateUser))

router.get('/details', passport.authenticate('jwt', { session: false }), catchAsync(userController.getUserByUserId))

router.get('/details/:id', catchAsync(userController.getUserByUserId))

router.get('/uploads', passport.authenticate('jwt', { session: false }), catchAsync(userController.getUploads))

router.get('/uploads/user/:id', catchAsync(userController.getUploadsByUserId))

module.exports = router
