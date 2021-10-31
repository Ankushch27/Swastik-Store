import axios from 'axios';
import Link from 'next/link';
import useSWR from 'swr';
import ProductCard from './ProductCard';

const fetchProducts = async () => {
  const { data } = await axios.get('/api/products');
  return data;
};

const Main = () => {
  const { data, error } = useSWR('admin-products', fetchProducts);

  if (error) return <h2>An error occurred</h2>;
  if (!data) return <h2>Loading...</h2>;

  return (
    <>
      <h2 className="text-2xl font-extrabold text-gray-800">All Products</h2>
      <div className="mt-6 grid grid-cols-2 md:gap-y-10 md:gap-x-6 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
        {data.map((product) => (
          <Link key={product._id} href={`/${product._id}`}>
            <a>
              <ProductCard product={product} />
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Main;
