import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Error, Product } from '../types/common';
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
    },
    description: '',
    image: '',
    name: '',
    price: '',
    weight: '',
    brand: {
      id: '',
      name: '',
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
  async (_, { getState, rejectWithValue, dispatch }) => {
    await dispatch(fetchBrands());
    await dispatch(fetchCategories());

    const response = await fetch(`${BASE_URL}/products.json`);

    if (!response.ok) {
      return rejectWithValue(FETCH_PRODUCTS_ERROR_MESSAGE as Error['message']);
    }

    const data = await response.json();
    const products: Product[] = handleObj(data);

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
  async (product: Partial<Product>, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/products.json`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      return rejectWithValue(CREATE_PRODUCT_ERROR_MESSAGE as Error['message']);
    }

    const data: { name: string } = await response.json();

    return { id: data.name, ...product } as Product;
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (product: Product, { rejectWithValue }) => {
    const { id, category, description, discount, image, name, brand, price, weight } = product;
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
      }),
    });

    if (!response.ok) {
      return rejectWithValue(UPDATE_PRODUCT_ERROR_MESSAGE as Error['message']);
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
  async (id: Product['id'], { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/products/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      return rejectWithValue(DELETE_PRODUCT_ERROR_MESSAGE as Error['message']);
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

    resetProductError: (state) => {
      state.error = initialState.error;
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

    builder.addCase(fetchProducts.rejected, (state, action) => {
      if (action.payload) {
        state.error = {
          isError: true,
          message: action.payload as string,
        };
      }
      state.isLoading = false;
    });

    builder.addCase(createProduct.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(createProduct.fulfilled, (state, { payload }) => {
      state.products.push(payload);
      state.isLoading = false;
    });

    builder.addCase(createProduct.rejected, (state, action) => {
      if (action.payload) {
        state.error = {
          isError: true,
          message: action.payload as string,
        };
      }
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

    builder.addCase(updateProduct.rejected, (state, action) => {
      if (action.payload) {
        state.error = {
          isError: true,
          message: action.payload as string,
        };
      }
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

    builder.addCase(deleteProduct.rejected, (state, action) => {
      if (action.payload) {
        state.error = {
          isError: true,
          message: action.payload as string,
        };
      }
      state.isLoading = false;
    });
  },
});

export const {
  selectProduct,
  removeSelectedProduct,
  updateAllProductsCategories,
  updateAllProductsBrands,
  resetProductError,
} = productSlice.actions;

export default productSlice.reducer;
