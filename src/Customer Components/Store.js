// store.js
import { createStore } from 'redux';

// Initial state
const initialState = {
  cart: [],
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

// Create store
const Store = createStore(rootReducer);

export default Store;
