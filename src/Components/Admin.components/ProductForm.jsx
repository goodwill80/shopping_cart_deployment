import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi-browser';

import { useGlobalProductContext } from '../../Store/ProductStore/Product.context';
import { useGlobalUtility } from '../../Store/Utility/Utility.context';

const images = ['galaxy.webp', 'ipad.jpeg', 'iphone.png', 'pixel.jpg'];

function ProductForm({ products }) {
  const {
    addNewProduct,
    editProduct,
    checkValidity,
    isEditing,
    setIsEditing,
    handleFormChange,
    form,
    setForm,
    schema,
    setError,
    error,
  } = useGlobalProductContext();
  const { broardcastMessage } = useGlobalUtility();
  const { id } = useParams();
  const redirect = useNavigate();
  const categories = [...new Set(products.map((item) => item.category))];

  useEffect(() => {
    if (!id) {
      setIsEditing(false);
      setForm(() => {
        return {
          name: '',
          brand: '',
          category: '',
          price: '',
          instock: '',
          discount: 0,
          description: '',
        };
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = Joi.validate(form, schema, { abortEarly: false });
    const { error } = result;

    if (error) {
      const errorData = {};
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errorData[name] = message;
      }
      setError(errorData);
      console.log(errorData);
    }

    if (!checkValidity(form)) {
      broardcastMessage('Invalid input. Please try again');
      return;
    }

    if (isEditing) {
      editProduct(form);
      const editId = parseInt(form.id);
      broardcastMessage(`${form.name} edited successfully!`);
      redirect(`/admin/view/${editId}`);
      return;
    }
    const newId = uuidv4();
    addNewProduct({
      ...form,
      id: parseInt(newId),
      toDelete: false,
      image: images[Math.floor(Math.random() * images.length)],
    });
    broardcastMessage(`${form.name} has been added successfully!`);
    redirect(`/admin/view/${parseInt(newId)}`);
  };

  return (
    <div className="flex flex-col gap-1 w-[580px]">
      <div className="flex justify-start items-start w-[520px] text-gray-700">
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Edit Product' : 'Add a New Product'}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded px-8 pt-6 pb-4 mb-12"
      >
        <div className="mb-6">
          <label className="font-bold pl-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Product name"
            value={form.name}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-6">
          <label className="font-bold pl-2" htmlFor="brand">
            Brand
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="brand"
            name="brand"
            type="text"
            placeholder="Product brand"
            value={form.brand}
            onChange={handleFormChange}
          />
        </div>

        <div className="mb-6 flex gap-4">
          <label className="font-bold pl-2" htmlFor="category">
            Category:
          </label>
          <select
            value={form.category}
            name="category"
            onChange={handleFormChange}
          >
            <option>Select one option</option>
            {categories.length > 0 ? (
              categories.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))
            ) : (
              <>
                <option value="laptop">laptop</option>
                <option value="tablet">tablet</option>
                <option value="phone">phone</option>
              </>
            )}
          </select>
        </div>
        <div className="mb-6">
          <label className="font-bold pl-2" htmlFor="price">
            Price ($)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            name="price"
            type="number"
            placeholder="$Price"
            value={form.price}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-6">
          <label className="font-bold pl-2" htmlFor="instock">
            In stock
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="instock"
            name="instock"
            type="number"
            placeholder="In Stock"
            value={form.instock}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-4">
          <label className="font-bold pl-2" htmlFor="discount">
            Discount (%)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="discount"
            name="discount"
            type="number"
            placeholder="%Discount"
            value={form.discount}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-6">
          <label className="font-bold pl-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={handleFormChange}
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="btn btn-success w-full">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
