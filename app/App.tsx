import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {colors} from '@common/colors';
import store, {persistor} from './store';
import {PersistGateWithContext} from '@components/PersistGateWithContext';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView
      style={StyleSheet.flatten([
        styles.provider,
        {
          backgroundColor: isDarkMode ? colors.black : colors.white,
        },
      ])}>
      <SafeAreaProvider
        style={StyleSheet.flatten([
          styles.provider,
          {
            backgroundColor: isDarkMode ? colors.black : colors.white,
          },
        ])}>
        <SafeAreaView
          style={StyleSheet.flatten([
            styles.provider,
            {
              backgroundColor: isDarkMode ? colors.black : colors.white,
            },
          ])}>
          <Provider store={store}>
            <PersistGateWithContext persistor={persistor} />
          </Provider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  provider: {
    flex: 1,
    height: '100%',
  },
});

export default App;
