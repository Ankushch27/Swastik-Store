import AdminProduct from '@/components/AdminProduct';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import useSWR from 'swr';

const DashboardHeader = () => (
  <div className="flex bg-white shadow p-4 border-b border-gray-200 sm:rounded-lg">
    <Link href="/admin/products/new">
      <a className="btn btn-primary ml-auto">Add Product</a>
    </Link>
  </div>
);

const TableHeadLabel = ({ label }) => (
  <th
    scope="col"
    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {label}
  </th>
);

const labels = ['Product Name', 'Category', 'Price', 'MRP'];

const fetchProducts = async () => {
  const { data } = await axios.get('/api/products');
  return data;
};

const Products = () => {
  const router = useRouter();
  const { data, error } = useSWR('admin-products', fetchProducts);

  const deleteProduct = async (id) => {
    const res = await axios.delete(`/api/products/${id}`)
    console.log(res);
  }

  if (error) return <h2>An error occurred</h2>;
  if (!data) return <h2>Loading...</h2>;

  return (
    <div className="bg-gray-100 py-6 min-h-screen">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <DashboardHeader />
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Product image</span>
                      </th>
                      {labels.map((label) => (
                        <TableHeadLabel key={label} label={label} />
                      ))}
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((product) => (
                      <AdminProduct
                        key={product._id}
                        product={product}
                        handleEdit={() =>
                          router.push(`/admin/products/edit/${product._id}`)
                        }
                        handleDelete={() => deleteProduct(product._id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
