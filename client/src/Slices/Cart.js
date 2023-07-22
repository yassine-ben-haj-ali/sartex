import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  count: localStorage.getItem("cartCount")
    ? parseInt(localStorage.getItem("cartCount"), 10)
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item._id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
        itemInCart.total = itemInCart.quantity * Number(itemInCart.price);
      } else {
        state.cart.push({ ...action.payload.item, quantity: 1,total:Number(action.payload.item.price)});
      }
      state.count++;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("cartCount", state.count);
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);
      if (item) {
        item.quantity++;
        item.total = item.quantity * Number(item.price);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);
      if (item) {
        if (item.quantity === 1) {
          item.quantity = 1;
          item.total = item.quantity * Number(item.price);
          localStorage.setItem("cart", JSON.stringify(state.cart));
        } else {
          item.quantity--;
          item.total = item.quantity * Number(item.price);
          localStorage.setItem("cart", JSON.stringify(state.cart));
        }
      }
    },
    removeItem: (state, action) => {
      const updatedCart = state.cart.filter(
        (item) => item._id !== action.payload
      );
      state.cart = updatedCart;
      state.count--;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("cartCount", state.count);
    },
    clearAll: (state) => {
      state.cart = [];
      state.count = 0;
      localStorage.removeItem("cart");
      localStorage.removeItem("cartCount");
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearAll,
} = cartSlice.actions;
export default cartSlice.reducer;
