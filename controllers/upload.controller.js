const Image = require('../models/Image')
const Imagekit = require('imagekit')
const imagekitConfig = require('../config/imagekit')
const imagekitInstance = new Imagekit({
  publicKey: imagekitConfig.publicKey,
  privateKey: imagekitConfig.privateKey,
  urlEndpoint: imagekitConfig.url
})

const getLowResUrl = async (aspectRatio, url) => {
  return imagekitInstance.url({
    src: url,
    transformation: [
      {
        width: 540,
        height: 540 * aspectRatio,
        aspectRatio
      }
    ],
    transformationPosition: 'query'
  })
}

const getMediumResUrl = async (aspectRatio, url) => {
  return imagekitInstance.url({
    src: url,
    transformation: [
      {
        width: 1080,
        height: 1080 * aspectRatio,
        aspectRatio
      }
    ],
    transformationPosition: 'query'
  })
}

const upload = async (req, res) => {
  const { file } = req
  const userId = req.user._id
  const uploadResponse = await imagekitInstance.upload({
    file: file.buffer,
    fileName: file.originalname,
    folder: `/${userId}`,
    useUniqueFilename: true
  })
  if (!uploadResponse) {
    return res.status(400).json({
      message: 'Upload failed'
    })
  }
  const imObj = {}
  const aspectRatio = uploadResponse.height / uploadResponse.width
  if (uploadResponse.height * uploadResponse.width > 4000000) {
    imObj.highResUrl = uploadResponse.url
    imObj.lowResUrl = await getLowResUrl(aspectRatio, uploadResponse.url)
    imObj.mediumResUrl = await getMediumResUrl(aspectRatio, uploadResponse.url)
    imObj.thumbnailUrl = uploadResponse.thumbnailUrl
  } else if (uploadResponse.height * uploadResponse.width > 1000000) {
    imObj.mediumResUrl = uploadResponse.url
    imObj.lowResUrl = await getLowResUrl(aspectRatio, uploadResponse.url)
    imObj.thumbnailUrl = uploadResponse.thumbnailUrl
  } else {
    imObj.lowResUrl = uploadResponse.url
    imObj.thumbnailUrl = uploadResponse.thumbnailUrl
  }
  console.log(uploadResponse)

  const image = await Image.create({
    fileName: uploadResponse.name,
    urls: imObj,
    userId,
    height: uploadResponse.height,
    width: uploadResponse.width,
    filePath: uploadResponse.filePath,
    size: uploadResponse.size,
    fileId: uploadResponse.fileId
  })
  res.status(200).json(image)
}

const getImageDetails = async (req, res) => {
  const imageId = req.params.id
  const image = await Image.findById(imageId).populate('userId')
  if (!image) {
    return res.status(404).json({
      message: 'Image not found'
    })
  }
  res.status(200).json(image)
}

module.exports = {
  upload,
  getImageDetails
}
