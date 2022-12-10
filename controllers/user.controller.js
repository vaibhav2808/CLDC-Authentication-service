const User = require('../models/User')
const Image = require('../models/Image')
const getUser = async (req, res) => {
  const userId = req.params.id
  const user = await User.findById(userId)
  if (!user) {
    return res.status(404).send('User not found')
  }
  res.status(200).json(user)
}

const updateUser = async (req, res) => {
  const update = req.body
  const userId = req.user._id
  const user = await User.findByIdAndUpdate(userId, update, { new: true })
  res.status(200).json(user)
}

const getUploads = async (req, res) => {
  const userId = req.params.id
  const images = await Image.find({ userId })
  res.status(200).json(images)
}

module.exports = {
  getUser,
  updateUser,
  getUploads
}
