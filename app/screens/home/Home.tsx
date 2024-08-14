import {AppText} from '@components/common';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import {useSelector} from 'react-redux';

const Home = () => {
  const currentTheme = useSelector(getCurrentTheme);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: currentTheme.containerBackgroundColor},
      ]}>
      <AppText>home</AppText>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateVerticalScale(35),
  },
});
