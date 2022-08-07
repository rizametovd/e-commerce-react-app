import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { Alert, AlertType } from '../types/common';

export type CommonState = {
  alert: Alert;
};

const initialState: CommonState = {
  alert: {
    type: AlertType.Info,
    message: '',
  },
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<Alert>) => {
      state.alert = action.payload;
    },

    hideAlert: (state) => {
      state.alert = initialState.alert;
    },
  },
});

export const { showAlert, hideAlert } = commonSlice.actions;

export default commonSlice.reducer;
