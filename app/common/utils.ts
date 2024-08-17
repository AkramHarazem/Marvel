import {I18nManager} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {colors} from './colors';
import typo from './typo';

export const showSnack = (
  text: string,
  actionTxt: string,
  color = colors.snackColor,
) => {
  Snackbar.show({
    text,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: color,
    rtl: I18nManager.isRTL,
    textColor: colors.white,
    fontFamily: typo.bold,
    action: {
      text: actionTxt,
      textColor: colors.lightDark,
    },
  });
};
