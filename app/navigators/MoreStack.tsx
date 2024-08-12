import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNames from '@common/screensConfig';
import {More} from '@screens/more';

const Stack = createNativeStackNavigator();
const MoreStack = () => {
  return (
    <Stack.Navigator initialRouteName={screenNames.MoreStack.More}>
      <Stack.Screen name={screenNames.MoreStack.More} component={More} />
    </Stack.Navigator>
  );
};

export default MoreStack;
