const cloudinary = require('cloudinary')
const _ = require('underscore')

const Q = require('q')

function remove(image_id) {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  return new Q.Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(image_id, (err, res) => {
      if (err) {
        console.log('cloudinary err:', err)
        reject(err)
      } else {
        console.log('cloudinary res:', res)
        return resolve(image_id)
      }
    })
  })
}

module.exports.upload = remove
