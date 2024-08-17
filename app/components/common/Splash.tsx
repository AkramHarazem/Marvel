import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import AppText from './AppText';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import {logo} from '@assets';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';

const Splash = () => {
  const currentTheme = useSelector(getCurrentTheme);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: currentTheme.containerBackgroundColor},
      ]}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.sponsorContainer}>
        <AppText>sponsored_by</AppText>
        <Image source={logo} style={styles.sponsor} />
      </View>
    </View>
  );
};
export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: moderateVerticalScale(18),
  },
  logo: {
    width: 170,
    height: 68,
  },
  sponsorContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: moderateVerticalScale(35),
  },
  sponsor: {
    width: moderateScale(90),
    height: moderateScale(30),
    resizeMode: 'contain',
  },
});
