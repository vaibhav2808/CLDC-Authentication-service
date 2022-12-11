const User = require('../models/User')
const Image = require('../models/Image')

const getUser = async (req, res) => {
  return res.status(200).json(req.user)
}

const getUserByUserId = async (req, res) => {
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

const getUploadsByUserId = async (req, res) => {
  const userId = req.params.id
  const images = await Image.find({ userId })
  res.status(200).json(images)
}

const getUploads = async (req, res) => {
  const images = await Image.find({ userId: req.user._id })
  res.status(200).json(images)
}

module.exports = {
  getUser,
  updateUser,
  getUploads,
  getUserByUserId,
  getUploadsByUserId
}
