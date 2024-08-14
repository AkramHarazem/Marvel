import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Appearance,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {Dispatch, SetStateAction, useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentTheme} from '@slices/appSettingsSlices';
import {colors, darkTheme, lightTheme} from '@common/colors';
import {
  getCurrentLanguage,
  getCurrentTheme,
} from '@selectors/appSettingsSelectors';
import {languageChangedFunc} from 'app/locales';
import RadioButton from './RadioButton';
import AppText from './AppText';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import typo from '@common/typo';
import {fontSizes} from '@common/fonts';

type ModalProps = {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  optionsName?: string;
  modalVisible?: boolean;
};
const themeOptions = ['light', 'dark', 'system_default'];
const languageOptions = ['en', 'ar'];

const OptionsModal = ({
  modalVisible,
  setModalVisible,
  optionsName,
}: ModalProps) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(getCurrentTheme);
  const language = useSelector(getCurrentLanguage);
  const options = optionsName === 'theme' ? themeOptions : languageOptions;

  const selectedOption = useMemo(
    () =>
      optionsName === 'theme'
        ? currentTheme?.system
          ? 'system_default'
          : currentTheme.theme
        : language,
    [optionsName, language, currentTheme],
  );

  const handleSwitch = useCallback((theme: string) => {
    const colorScheme = Appearance.getColorScheme();
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
      case 'system_default':
        dispatch(
          setCurrentTheme(
            colorScheme === 'light'
              ? {...lightTheme, theme: 'light', system: true}
              : {...darkTheme, theme: 'dark', system: true},
          ),
        );
        StatusBar.setBarStyle(
          colorScheme === 'light' ? 'dark-content' : 'light-content',
        );
        StatusBar.setBackgroundColor(
          colorScheme === 'light' ? colors.white : colors.black,
        );
        break;
    }
  }, []);

  const changeLang = useCallback((val: string) => {
    languageChangedFunc(val, dispatch);
  }, []);

  const handlePress = useCallback(
    (option: string) => {
      if (optionsName === 'theme') {
        handleSwitch(option);
      } else {
        changeLang(option);
      }
      setModalVisible(!modalVisible);
    },
    [optionsName, modalVisible, handleSwitch, changeLang, setModalVisible],
  );

  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={0.3}
      onBackButtonPress={() => {
        setModalVisible(!modalVisible);
      }}
      onBackdropPress={() => {
        setModalVisible(!modalVisible);
      }}
      style={[styles.centeredView]}>
      <View
        style={[
          styles.modalView,
          {backgroundColor: currentTheme.tabBackground},
        ]}>
        {options.map(item => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handlePress(item)}>
            <RadioButton selected={item === selectedOption} />
            <AppText style={styles.txtStyle}>{item}</AppText>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

export default OptionsModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    borderRadius: moderateScale(20),
    paddingVertical: moderateVerticalScale(40),
    paddingHorizontal: moderateScale(30),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: moderateVerticalScale(40),
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  txtStyle: {
    fontFamily: typo.semiBold,
    fontSize: fontSizes[16],
  },
});
