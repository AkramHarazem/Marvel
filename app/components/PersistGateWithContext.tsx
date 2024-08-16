import React, {PropsWithChildren, useCallback, useEffect} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Persistor} from 'redux-persist';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import RootStack from '@navigators/index';
import {StatusBar, useColorScheme} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCurrentLanguage,
  getCurrentTheme,
} from '@selectors/appSettingsSelectors';
import {colors, darkTheme, lightTheme} from '@common/colors';
import {setCurrentTheme} from '@slices/appSettingsSlices';
import {initI18n} from 'app/locales';

export const PersistGateWithContext = ({
  persistor,
}: PropsWithChildren<{persistor: Persistor}>) => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const currentTheme = useSelector(getCurrentTheme);
  const currentLang = useSelector(getCurrentLanguage);

  useEffect(() => {
    if (!currentTheme?.theme) {
      const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
      dispatch(setCurrentTheme({...theme, theme: colorScheme, system: true}));
    }
  }, [currentTheme, colorScheme, dispatch]);

  const hideSplash = useCallback(() => {
    BootSplash.hide({fade: true});
  }, []);

  const onBeforeLift = useCallback(async () => {
    hideSplash();
    initI18n(currentLang);
  }, [hideSplash, currentLang]);

  return (
    <PersistGate
      loading={null}
      persistor={persistor}
      onBeforeLift={onBeforeLift}>
      <StatusBar
        barStyle={
          (currentTheme?.theme || colorScheme)?.includes('light')
            ? 'dark-content'
            : 'light-content'
        }
        backgroundColor={
          (currentTheme?.theme || colorScheme)?.includes('dark')
            ? colors.black
            : colors.white
        }
      />
      <NavigationContainer
        theme={
          (currentTheme?.theme || colorScheme)?.includes('dark')
            ? DarkTheme
            : DefaultTheme
        }>
        <RootStack />
      </NavigationContainer>
    </PersistGate>
  );
};
