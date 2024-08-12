import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNames from '@common/screensConfig';
import {Profile} from '@screens/profile';

const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName={screenNames.ProfileStack.Profile}>
      <Stack.Screen
        name={screenNames.ProfileStack.Profile}
        component={Profile}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
