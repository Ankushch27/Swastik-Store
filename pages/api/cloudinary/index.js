const cloudinary = require('cloudinary').v2;

export default async (req, res) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const timestamp = Math.round(new Date().getTime() / 1000);

  const createSignature = (req, res) => {
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: 'product_images',
      },
      process.env.CLOUDINARY_API_SECRET
    );

    res.status(200).json({ apiKey, cloudName, signature, timestamp });
  };

  switch (req.method) {
    case 'GET':
      return createSignature(req, res);

    case 'POST':
      return uploadMedia(req, res);
  }
};
