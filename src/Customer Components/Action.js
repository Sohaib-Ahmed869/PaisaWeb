// actions.js
export const addToCart = (productId) => ({
    type: 'ADD_TO_CART',
    payload: productId,
  });
  
  export const clearCart = () => ({
    type: 'CLEAR_CART',
  });
  