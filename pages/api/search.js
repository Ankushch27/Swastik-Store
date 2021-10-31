import { connectToDatabase } from 'db/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const result = await db.collection('products').aggregate([
    {
      $search: {
        search: {
          query: req.query.term,
          path: ['productName', 'brand', 'description'], //fields to search from
        },
      },
    },
    {
      $limit: 20, //no. of search results
    },
  ]).toArray();
  res.status(200).json(result);
};
