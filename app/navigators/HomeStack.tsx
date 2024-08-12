import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '@screens/home';
import screenNames from '@common/screensConfig';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={screenNames.HomeStack.Home}>
      <Stack.Screen name={screenNames.HomeStack.Home} component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStack;
