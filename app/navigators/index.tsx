import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNames from '@common/screensConfig';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();
const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName={screenNames.RootStack.AppStack}>
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
