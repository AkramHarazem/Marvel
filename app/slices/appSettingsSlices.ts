import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

type SettingsState = {
  currentTheme: {
    theme?: string;
    containerBackgroundColor?: string;
    containerViewColor?: string;
    textColor?: string;
    switchButtonBackgroundColor?: string;
  };
};

const initialState: SettingsState = {
  currentTheme: {},
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCurrentTheme(state, action: PayloadAction<object>) {
      state.currentTheme = action.payload;
    },
  },
});

export const {setCurrentTheme} = settingsSlice.actions;
export const appSettingsReduce = settingsSlice.reducer;
