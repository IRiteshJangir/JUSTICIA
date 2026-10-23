const cloudinary = require('../config/cloudinary');
const AppError = require('../utils/AppError');

class UploadService {
  async uploadImage(file) {
    if (!file) {
      throw new AppError('No file provided', 400);
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'justicia', resource_type: 'image' },
        (error, result) => {
          if (error) {
            return reject(new AppError('Image upload failed', 500));
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      );

      uploadStream.end(file.buffer);
    });
  }

  async deleteImage(publicId) {
    if (!publicId) return;
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Failed to delete image from cloudinary:', error);
    }
  }
}

module.exports = new UploadService();
