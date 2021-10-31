import { TrashIcon } from '@heroicons/react/outline';
import Image from 'next/image';

const AdminProduct = ({ product, handleEdit, handleDelete }) => {
  const { productName, category, sellingPrice, mrp, media } = product;
  // console.log(media);
  // const src = media[0].secure_url

  return (
    <tr key={productName}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            {media.length > 0 && (
              <Image
                className="h-10 w-10 rounded-full"
                src={media[0].secure_url}
                alt=""
                height={40}
                width={40}
                objectFit="contain"
              />
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{productName}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{category}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">₹{sellingPrice}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">₹{mrp}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={handleEdit}
          className="rounded-full text-indigo-600 text-right text-sm font-medium px-3 py-1 hover:bg-indigo-100">
          Edit
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full cursor-pointer
         hover:bg-red-100" onClick={handleDelete}>
          <TrashIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
      </td>
    </tr>
  );
};

export default AdminProduct;
