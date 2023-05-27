// import { createSlice } from "@reduxjs/toolkit";
// import productService from "../../services/productService";

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cart: [],
//     // items: [],
//     totalQuantity: 0,
//     totalPrice: 0,
//   },
//   reducers: {
//     // addItemToCart(state, action) {
//     //   const newItem = action.payload;
//     //   const existingItem = state.items.find((item) => item.id + newItem.id);
//     //   state.totalQuantity = state.totalQuantity + 1;
//     //   if (existingItem) {
//     //     existingItem.quantity = existingItem.quantity + 1;
//     //     existingItem.totalPrice = existingItem.totalPrice + newItem.price;
//     //   } else {
//     //     state.items.push({
//     //       id: newItem.id,
//     //       price: newItem.price,
//     //       quantity: 1,
//     //       totalPrice: newItem.price,
//     //       name: newItem.title,
//     //     });
//     //   }
//     // },
//   },
// });
// export const { addItemToCart } = cartSlice.actions;
// const cartReducer = cartSlice.reducer;

// export default cartReducer;
