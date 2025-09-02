const cloudinary = require('../config/cloudinary');

async function uploadImage(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const result = await cloudinary.uploader.upload_stream(
      { folder: 'inventoryhub' },
      (error, uploaded) => {
        if (error) return next(error);
        return res.json({ url: uploaded.secure_url });
      }
    );

    result.end(req.file.buffer);
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadImage };
