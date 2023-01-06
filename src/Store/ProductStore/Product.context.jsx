import { createContext, useContext, useReducer, useState } from 'react';
import { productReducer } from './Product.reducer';
import { products } from '../../Products_data';

const ProductContext = createContext();

function ProductContextProvider({ children }) {
  const [allProducts, dispatch] = useReducer(productReducer, products);
  const [form, setForm] = useState({});
  const [isEditing, setIsEditing] = useState(false);

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

  // Handle Form Change
  const handleFormChange = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
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
  };
  return (
    <ProductContext.Provider value={context}>
      {children}
    </ProductContext.Provider>
  );
}

export const useGlobalProductContext = () => useContext(ProductContext);

export default ProductContextProvider;
