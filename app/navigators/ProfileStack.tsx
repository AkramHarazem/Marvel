import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNames from '@common/screensConfig';
import {Profile} from '@screens/profile';
import {useTranslation} from 'react-i18next';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';
import {useSelector} from 'react-redux';
import typo from '@common/typo';
import {fontSizes} from '@common/fonts';

const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  const {t} = useTranslation();
  const currentTheme = useSelector(getCurrentTheme);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: t('profile'),
        headerTitleStyle: {
          fontFamily: typo.bold,
          fontSize: fontSizes[24],
          color: currentTheme.textColor,
        },
        headerStyle: {backgroundColor: currentTheme.headerBackground},
      }}
      initialRouteName={screenNames.ProfileStack.Profile}>
      <Stack.Screen
        name={screenNames.ProfileStack.Profile}
        component={Profile}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
