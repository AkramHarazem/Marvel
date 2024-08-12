import React from 'react';
import {Button, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors, darkTheme, lightTheme} from '@common/colors';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';
import {setCurrentTheme} from '@slices/appSettingsSlices';

const More = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(getCurrentTheme);

  const handleSwitch = (theme: 'dark' | 'light' | 'system') => {
    switch (theme) {
      case 'dark':
        dispatch(setCurrentTheme({...darkTheme, theme: 'dark'}));
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor(colors.black);
        break;
      case 'light':
        dispatch(setCurrentTheme({...lightTheme, theme: 'light'}));
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor(colors.white);
        break;
      case 'system':
        dispatch(setCurrentTheme({}));
        break;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: currentTheme.containerBackgroundColor},
      ]}>
      <Button title="Light Mode" onPress={() => handleSwitch('light')} />
      <Button title="Dark Mode" onPress={() => handleSwitch('dark')} />
      <Button title="System Default" onPress={() => handleSwitch('system')} />
      <Text style={[styles.text, {color: currentTheme.textColor}]}>More</Text>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});
