import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CartContextProvider from './Store/CartStore/Cart.context';
import ProductContextProvider from './Store/ProductStore/Product.context';
import UtilityContextProvider from './Store/Utility/Utility.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UtilityContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ProductContextProvider>
    </UtilityContextProvider>
  </React.StrictMode>
);
