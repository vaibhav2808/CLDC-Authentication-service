const router = require('express').Router()
const authRouter = require('./auth.routes')
const uploadRouter = require('./upload.routes')
const userRouter = require('./user.routes')

router.use('/auth', authRouter)
router.use('/upload', uploadRouter)
router.use('/user', userRouter)

module.exports = router
