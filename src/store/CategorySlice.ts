import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { AlertType, Category, Error } from '../types/common';
import { handleObj } from '../utils/helpers';
import {
  CREATE_CATEGORY_ERROR_MESSAGE,
  DELETE_CATEGORY_ERROR_MESSAGE,
  FETCH_CATEGORIES_ERROR_MESSAGE,
  UPDATE_CATEGORY_ERROR_MESSAGE,
} from '../constants/messages';
import { showAlert } from './CommonSlice';
import MOCKED_CATEGORIES from '../mocks/categories.json';

export type CategoryState = {
  categories: Category[];
  selectedCategory: Category;
  isLoading: boolean;
  error: Error;
};

const initialState: CategoryState = {
  categories: [],
  selectedCategory: {
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

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { dispatch, rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/categories.json`);

    if (!response.ok) {
      dispatch(showAlert({ type: AlertType.Error, message: FETCH_CATEGORIES_ERROR_MESSAGE }));
      return rejectWithValue(FETCH_CATEGORIES_ERROR_MESSAGE);
    }

    const data = await response.json();
    const categories: Category[] = handleObj(data);

    if (categories.length < 2) {
      const mockedCategories: Category[] = handleObj(MOCKED_CATEGORIES);
      return mockedCategories;
    }
    return categories;
  }
);

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (category: Partial<Category>, { dispatch, rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/categories.json`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      dispatch(showAlert({ type: AlertType.Error, message: CREATE_CATEGORY_ERROR_MESSAGE }));
      return rejectWithValue(CREATE_CATEGORY_ERROR_MESSAGE);
    }

    const data: { name: string } = await response.json();
    return { id: data.name, ...category } as Category;
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (category: Category, { dispatch, rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/categories/${category.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: category.name,
        description: category.description,
        url: category.url,
      }),
    });

    if (!response.ok) {
      dispatch(showAlert({ type: AlertType.Error, message: UPDATE_CATEGORY_ERROR_MESSAGE }));
      return rejectWithValue(UPDATE_CATEGORY_ERROR_MESSAGE);
    }

    const data = await response.json();
    const updatedCategory: Category = {
      id: category.id,
      ...data,
    };
    return updatedCategory;
  }
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id: Category['id'], { dispatch, rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/categories/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      dispatch(showAlert({ type: AlertType.Error, message: DELETE_CATEGORY_ERROR_MESSAGE }));
      return rejectWithValue(DELETE_CATEGORY_ERROR_MESSAGE);
    }

    return id;
  }
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<Category['id']>) => {
      const category = state.categories.find((category) => category.id === action.payload);

      if (!category) return;

      state.selectedCategory = category;
    },

    removeSelectedCategory: (state) => {
      state.selectedCategory = initialState.selectedCategory;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
      state.isLoading = false;
    });

    builder.addCase(fetchCategories.rejected, (state, { payload }) => {
      state.error = {
        isError: true,
        message: payload as Error['message'],
      };
      state.isLoading = false;
    });

    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      state.categories.push(payload);
      state.isLoading = false;
    });

    builder.addCase(createCategory.rejected, (state, { payload }) => {
      state.error = {
        isError: true,
        message: payload as Error['message'],
      };
      state.isLoading = false;
    });

    builder.addCase(updateCategory.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateCategory.fulfilled, (state, { payload }) => {
      const index = state.categories.findIndex((category) => category.id === payload.id);
      if (index < 0) return;
      state.categories[index] = payload;
      state.isLoading = false;
    });

    builder.addCase(updateCategory.rejected, (state, { payload }) => {
      state.error = {
        isError: true,
        message: payload as Error['message'],
      };
      state.isLoading = false;
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
      const index = state.categories.findIndex((category) => category.id === payload);
      state.categories.splice(index, 1);
      state.isLoading = false;
    });

    builder.addCase(deleteCategory.rejected, (state, { payload }) => {
      state.error = {
        isError: true,
        message: payload as Error['message'],
      };
      state.isLoading = false;
    });
  },
});

export const { selectCategory, removeSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
