import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../types/common';
import { RootState } from './store';

type WishList = Product['id'][];

export type UserState = {
  wishlist: WishList;
  cart: CartItem[];
};

const initialState: UserState = {
  wishlist: [],
  cart: [],
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

    setProductToCart: (state, action: PayloadAction<CartItem>) => {
      const product = { ...action.payload };

      if (product.discountedPrice !== undefined) {
        console.log('working:', product.discountedPrice);
        product.profit = product.price - product.discountedPrice;
        product.totalPrice = product.discountedPrice;
      }

      state.cart.push(product);
    },

    increment: (state, action: PayloadAction<CartItem['id']>) => {
      const product = state.cart.find((cartItem) => cartItem.id === action.payload);
      if (!product) return;

      product.totalWeight += product.weight;
      product.quantity++;

      if (product.discountedPrice !== undefined) {
        product.totalPrice += product.discountedPrice;
        product.profit = product.quantity * (product.price - product.discountedPrice);
        return;
      }

      product.totalPrice += product.price;
    },

    decrement: (state, action: PayloadAction<CartItem['id']>) => {
      const product = state.cart.find((cartItem) => cartItem.id === action.payload);
      if (!product) return;
      product.totalWeight -= product.weight;
      product.quantity--;

      if (product.discountedPrice !== undefined) {
        product.totalPrice -= product.discountedPrice;
        product.profit = product.quantity * (product.price - product.discountedPrice);
        return;
      }

      product.totalPrice -= product.price;
    },

    removeProductFromCart: (state, action: PayloadAction<CartItem['id']>) => {
      const updatedCart = state.cart.filter((cartItem) => cartItem.id !== action.payload);
      state.cart = updatedCart;
    },
  },
});

export const { handleWishlist, setWishlist, setProductToCart, increment, decrement, removeProductFromCart } =
  userSlice.actions;

export default userSlice.reducer;
