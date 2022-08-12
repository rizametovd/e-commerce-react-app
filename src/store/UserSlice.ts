import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { AlertType, CartItem, Product } from '../types/common';
import { RootState } from './store';
import { showAlert } from './CommonSlice';
import { ADDED_TO_WISHLIST, REMOVED_FROM_WISHLIST } from '../constants/messages';

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
  'user/setToLS',
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

export const wishListHandler = createAsyncThunk<void, { id: string; isWished: boolean }, { state: RootState }>(
  'user/wishListHandler',
  ({ id, isWished }, { dispatch }) => {
    dispatch(handleWishlist(id));
    dispatch(setToLocalStorage('likes'));

    if (isWished) {
      dispatch(showAlert({ type: AlertType.Info, message: REMOVED_FROM_WISHLIST }));
    } else {
      dispatch(showAlert({ type: AlertType.Success, message: ADDED_TO_WISHLIST, isAction: true }));
    }
  }
);

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
        product.profit = product.price - product.discountedPrice;
        product.totalPrice = product.discountedPrice;
      }

      state.cart.push(product);
    },

    increment: (state, action: PayloadAction<CartItem['productId']>) => {
      const product = state.cart.find((cartItem) => cartItem.productId === action.payload);
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

    decrement: (state, action: PayloadAction<CartItem['productId']>) => {
      const product = state.cart.find((cartItem) => cartItem.productId === action.payload);
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

    removeProductFromCart: (state, action: PayloadAction<CartItem['productId']>) => {
      const updatedCart = state.cart.filter((cartItem) => cartItem.productId !== action.payload);
      state.cart = updatedCart;
    },
  },
});

export const { handleWishlist, setWishlist, setProductToCart, increment, decrement, removeProductFromCart } =
  userSlice.actions;

export default userSlice.reducer;
