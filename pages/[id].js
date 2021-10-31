import ProductDetails from '@/components/ProductDetails';
import { ObjectId } from 'bson';
import { connectToDatabase } from 'db/mongodb';

const Product = ({ product }) => {
  return (
    <ProductDetails product={product} />
    // <h1>Product details page</h1>
  );
};

export default Product;

export async function getServerSideProps({ params }) {
  const { db } = await connectToDatabase();

  const { id } = params;
  const data = await db.collection('products').findOne({ _id: new ObjectId(id) });
  const product = JSON.parse(JSON.stringify(data));

  return {
    props: { product },
  };
}
