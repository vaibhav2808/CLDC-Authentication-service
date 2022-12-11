const mongoose = require('mongoose')

const resSchema = new mongoose.Schema({
  highResUrl: {
    type: String
  },
  lowResUrl: {
    type: String
    // required: true
  },
  mediumResUrl: {
    type: String
  },
  thumbnailUrl: {
    type: String,
    required: true
  }
})

const schema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  urls: {
    type: resSchema,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String
  }],
  height: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileId: {
    type: String,
    required: true
  },
  isTagged: {
    type: Boolean,
    default: false
  },
  isObjectionable: {
    type: Boolean,
    default: false
  }
},

{ timestamps: true })

module.exports = mongoose.model('Image', schema)
