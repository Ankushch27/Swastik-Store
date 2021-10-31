import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/outline';

const PreviewImage = ({ src, removeImage }) => {
  const video = src.includes('data:video');
  return (
    <div
      className="relative flex group rounded-md shadow-md p-4 overflow-hidden cursor-pointer
        transition-all duration-300 hover:shadow-xl">
      <div
        onClick={removeImage}
        className="absolute right-4 p-2 bg-gray-100 rounded-full opacity-0 z-10
          transition-all duration-200 hover:bg-gray-300 group-hover:opacity-100">
        <TrashIcon className="h-6 w-6 text-gray-600" />
      </div>
      <div className="flex transition-all duration-300 group-hover:opacity-60">
        {video ? (
          <video src={src} height={168} width={168}></video>
        ) : (
          <Image src={src} height={168} width={168} />
        )}
      </div>
    </div>
  );
};

export default PreviewImage;
