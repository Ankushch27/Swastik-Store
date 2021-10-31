import { AddEditProduct } from '@/components/AddEditProduct';
import axios from 'axios';

const New = () => {
  const addProduct = async (product) => {
    // console.log(product);
    await axios.post('/api/products', { product });
  };

  return (
    <AddEditProduct
      formTitle="Add Product"
      uploaderTitle="Add Product Images"
      handleAddOrEdit={addProduct}
    />
  );
};
export default New;
