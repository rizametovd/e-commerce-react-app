import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/common';
import { RootState } from './store';

type WishList = Product['id'][];

export type UserState = {
  wishlist: WishList;
};

const initialState: UserState = {
  wishlist: [],
};

export const setToLocalStorage = createAsyncThunk<void, string, { state: RootState }>(
  'user/setWishlistToLS',
  async (key, { getState }) => {
    const {
      user: { wishlist },
    } = getState();

    localStorage.setItem(key, JSON.stringify(wishlist));
  }
);

export const getFromLocalStorage = createAsyncThunk<void, string>('user/setWishlistToLS', async (key, { dispatch }) => {
  const wishlist = JSON.parse(localStorage.getItem(key) as any);
  if (!wishlist) return;
  dispatch(setWishlist(wishlist));
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },

    handleWishlist: (state, action: PayloadAction<Product['id']>) => {
      const isProductLiked = state.wishlist.find((wish) => wish === action.payload);
      if (isProductLiked) {
        const updatedWishlist = state.wishlist.filter((wish) => wish !== action.payload);
        state.wishlist = updatedWishlist;
        return;
      }
      state.wishlist.push(action.payload);
    },
  },
});

export const { handleWishlist, setWishlist } = userSlice.actions;

export default userSlice.reducer;
