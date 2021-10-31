import Image from 'next/image';

const ProductCard = ({ product }) => {
  const { productName, numItems, sellingPrice, mrp, media } = product;
  const discount = Math.round(((mrp - sellingPrice) / mrp) * 100);

  return (
    <div
      className="rounded-md border border-collapse md:border-none overflow-hidden
       hover:shadow-lg cursor-pointer transition-shadow">
      <Image
        src={media[0].secure_url}
        alt="{product.imageAlt}"
        height={1000}
        width={1000}
        objectFit="contain"
      />
      <div className="bg-white p-4">
        <h3 className="text-md text-gray-800">{productName}</h3>
        <p className="mt-1 text-sm text-gray-500">Pack of {numItems}</p>
        <div className="flex items-center gap-4">
          <p className="font-bold text-gray-900">{`₹${sellingPrice}`}</p>
          <p className="text-sm line-through font-medium text-gray-500">{`₹${mrp}`}</p>
          <p className="text-sm font-semibold text-green-700">{discount}% off</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
