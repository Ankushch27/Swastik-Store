const cloudinary = require('cloudinary').v2;

export default async (req, res) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  })

  const deleteMedia = async (req, res) => {
    const { id } = req.query;
    const publicId = id.join('/')
    const result = await cloudinary.uploader.destroy(publicId);
    res.status(200).json(result);
  };

  switch (req.method) {
    case 'DELETE':
      return deleteMedia(req, res);
  }
};
