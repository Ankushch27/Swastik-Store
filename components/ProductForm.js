import { Field } from 'formik';
import InputWrapper from './InputWrapper';

const categories = ['General', 'Lighting', 'Appliances', 'Fans', 'Tools'];

const ProductForm = () => {
  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="col-span-6 sm:col-span-3">
        <InputWrapper htmlFor="productName" label="Product Name">
          <Field
            name="productName"
            id="productName"
            type="text"
            className="peer placeholder-transparent"
            placeholder="Product Name"
            required
          />
        </InputWrapper>
      </div>
      <div className="col-span-6 sm:col-span-3">
        <InputWrapper htmlFor="numItems" label="Items in Pack">
          <Field
            name="numItems"
            id="numItems"
            type="number"
            min="0"
            className="peer placeholder-transparent"
            placeholder="Items in Pack"
          />
        </InputWrapper>
      </div>
      <div className="col-span-6">
        <InputWrapper htmlFor="description" label="Description">
          <Field
            name="description"
            id="description"
            as="textarea"
            className="peer placeholder-transparent"
            placeholder="Add brief product description here..."
          />
        </InputWrapper>
      </div>
      <div className="col-span-6 sm:col-span-3">
        <InputWrapper htmlFor="brand" label="Brand">
          <Field
            name="brand"
            id="brand"
            type="text"
            className="peer placeholder-transparent"
            placeholder="Brand"
          />
        </InputWrapper>
      </div>
      <div className="col-span-6 sm:col-span-3">
        <InputWrapper htmlFor="category" label="Category">
          <Field
            name="category"
            id="category"
            as="select"
            placeholder="Category"
            className="peer select">
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Field>
        </InputWrapper>
      </div>
      <div className="col-span-6 sm:col-span-3">
        <InputWrapper htmlFor="sellingPrice" icon="₹" label="Selling Price">
          <Field
            name="sellingPrice"
            icon="₹"
            id="sellingPrice"
            placeholder="0.00"
            type="number"
            min="0"
            className="pl-7 peer placeholder-transparent"
            required
          />
        </InputWrapper>
      </div>
      <div className="col-span-6 sm:col-span-3">
        <InputWrapper htmlFor="mrp" icon="₹" label="MRP">
          <Field
            name="mrp"
            icon="₹"
            id="mrp"
            placeholder="0.00"
            type="number"
            min="0"
            className="pl-7 peer placeholder-transparent"
            required
          />
        </InputWrapper>
      </div>
    </div>
  );
};

export default ProductForm;
