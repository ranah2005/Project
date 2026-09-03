import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem(state, action) {
      const { name, image, cost } = action.payload;
      const existingItem = state.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({
          name,
          image,
          cost,
          quantity: 1,
        });
      }
    },

    removeItem(state, action) {
      return state.filter((item) => item.name !== action.payload);
    },

    updateQuantity(state, action) {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.find((item) => item.name === name);

      if (!itemToUpdate) {
        return;
      }

      if (quantity <= 0) {
        return state.filter((item) => item.name !== name);
      }

      itemToUpdate.quantity = quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
