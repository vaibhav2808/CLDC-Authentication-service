const router = require('express').Router()
const authRouter = require('./auth.routes')
const uploadRouter = require('./upload.routes')

router.use('/auth', authRouter)
router.use('/upload', uploadRouter)

module.exports = router
