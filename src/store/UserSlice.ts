import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/common';

export type UserState = {
  wishlist: Product['id'][];
  wishlistItemsCount: number;
};

const initialState: UserState = {
  wishlist: [],
  wishlistItemsCount: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleWishlist: (state, action: PayloadAction<Product['id']>) => {
      const isProductLiked = state.wishlist.find((wish) => wish === action.payload);
      if (isProductLiked) {
        const updatedWishlist = state.wishlist.filter((wish) => wish !== action.payload);
        state.wishlist = updatedWishlist;
        state.wishlistItemsCount = state.wishlist.length;
        return;
      }
      state.wishlist.push(action.payload);
      state.wishlistItemsCount = state.wishlist.length;
    },
  },
});

export const { handleWishlist } = userSlice.actions;

export default userSlice.reducer;
