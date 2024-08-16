import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CharacterDetails, Home} from '@screens/home';
import screenNames from '@common/screensConfig';
// import {CharacterDetails} from '@components/home';
import typo from '@common/typo';
import {fontSizes} from '@common/fonts';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  const {t} = useTranslation();
  const currentTheme = useSelector(getCurrentTheme);
  return (
    <Stack.Navigator initialRouteName={screenNames.HomeStack.Home}>
      <Stack.Screen
        name={screenNames.HomeStack.Home}
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={screenNames.HomeStack.CharacterDetails}
        component={CharacterDetails}
        options={{
          headerTitleAlign: 'center',
          headerTitle: t('details'),
          headerTitleStyle: {
            fontFamily: typo.bold,
            fontSize: fontSizes[24],
            color: currentTheme.textColor,
          },
          headerStyle: {backgroundColor: currentTheme.headerBackground},
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
