import i18n, {Resource} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager, NativeModules, Platform} from 'react-native';
import RNRestart from 'react-native-restart';
import ar from './translations/ar.json';
import en from './translations/en.json';
import {AppDispatch, persist} from '@store/index';
import {languageChanged} from '@slices/appSettingsSlices';

export const SUPPORTED_LANGUAGES = {
  en: 'en',
  ar: 'ar',
} as const;

export const defaultLanguage = SUPPORTED_LANGUAGES.en;

const RTL_LANGUAGES = ['ar'];

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

const isRTL = (language: string) => RTL_LANGUAGES.includes(language);
const shouldChangeLayout = (language: string) =>
  I18nManager.isRTL !== isRTL(language);

export const detectDeviceLanguage = (): SupportedLanguage => {
  const deviceLocale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager.localeIdentifier;

  const deviceLanguage = deviceLocale.substring(0, 2).toLowerCase();
  return Object.keys(SUPPORTED_LANGUAGES).includes(deviceLanguage)
    ? deviceLanguage
    : SUPPORTED_LANGUAGES.en;
};

const resources: {[key in SupportedLanguage]: Resource} = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

export const languageChangedFunc = async (
  language: SupportedLanguage,
  dispatch: AppDispatch,
) => {
  if (i18n.language === language) {
    return;
  }
  dispatch(languageChanged(language));
  if (shouldChangeLayout(language)) {
    I18nManager.forceRTL(isRTL(language));
    I18nManager.allowRTL(isRTL(language));
    await persist();
    setTimeout(() => {
      RNRestart.Restart();
    }, 200);
  }
};

export const initI18n = (lng: SupportedLanguage) => {
  i18n.use(initReactI18next).init({
    lng,
    resources,
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });
};
export default i18n;
