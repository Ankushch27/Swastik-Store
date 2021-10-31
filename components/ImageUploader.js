import { CheckCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useState } from 'react';
import PreviewImage from './PreviewImage';
import AddImage from './SVGs/AddImage';
import SpinProgress from './SVGs/SpinProgress';

const ImageUploader = ({ savedMedia, setUploadMedia }) => {
  const [savedMediaPreview, setSavedMediaPreview] = useState(savedMedia);
  const [previewSource, setPreviewSource] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onImagesSelect = (e) => {
    Array.from(e.target.files).forEach((file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource((prevSource) => prevSource.concat(reader.result));
      };
    });
  };

  const getSignData = async () => {
    const { data } = await axios.get('/api/cloudinary');
    return data;
  };

  const uploadImages = async () => {
    setIsLoading(true);
    const { apiKey, cloudName, signature, timestamp } = await getSignData();
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
    const formData = new FormData();
    previewSource.forEach(async (file) => {
      formData.append('file', file);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      formData.append('folder', 'product_images');

      const {
        data: { public_id, secure_url },
      } = await axios.post(url, formData);
      setUploadMedia((prevMedia) =>
        prevMedia.concat({ public_id, secure_url, signature })
      );
    });
    savedMedia && setUploadMedia((prevMedia) => prevMedia.concat(...savedMediaPreview));
    setIsLoading(false);
    setIsUploaded(true);
  };

  const deleteSavedImage = async (id, idx) => {
    await axios.delete(`/api/cloudinary/${id}`);
    setSavedMediaPreview((prevMedia) => prevMedia.filter((_, i) => i !== idx));
  };

  const removeSelectedImage = (idx) => {
    setPreviewSource((prevSource) => prevSource.filter((_, i) => i !== idx));
  };

  return (
    <>
      {!isUploaded ? (
        <>
          <label
            htmlFor="productImages"
            className="relative cursor-pointer flex justify-center px-6 py-5 border-2 border-dashed rounded-md
            border-gray-300 hover:border-indigo-500">
            <div className="space-y-1 text-center">
              <AddImage />
              <div className="flex text-sm text-gray-600">
                <div className="bg-white rounded-md font-medium text-indigo-600">
                  <span>Select file(s)</span>
                  <input
                    id="productImages"
                    name="productImages"
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={onImagesSelect}
                  />
                </div>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 1MB</p>
              {previewSource.length > 0 && (
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  onClick={uploadImages}
                  disabled={isLoading}>
                  {isLoading && <SpinProgress />}
                  {!isLoading ? 'Upload' : 'Uploading...'}
                </button>
              )}
            </div>
          </label>
          {savedMediaPreview && savedMediaPreview.length > 0 && (
            <div className="pt-4">
              <div className="font-medium">Saved media</div>
              <div className="flex flex-wrap py-5 gap-6">
                {savedMediaPreview.map(({ public_id, secure_url }, i) => (
                  <PreviewImage
                    key={i}
                    src={secure_url}
                    removeImage={() => deleteSavedImage(public_id, i)}
                  />
                ))}
              </div>
            </div>
          )}
          {previewSource.length > 0 && (
            <div className="pt-4">
              <div className="font-medium">Selected media</div>
              <div className="flex flex-wrap py-5 gap-6">
                {previewSource.map((img, i) => (
                  <PreviewImage
                    key={i}
                    src={img}
                    removeImage={() => removeSelectedImage(i)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex gap-2 items-center py-5">
          <CheckCircleIcon className="h-7 w-7 text-green-700" />{' '}
          {`${previewSource.length} images uploaded successfully`}
        </div>
      )}
    </>
  );
};

export default ImageUploader;
