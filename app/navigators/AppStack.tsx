import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import screenNames from '@common/screensConfig';
import MoreStack from './MoreStack';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator
      id="AppStack"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        lazy: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name={screenNames.AppStack.HomeStack}
        component={HomeStack}
        // options={{
        //   tabBarButton: props => (
        //     <TabBarButton {...props} item={{imageSource: home, name: 'home'}} />
        //   ),
        // }}
      />

      <Tab.Screen
        name={screenNames.AppStack.ProfileStack}
        component={ProfileStack}
        // options={{
        //   tabBarButton: props => (
        //     <TabBarButton
        //       {...props}
        //       item={{imageSource: profile, name: 'profile'}}
        //     />
        //   ),
        // }}
      />

      <Tab.Screen
        name={screenNames.AppStack.MoreStack}
        component={MoreStack}
        // options={{
        //   tabBarButton: props => (
        //     <TabBarButton {...props} item={{imageSource: more, name: 'more'}} />
        //   ),
        // }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  tabBarStyle: {elevation: 0, shadowOpacity: 0},
});
