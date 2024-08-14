import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import screenNames from '@common/screensConfig';
import MoreStack from './MoreStack';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import {fontSizes} from '@common/fonts';
import typo from '@common/typo';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';
import {TabButton} from '@components/common';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  const {t} = useTranslation();
  const currentTheme = useSelector(getCurrentTheme);

  return (
    <Tab.Navigator
      id="AppStack"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          ...styles.tabBarLabelStyle,
          color: currentTheme.textColor,
        },
        tabBarStyle: {
          ...styles.tabBarStyle,
          backgroundColor: currentTheme.headerBackground,
        },
        tabBarItemStyle: styles.tabBarItemStyle,
        lazy: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={screenNames.AppStack.HomeStack}
        component={HomeStack}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: t('home'),
          tabBarButton: props => <TabButton {...props} name={'home'} />,
        }}
      />

      <Tab.Screen
        name={screenNames.AppStack.ProfileStack}
        component={ProfileStack}
        options={{
          tabBarLabel: t('profile'),
          tabBarButton: props => <TabButton {...props} name={'profile'} />,
        }}
      />

      <Tab.Screen
        name={screenNames.AppStack.MoreStack}
        component={MoreStack}
        options={{
          tabBarLabel: t('more'),
          tabBarButton: props => <TabButton {...props} name={'more'} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: fontSizes[11],
    fontFamily: typo.semiBold,
  },
  tabBarIcon: {
    width: moderateScale(17),
    height: moderateScale(19),
    resizeMode: 'contain',
  },
  tabBarStyle: {
    position: 'absolute',
    height: moderateVerticalScale(55),
    bottom: moderateVerticalScale(12),
    right: moderateScale(12),
    left: moderateScale(12),
    borderRadius: moderateScale(12),
  },
  tabBarItemStyle: {
    height: moderateVerticalScale(46),
  },
});
