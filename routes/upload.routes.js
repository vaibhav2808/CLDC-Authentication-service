const router = require('express').Router()
const passport = require('passport')
const fileUploadMiddleware = require('../middlewares/upload')
const uploadController = require('../controllers/upload.controller')
const catchAsync = require('../utils/catchAsync')

router.post('/', [fileUploadMiddleware.single('file'), passport.authenticate('jwt', { session: false })], catchAsync(uploadController.upload))

router.get('/:id', catchAsync(uploadController.getImageDetails))

module.exports = router
