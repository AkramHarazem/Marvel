import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNames from '@common/screensConfig';
import {Login} from '@screens/auth';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={screenNames.AuthStack.Login}>
      <Stack.Screen name={screenNames.AuthStack.Login} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
