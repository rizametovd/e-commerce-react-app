import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { Alert, AlertType, Order } from '../types/common';
import { handleObj, wait } from '../utils/helpers';

export type CommonState = {
  alert: Alert;
  orders: Order[];
  isLoading: boolean;
};

const initialState: CommonState = {
  alert: {
    isAction: false,
    type: AlertType.Info,
    message: '',
  },
  orders: [],
  isLoading: false,
};


const BASE_URL = 'https://e-commerce-65446-default-rtdb.firebaseio.com';

export const fetchOrders = createAsyncThunk('common/fetchOrders', async (_, { dispatch, rejectWithValue }) => {
  const response = await fetch(`${BASE_URL}/orders.json`);

  if (!response.ok) {
    // dispatch(showAlert({ type: AlertType.Error, message: FETCH_BRANDS_ERROR_MESSAGE }));
    // return rejectWithValue(FETCH_BRANDS_ERROR_MESSAGE);
  }

  const data = await response.json();
  const brands: Order[] = handleObj(data);
  return brands;
});

export const createOrder = createAsyncThunk(
  'brand/createBrand',
  async (order: Partial<Order>, { dispatch, rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/orders.json`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    // if (!response.ok) {
    //   dispatch(showAlert({ type: AlertType.Error, message: CREATE_BRAND_ERROR_MESSAGE }));
    //   return rejectWithValue(CREATE_BRAND_ERROR_MESSAGE);
    // }

    const data: { name: string } = await response.json();
    return { id: data.name, ...order } as Order;
  }
);




export const showAlert = createAsyncThunk('common/handleAlert', async (alert: Alert, { dispatch }) => {
  dispatch(setAlert(alert));
  await wait(2500);
  dispatch(hideAlert());
});

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Alert>) => {
      state.alert = action.payload;
    },

    hideAlert: (state) => {
      state.alert = initialState.alert;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
      state.orders = payload;
      state.isLoading = false;
    });

    builder.addCase(fetchOrders.rejected, (state, { payload }) => {
      // state.error = {
      //   isError: true,
      //   message: payload as Error['message'],
      // };
      state.isLoading = false;
    });

    builder.addCase(createOrder.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createOrder.fulfilled, (state, { payload }) => {
      // state.brands.push(payload);
      state.isLoading = false;
    });

    builder.addCase(createOrder.rejected, (state, { payload }) => {
    //   state.error = {
    //     isError: true,
    //     message: payload as Error['message'],
    //   };
      state.isLoading = false;
    });
  }
});

export const { setAlert, hideAlert } = commonSlice.actions;

export default commonSlice.reducer;
