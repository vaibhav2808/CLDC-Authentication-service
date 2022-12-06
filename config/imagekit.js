require('dotenv').config()
module.exports = {
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  url: process.env.IMAGEKIT_URL
}
