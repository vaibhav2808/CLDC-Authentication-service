const Multer = require('multer')

const storage = Multer.memoryStorage()

const multer = Multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
})

module.exports = multer
