export const productReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NEW_PRODUCT':
      return [...state, action.product];
    case 'DELETE_PRODUCT':
      const newList = state.filter((item) => item.id !== action.product.id);
      return [...newList];
    case 'DELETE_ALL':
      return [];
    case 'DELETE_SELECTED':
      return [...action.products];
    case 'EDIT_PRODUCT':
      const editedList = state.map((item) =>
        item.id === action.product.id ? action.product : item
      );
      return [...editedList];
    default:
      return state;
  }
};
