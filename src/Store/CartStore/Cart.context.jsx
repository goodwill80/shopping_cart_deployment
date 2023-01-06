import { createContext, useContext, useReducer } from 'react';
import { CartReducer, initialState } from './Cart.reducer';
import { cartHandlers } from './Cart.handlers';

const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(CartReducer, initialState);
  const { addToCartHandler, removeFromCartHandler } = cartHandlers(
    cart,
    dispatch
  );

  const context = {
    cartItems: cart.cartItems,
    totalCost: cart.cost,
    totalQty: cart.quantity,
    addToCartHandler: addToCartHandler,
    removeFromCartHandler: removeFromCartHandler,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
export const useGlobalCartContext = () => useContext(CartContext);

export default CartContextProvider;
