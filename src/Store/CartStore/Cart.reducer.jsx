// Initial State
export const initialState = {
  cartItems: [],
  quantity: 0,
  cost: 0,
};

// Helper function to calculate total costs and quantity of cart
const totalReduceHelper = (cartArrItems) => {
  const { quantity, cost } = cartArrItems.reduce(
    (cartItems, item) => {
      const { price, count } = item;
      cartItems.quantity += count;
      cartItems.cost += count * price;
      return cartItems;
    },
    {
      quantity: 0,
      cost: 0,
    }
  );
  return [quantity, cost];
};

// Cart Reducer
export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check for cart item already exist in State - True: return item, False: return false
      const checkExisting = state.cartItems.find(
        (item) => item.id === action.cartItem.id
      );
      // If cart item exist - replace it entirely, else add to the arr
      const newCartItems = checkExisting
        ? state.cartItems.map((item) =>
            item.id === checkExisting.id ? action.cartItem : item
          )
        : [...state.cartItems, action.cartItem];
      // Refer to helper function above
      const [quantity, cost] = totalReduceHelper(newCartItems);
      return {
        ...state,
        cartItems: [...newCartItems],
        quantity: quantity,
        cost: cost,
      };

    case 'REMOVE_FROM_CART':
      // Filter off deleted cartitem from array
      const lesserCartItems = state.cartItems.filter(
        (item) => item.id !== action.cartItem.id
      );
      // Calculate new cost and qty
      const [qty, costs] = totalReduceHelper(lesserCartItems);
      return {
        ...state,
        cartItems: lesserCartItems,
        quantity: qty,
        cost: costs,
      };
    default:
      return state;
  }
};
