export const cartHandlers = (cart, dispatch) => {
  // Functions
  // Add to Cart - located in ProductItem and ProductPage component
  const addToCartHandler = (item) => {
    const checkForExisting = cart.cartItems.find((itm) => itm.id === item.id);
    console.log(parseInt(checkForExisting?.count) === parseInt(item.instock));
    let newQty;
    if (item.count === 0) {
      newQty = checkForExisting ? checkForExisting.count + 1 : 1;
      if (parseInt(checkForExisting?.count) >= parseInt(item.instock)) {
        newQty = item.instock;
        alert('Item is out of stock');
      }
      dispatch({
        type: 'ADD_TO_CART',
        cartItem: { ...item, count: newQty },
      });
    } else {
      dispatch({ type: 'ADD_TO_CART', cartItem: { ...item } });
    }
  };

  // Remove from Cart - located in ProductPage component
  const removeFromCartHandler = (item) => {
    const checkExisting = cart.cartItems.find((itm) => itm.id === item.id);
    if (checkExisting) dispatch({ type: 'REMOVE_FROM_CART', cartItem: item });
  };

  return { addToCartHandler, removeFromCartHandler };
};
