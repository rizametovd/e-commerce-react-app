import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AlertType, Brand, Error } from '../types/common';
import { handleObj } from '../utils/helpers';
import {
  CREATE_BRAND_ERROR_MESSAGE,
  DELETE_BRAND_ERROR_MESSAGE,
  FETCH_BRANDS_ERROR_MESSAGE,
  UPDATE_BRAND_ERROR_MESSAGE,
} from '../constants/messages';
import { showAlert } from './CommonSlice';
import MOCK_BRANDS from '../mocks/brands.json';

export type BrandState = {
  brands: Brand[];
  selectedBrand: Brand;
  isLoading: boolean;
  error: Error;
};

const initialState: BrandState = {
  brands: [],
  selectedBrand: {
    id: '',
    name: '',
    description: '',
    url: '',
  },
  isLoading: false,
  error: {
    isError: false,
    message: '',
  },
};

const BASE_URL = 'https://e-commerce-65446-default-rtdb.firebaseio.com';

export const fetchBrands = createAsyncThunk('brand/fetchbrands', async (_, { dispatch, rejectWithValue }) => {
  const response = await fetch(`${BASE_URL}/brands.json`);

  if (!response.ok) {
    dispatch(showAlert({ type: AlertType.Error, message: FETCH_BRANDS_ERROR_MESSAGE }));
    return rejectWithValue(FETCH_BRANDS_ERROR_MESSAGE);
  }

  const data = await response.json();
  const brands: Brand[] = handleObj(data);

  if (brands.length < 2) {
    const mockedBrands: Brand[] = handleObj(MOCK_BRANDS);
    return mockedBrands;
  }
  return brands;
});

export const createBrand = createAsyncThunk(
  'brand/createBrand',
  async (brand: Partial<Brand>, { dispatch, rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/brands.json`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(brand),
    });

    if (!response.ok) {
      dispatch(showAlert({ type: AlertType.Error, message: CREATE_BRAND_ERROR_MESSAGE }));
      return rejectWithValue(CREATE_BRAND_ERROR_MESSAGE);
    }

    const data: { name: string } = await response.json();
    return { id: data.name, ...brand } as Brand;
  }
);

export const updateBrand = createAsyncThunk(
  'brand/updateBrand',
  async (brand: Brand, { dispatch, rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/brands/${brand.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: brand.name,
        description: brand.description,
        url: brand.url,
      }),
    });

    if (!response.ok) {
      dispatch(showAlert({ type: AlertType.Error, message: UPDATE_BRAND_ERROR_MESSAGE }));
      return rejectWithValue(UPDATE_BRAND_ERROR_MESSAGE);
    }

    const data = await response.json();
    const updatedBrand: Brand = {
      id: brand.id,
      ...data,
    };
    return updatedBrand;
  }
);

export const deleteBrand = createAsyncThunk(
  'brand/deleteBrand',
  async (id: Brand['id'], { dispatch, rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/brands/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      dispatch(showAlert({ type: AlertType.Error, message: DELETE_BRAND_ERROR_MESSAGE }));
      return rejectWithValue(DELETE_BRAND_ERROR_MESSAGE);
    }

    return id;
  }
);

export const BrandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    selectBrand: (state, action: PayloadAction<Brand['id']>) => {
      const brand = state.brands.find((brand) => brand.id === action.payload);

      if (!brand) return;

      state.selectedBrand = brand;
    },

    removeSelectedBrand: (state) => {
      state.selectedBrand = initialState.selectedBrand;
    },

    resetBrandError: (state) => {},
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBrands.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchBrands.fulfilled, (state, { payload }) => {
      state.brands = payload;
      state.isLoading = false;
    });

    builder.addCase(fetchBrands.rejected, (state, { payload }) => {
      state.error = {
        isError: true,
        message: payload as Error['message'],
      };
      state.isLoading = false;
    });

    builder.addCase(createBrand.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createBrand.fulfilled, (state, { payload }) => {
      state.brands.push(payload);
      state.isLoading = false;
    });

    builder.addCase(createBrand.rejected, (state, { payload }) => {
      state.error = {
        isError: true,
        message: payload as Error['message'],
      };
      state.isLoading = false;
    });

    builder.addCase(updateBrand.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateBrand.fulfilled, (state, { payload }) => {
      const index = state.brands.findIndex((brand) => brand.id === payload.id);
      if (index < 0) return;
      state.brands[index] = payload;
      state.isLoading = false;
    });

    builder.addCase(updateBrand.rejected, (state, { payload }) => {
      state.error = {
        isError: true,
        message: payload as Error['message'],
      };
      state.isLoading = false;
    });

    builder.addCase(deleteBrand.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteBrand.fulfilled, (state, { payload }) => {
      const index = state.brands.findIndex((brand) => brand.id === payload);
      state.brands.splice(index, 1);
      state.isLoading = false;
    });

    builder.addCase(deleteBrand.rejected, (state, { payload }) => {
      state.error = {
        isError: true,
        message: payload as Error['message'],
      };
      state.isLoading = false;
    });
  },
});

export const { selectBrand, removeSelectedBrand, resetBrandError } = BrandSlice.actions;

export default BrandSlice.reducer;
