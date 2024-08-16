import {NavigationProp, useNavigation} from '@react-navigation/native';

const screenNames = {
  RootStack: {
    AuthStack: 'AuthStack',
    AppStack: 'AppStack',
  },
  AuthStack: {
    Login: 'Login',
  },
  AppStack: {
    HomeStack: 'HomeStack',
    ProfileStack: 'ProfileStack',
    MoreStack: 'MoreStack',
  },
  HomeStack: {
    Home: 'Home',
    CharacterDetails: 'CharacterDetails',
  },
  ProfileStack: {
    Profile: 'Profile',
  },
  MoreStack: {
    More: 'More',
  },
} as const;
export type paramsTypes = {
  id?: number;
};

export type MainParamList = {
  [screenNames.RootStack.AppStack]: paramsTypes | undefined;
  [screenNames.RootStack.AuthStack]: paramsTypes | undefined;
};
export type HomeParamList = {
  [screenNames.HomeStack.CharacterDetails]: paramsTypes | undefined;
};
export const useMainNavigation = () => {
  return useNavigation<NavigationProp<MainParamList>>();
};

export const useHomeNavigation = () => {
  return useNavigation<NavigationProp<HomeParamList>>();
};

export default screenNames;
