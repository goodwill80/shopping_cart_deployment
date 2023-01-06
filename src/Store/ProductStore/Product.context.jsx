import { createContext, useContext, useReducer, useState } from 'react';
import { productReducer } from './Product.reducer';
import { products } from '../../Products_data';

import Joi from 'joi-browser';

const ProductContext = createContext();

function ProductContextProvider({ children }) {
  const [allProducts, dispatch] = useReducer(productReducer, products);
  const [form, setForm] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState({});

  // ADD NEW PRODUCT
  const addNewProduct = (product) => {
    dispatch({ type: 'ADD_NEW_PRODUCT', product });
  };

  // EDIT PRODUCT
  const editProduct = (product) => {
    dispatch({ type: 'EDIT_PRODUCT', product });
  };

  // DELETE A PRODUCT
  const deleteProduct = (product) => {
    dispatch({ type: 'DELETE_PRODUCT', product });
  };

  // DELETE ALL PRODUCTS
  const deleteAll = () => {
    dispatch({ type: 'DELETE_ALL' });
  };

  // DELETE SELECTED PRODUCTS
  const selectDelete = (products) => {
    dispatch({ type: 'DELETE_SELECTED', products });
  };

  // FORM Validation using JOI
  const schema = {
    id: Joi.number(),
    name: Joi.string().min(1).max(20).required(),
    brand: Joi.string().min(1).max(20).required(),
    price: Joi.number().min(1).max(100000000).required(),
    count: Joi.number().min(0),
    image: Joi.string().min(0),
    toDelete: Joi.boolean(),
    category: Joi.string().min(1).required(),
    instock: Joi.number().min(1).required(),
    discount: Joi.number().min(0),
    description: Joi.string(),
  };

  const validata = (e) => {
    const { name, value } = e.target;
    const objToCompare = { [name]: value };
    const subSchema = { [name]: schema[name] };

    const result = Joi.validate(objToCompare, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };

  // Handle Form Change
  const handleFormChange = (e) => {
    const { name } = e.target;
    const errorMessage = validata(e);
    let errorData = { ...error };

    if (errorMessage) {
      errorData[name] = errorMessage;
    } else {
      delete errorData[name];
    }
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setError(errorData);
  };

  // CHECK VALIDITY
  const checkValidity = (data) => {
    if (
      data.price <= 0 ||
      isNaN(data.price) ||
      data.price === null ||
      data.price === '' ||
      data.instock <= 0 ||
      isNaN(data.instock) ||
      data.discount < 0 ||
      isNaN(data.discount) ||
      data.name === '' ||
      data.name === null ||
      data.brand === '' ||
      data.brand === null ||
      data.category === '' ||
      data.category === null
    ) {
      return false;
    }
    return true;
  };

  const context = {
    products: allProducts,
    addNewProduct,
    editProduct,
    deleteProduct,
    deleteAll,
    checkValidity,
    isEditing,
    setIsEditing,
    handleFormChange,
    form,
    setForm,
    selectDelete,
    schema,
    setError,
    error,
  };
  return (
    <ProductContext.Provider value={context}>
      {children}
    </ProductContext.Provider>
  );
}

export const useGlobalProductContext = () => useContext(ProductContext);

export default ProductContextProvider;
