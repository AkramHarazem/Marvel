import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNames from '@common/screensConfig';
import {More} from '@screens/more';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';
import typo from '@common/typo';
import {fontSizes} from '@common/fonts';

const Stack = createNativeStackNavigator();
const MoreStack = () => {
  const {t} = useTranslation();
  const currentTheme = useSelector(getCurrentTheme);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: t('more'),
        headerTitleStyle: {
          fontFamily: typo.bold,
          fontSize: fontSizes[24],
          color: currentTheme.textColor,
        },
        headerStyle: {backgroundColor: currentTheme.headerBackground},
      }}
      initialRouteName={screenNames.MoreStack.More}>
      <Stack.Screen name={screenNames.MoreStack.More} component={More} />
    </Stack.Navigator>
  );
};

export default MoreStack;
