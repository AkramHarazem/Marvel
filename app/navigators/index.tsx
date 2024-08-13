import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNames from '@common/screensConfig';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {useSelector} from 'react-redux';
import {getToken} from '@selectors/authSelectors';

const Stack = createNativeStackNavigator();
const RootStack = () => {
  const isLoggedIn = useSelector(getToken);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarHidden: true,
      }}
      initialRouteName={
        isLoggedIn
          ? screenNames.RootStack.AppStack
          : screenNames.RootStack.AuthStack
      }>
      <Stack.Screen
        name={screenNames.RootStack.AuthStack}
        component={AuthStack}
      />
      <Stack.Screen
        name={screenNames.RootStack.AppStack}
        component={AppStack}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
