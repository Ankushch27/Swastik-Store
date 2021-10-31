import { ObjectId } from 'bson';
import { connectToDatabase } from 'db/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const getProductById = async (req, res) => {
    const { id } = req.query;
    const result = await db.collection('products').findOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  };

  const updateProduct = async (req, res) => {
    const { id } = req.query;
    const { productData } = req.body;
    const result = await db
      .collection('products')
      .updateOne({ _id: new ObjectId(id) }, { $set: productData });
    res.status(200).json(result);
  };

  const deleteProduct = async (req, res) => {
    const { id } = req.query;
    const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  };

  switch (req.method) {
    case 'GET':
      return getProductById(req, res);
    case 'PUT':
      return updateProduct(req, res);
    case 'DELETE':
      return deleteProduct(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
