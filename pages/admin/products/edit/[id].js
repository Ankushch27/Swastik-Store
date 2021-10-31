import { AddEditProduct } from '@/components/AddEditProduct';
import axios from 'axios';
import { ObjectId } from 'bson';
import { connectToDatabase } from 'db/mongodb';

const Edit = ({ product }) => {
  const id = product._id
  const updateProduct = async (productData) => {
    await axios.put(`/api/products/${id}`, {
      productData,
    });
  };

  return (
    <AddEditProduct
      formTitle="Update Product"
      uploaderTitle="Update Product Images (Remove existing or Add new)"
      product={product}
      handleAddOrEdit={updateProduct}
    />
  );
};

export default Edit;

export async function getServerSideProps({ params }) {
  const { db } = await connectToDatabase();

  const { id } = params;
  const data = await db.collection('products').findOne({ _id: new ObjectId(id) });
  const product = JSON.parse(JSON.stringify(data));

  return {
    props: { product },
  };
}
