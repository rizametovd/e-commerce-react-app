import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { Alert, AlertType } from '../types/common';
import { wait } from '../utils/helpers';

export type CommonState = {
  alert: Alert;
};

const initialState: CommonState = {
  alert: {
    isAction: false,
    type: AlertType.Info,
    message: '',
  },
};

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
});

export const { setAlert, hideAlert } = commonSlice.actions;

export default commonSlice.reducer;
