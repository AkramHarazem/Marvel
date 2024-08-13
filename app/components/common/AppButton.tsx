import {colors} from '@common/colors';
import {fontSizes} from '@common/fonts';
import typo from '@common/typo';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import AppText from './AppText';

export const BUTTON_TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  DISABLED: 'disabled',
} as const;

export type AppButtonProps = TouchableOpacityProps & {
  type?: (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];
  isLoading?: boolean;
  textStyle?: TextProps['style'];
  underline?: boolean;
  shouldTranslate?: boolean;
};

function AppButton({
  onPress,
  type = 'primary',
  isLoading = false,
  style = {},
  textStyle = {},
  underline = false,
  disabled = false,
  activeOpacity = 0.5,
  shouldTranslate,
  children,
}: AppButtonProps) {
  return (
    <TouchableOpacity
      style={[styles[type], style]}
      onPress={onPress}
      disabled={isLoading || type === 'disabled' || disabled}
      activeOpacity={activeOpacity}
      testID={`button-${type}`}>
      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={type === 'tertiary' ? colors.red : colors.white}
          testID={'activity-indicator'}
        />
      ) : (
        <AppText
          style={[
            styles[`${type}Txt`] || styles.btnTxt,
            textStyle,
            underline && styles.underline,
          ]}
          shouldTranslate={shouldTranslate}>
          {children}
        </AppText>
      )}
    </TouchableOpacity>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  primary: {
    width: '100%',
    height: moderateVerticalScale(50),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
    alignSelf: 'center',
    maxWidth: moderateScale(400),
  },
  secondary: {
    width: '100%',
    height: moderateVerticalScale(50),
    borderRadius: moderateScale(10),
    borderWidth: 1.5,
    borderColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: moderateScale(400),
  },
  tertiary: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: moderateScale(400),
  },
  disabled: {
    width: '100%',
    height: moderateVerticalScale(50),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorWithAlpha('red', 0.5),
    alignSelf: 'center',
    maxWidth: moderateScale(400),
  },
  btnTxt: {
    fontSize: fontSizes[16],
    color: colors.white,
    fontFamily: typo.semiBold,
  },
  primaryTxt: {
    fontSize: fontSizes[16],
    color: colors.white,
    fontFamily: typo.semiBold,
  },
  secondaryTxt: {
    fontSize: fontSizes[16],
    color: colors.red,
    fontFamily: typo.semiBold,
  },
  tertiaryTxt: {
    fontSize: fontSizes[16],
    color: colors.black,
    fontFamily: typo.semiBold,
  },
  disabledTxt: {
    fontSize: fontSizes[16],
    color: colors.white,
    fontFamily: typo.semiBold,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
