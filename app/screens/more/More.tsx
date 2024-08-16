import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';
import {language, login, profile, theme} from '@assets';
import {getToken} from '@selectors/authSelectors';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import {AppTab, OptionsModal} from '@components/common';
import useHandleAppSettings from '@hooks/useHandleAppSettings';
import useHandleLogout from '@hooks/useHandleLogout';

const More = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const isLoggedIn = useSelector(getToken);
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsName, setOptionsName] = useState<string>('');

  const {options, handlePress, selectedOption} = useHandleAppSettings({
    optionsName,
    setModalVisible,
    modalVisible,
  });

  const {handleLogOut} = useHandleLogout();

  const handleOpenModal = useCallback((val: string) => {
    switch (val) {
      case 'theme':
        setOptionsName('theme');
        break;
      case 'language':
        setOptionsName('language');
        break;
    }
    setModalVisible(true);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: currentTheme.containerBackgroundColor},
      ]}>
      <AppTab
        image={theme}
        label={'theme'}
        onPress={() => handleOpenModal('theme')}
      />
      <AppTab
        image={language}
        label={'language'}
        onPress={() => handleOpenModal('language')}
      />
      {isLoggedIn ? (
        <AppTab image={profile} label={'sign_out'} onPress={handleLogOut} />
      ) : (
        <AppTab image={login} label={'sign_in'} onPress={() => {}} />
      )}
      <OptionsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        options={options}
        handlePress={handlePress}
        selectedOption={selectedOption}
      />
    </ScrollView>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateVerticalScale(35),
  },
});
