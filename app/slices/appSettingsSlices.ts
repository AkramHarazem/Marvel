import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {detectDeviceLanguage, SupportedLanguage} from 'app/locales';
import {PURGE} from 'redux-persist';

type SettingsState = {
  currentTheme: {
    theme?: string;
    containerBackgroundColor?: string;
    containerViewColor?: string;
    textColor?: string;
    switchButtonBackgroundColor?: string;
    focusInput?: string;
  };
  language: SupportedLanguage;
};

const initialState: SettingsState = {
  currentTheme: {},
  language: detectDeviceLanguage(),
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    languageChanged(state, action: PayloadAction<SupportedLanguage>) {
      state.language = action.payload;
    },
    setCurrentTheme(state, action: PayloadAction<object>) {
      state.currentTheme = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, state => {
      state.language = initialState.language;
    });
  },
});

export const {languageChanged, setCurrentTheme} = settingsSlice.actions;
export const appSettingsReduce = settingsSlice.reducer;
