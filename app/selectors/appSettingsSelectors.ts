import {RootState} from '@store/index';

export const getCurrentTheme = (state: RootState) =>
  state.settings.currentTheme;

export const getCurrentLanguage = (state: RootState) => state.settings.language;
