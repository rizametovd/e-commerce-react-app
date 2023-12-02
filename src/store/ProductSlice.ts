import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AlertType, Error, Product } from '../types/common';
import { handleObj } from '../utils/helpers';
import { RootState } from './store';
import {
  CREATE_PRODUCT_ERROR_MESSAGE,
  DELETE_PRODUCT_ERROR_MESSAGE,
  FETCH_PRODUCTS_ERROR_MESSAGE,
  UPDATE_PRODUCT_ERROR_MESSAGE,
} from '../constants/messages';
import { fetchBrands } from './BrandSlice';
import { fetchCategories } from './CategorySlice';
import { showAlert } from './CommonSlice';
import MOCKED_PRODUCTS from '../mocks/products.json';

export type ProductState = {
  products: Product[];
  selectedProduct: Product;
  isLoading: boolean;
  error: Error;
};

const initialState: ProductState = {
  products: [],
  selectedProduct: {
    id: '',
    category: {
      id: '',
      name: '',
      url: '',
    },
    description: '',
    image: '',
    name: '',
    price: 0,
    weight: 0,
    brand: {
      id: '',
      name: '',
    },
    gender: {
      name: '',
      id: '',
      url: '',
    },
  },
  isLoading: false,
  error: {
    isError: false,
    message: '',
  },
};

const BASE_URL = 'https://e-commerce-65446-default-rtdb.firebaseio.com';

export const fetchProducts = createAsyncThunk<Product[], void, { state: RootState }>(
  'product/fetchProducts',
  async (_, { getState, dispatch, rejectWithValue }) => {
    await Promise.all([dispatch(fetchBrands()), dispatch(fetchCategories())]);

    const response = await fetch(`${BASE_URL}/products.json`);

    if (!response.ok) {
      dispatch(showAlert({ type: AlertType.Error, message: FETCH_PRODUCTS_ERROR_MESSAGE }));
      return rejectWithValue(FETCH_PRODUCTS_ERROR_MESSAGE);
    }

    let products: Product[] = [];
    const data = await response.json();
    products = handleObj(data);
    if (!products || products?.length === 0) {
      products = handleObj(MOCKED_PRODUCTS);
    }

    const {
      brand: { brands },
      category: { categories },
    } = getState();

    const productsWithUpdatedBrandsAndCategories = products.map((product) => {
      const category = categories.find((category) => category.id === product.category.id);
      const brand = brands.find((brand) => brand.id === product.brand.id);

      if (!category && !brand) {
        return product;
      }

      return {
        ...product,
        category: {
          ...category,
          name: category && category.name,
        },
        brand: {
          ...brand,
          name: brand && brand.name,
        },
      };
    }) as Product[];

    return productsWithUpdatedBrandsAndCategories;
  }
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (product: Partial<Product>, { dispatch, rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/products.json`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      dispatch(showAlert({ type: AlertType.Error, message: CREATE_PRODUCT_ERROR_MESSAGE }));
      return rejectWithValue(CREATE_PRODUCT_ERROR_MESSAGE);
    }

    const data: { name: string } = await response.json();

    return { id: data.name, ...product } as Product;
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (product: Product, { dispatch, rejectWithValue }) => {
    const { id, category, description, discount, image, name, brand, price, weight, gender } = product;
    const response = await fetch(`${BASE_URL}/products/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        category,
        description,
        discount,
        image,
        name,
        brand,
        price,
        weight,
        gender,
      }),
    });

    if (!response.ok) {
      dispatch(showAlert({ type: AlertType.Error, message: UPDATE_PRODUCT_ERROR_MESSAGE }));
      return rejectWithValue(UPDATE_PRODUCT_ERROR_MESSAGE);
    }

    const data = await response.json();

    const updatedProduct: Product = {
      id,
      ...data,
    };

    return updatedProduct;
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id: Product['id'], { dispatch, rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/products/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      dispatch(showAlert({ type: AlertType.Error, message: DELETE_PRODUCT_ERROR_MESSAGE }));
      return rejectWithValue(DELETE_PRODUCT_ERROR_MESSAGE);
    }

    return id;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<Product['id']>) => {
      const product = state.products.find((product) => product.id === action.payload);

      if (!product) return;

      state.selectedProduct = product;
    },

    removeSelectedProduct: (state) => {
      state.selectedProduct = initialState.selectedProduct;
    },

    updateAllProductsBrands: (state, action: PayloadAction<Product['brand']>) => {
      state.products = state.products.map((product) => {
        if (product.brand.id === action.payload.id) {
          return {
            ...product,
            brand: action.payload,
          };
        }
        return product;
      });
    },

    updateAllProductsCategories: (state, action: PayloadAction<Product['category']>) => {
      state.products = state.products.map((product) => {
        if (product.category.id === action.payload.id) {
          return {
            ...product,
            category: action.payload,
          };
        }
        return product;
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.products = payload;
      state.isLoading = false;
    });

    builder.addCase(fetchProducts.rejected, (state, { payload }) => {
      state.error = {
        isError: true,
        message: payload as Error['message'],
      };

      state.isLoading = false;
    });

    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createProduct.fulfilled, (state, { payload }) => {
      state.products.push(payload);
      state.isLoading = false;
    });

    builder.addCase(createProduct.rejected, (state, { payload }) => {
      state.error = {
        isError: true,
        message: payload as Error['message'],
      };
      state.isLoading = false;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      const index = state.products.findIndex((product) => product.id === payload.id);
      if (index < 0) return;
      state.products[index] = payload;
      state.isLoading = false;
    });

    builder.addCase(updateProduct.rejected, (state, { payload }) => {
      state.error = {
        isError: true,
        message: payload as Error['message'],
      };
      state.isLoading = false;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      const index = state.products.findIndex((product) => product.id === payload);
      state.products.splice(index, 1);
      state.isLoading = false;
    });

    builder.addCase(deleteProduct.rejected, (state, { payload }) => {
      state.error = {
        isError: true,
        message: payload as Error['message'],
      };
      state.isLoading = false;
    });
  },
});

export const { selectProduct, removeSelectedProduct, updateAllProductsCategories, updateAllProductsBrands } =
  productSlice.actions;

export default productSlice.reducer;
