import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';
import {useTranslation} from 'react-i18next';
import {resetToken} from '@slices/authSlices';
import {useNavigation} from '@react-navigation/native';
import screenNames from '@common/screensConfig';
import {MoreButton} from '@components/more';
import {language, login, profile, theme} from '@assets';
import {getToken} from '@selectors/authSelectors';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import {OptionsModal} from '@components/common';

const More = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const currentTheme = useSelector(getCurrentTheme);
  const navigation = useNavigation();
  const isLoggedIn = useSelector(getToken);
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsName, setOptionsName] = useState<string>('');

  const handleLogOut = useCallback(() => {
    dispatch(resetToken());
    navigation.reset({
      index: 0,
      routes: [{name: screenNames.RootStack.AuthStack}],
    });
  }, []);

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
      <MoreButton
        image={theme}
        label={t('theme')}
        onPress={() => handleOpenModal('theme')}
      />
      <MoreButton
        image={language}
        label={t('language')}
        onPress={() => handleOpenModal('language')}
      />
      {isLoggedIn ? (
        <MoreButton
          image={profile}
          label={t('sign_out')}
          onPress={handleLogOut}
        />
      ) : (
        <MoreButton image={login} label={t('sign_in')} onPress={() => {}} />
      )}
      <OptionsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        optionsName={optionsName}
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
