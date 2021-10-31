import { connectToDatabase } from 'db/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const getAllProducts = async (req, res) => {
    const result = await db.collection('products').find({}).toArray();
    res.status(200).json(result);
  };

  const addProduct = async (req, res) => {
    const { product } = req.body;
    const result = await db.collection('products').insertOne(product);
    res.status(201).json(result);
  };

  switch (req.method) {
    case 'GET':
      return getAllProducts(req, res);

    case 'POST':
      return addProduct(req, res);

    case 'PUT':
      return updateProduct(req, res);

    case 'DELETE':
      return deleteProduct(req, res);
  }
};
