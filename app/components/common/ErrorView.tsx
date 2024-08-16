import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import AppButton from './AppButton';
import typo from '@common/typo';
import {fontSizes} from '@common/fonts';
import AppText from './AppText';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';

type ErrorViewTypes = {
  children: ReactNode;
  hasError: boolean;
  onRetry: () => void;
  error?: string;
};

const ErrorView = ({children, hasError, onRetry, error}: ErrorViewTypes) => {
  const currentTheme = useSelector(getCurrentTheme);
  return hasError ? (
    <View
      style={[
        styles.container,
        {backgroundColor: currentTheme.containerBackgroundColor},
      ]}>
      <View style={styles.oopsContainer}>
        <AppText style={styles.oops}>oops</AppText>
        <AppText style={styles.wentWrong}>
          {error || 'something_went_wrong'}
        </AppText>
      </View>
      <AppButton onPress={onRetry}>try_again</AppButton>
    </View>
  ) : (
    children
  );
};

export default ErrorView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(50),
  },
  someThingWentWrong: {
    fontFamily: typo.semiBold,
    fontSize: fontSizes[18],
    paddingBottom: moderateVerticalScale(25),
  },
  oopsContainer: {
    paddingBottom: moderateVerticalScale(24),
    gap: moderateVerticalScale(10),
  },
  oops: {
    fontFamily: typo.bold,
    textAlign: 'center',
    fontSize: fontSizes[24],
  },
  wentWrong: {
    textAlign: 'center',
    fontSize: fontSizes[18],
  },
});
