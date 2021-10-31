import { Form, Formik } from 'formik';
import { useState } from 'react';
import ImageUploader from './ImageUploader';
import Modal from './Modal';
import ProductForm from './ProductForm';
import SpinProgress from './SVGs/SpinProgress';

const AddEditProduct = ({ formTitle, uploaderTitle, handleAddOrEdit, product }) => {
  const [uploadMedia, setUploadMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isEditMode = product;
  const { _id, media, ...productValues } = product || {};

  const initialValues = isEditMode
    ? productValues
    : {
        productName: '',
        numItems: '',
        description: '',
        brand: '',
        category: '',
        sellingPrice: '',
        mrp: '',
      };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    handleAddOrEdit({ ...values, media: uploadMedia });
    setIsLoading(false);
    setOpen(true)
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="sm:border sm:shadow overflow-hidden sm:rounded-md">
        <div className="bg-white">
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}>
            {() => (
              <Form>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-gray-900 text-xl font-bold mb-3">{formTitle}</h3>
                  <ProductForm />
                  <div className="pt-6">
                    <h3 className="text-gray-900 text-xl font-bold mb-3">
                      {uploaderTitle}
                    </h3>
                    <ImageUploader savedMedia={media} setUploadMedia={setUploadMedia} />
                  </div>
                </div>
                <div className="flex px-4 py-3 bg-gray-100 sm:px-6">
                  <button
                    type="submit"
                    className="btn btn-primary ml-auto"
                    disabled={isLoading}>
                    {isLoading && <SpinProgress />}
                    {!isLoading ? 'Save' : 'Saving...'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} />
    </div>
  );
};

export { AddEditProduct };
