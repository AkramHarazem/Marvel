import {colors, darkTheme, lightTheme} from '@common/colors';
import {
  getCurrentLanguage,
  getCurrentTheme,
} from '@selectors/appSettingsSelectors';
import {setCurrentTheme} from '@slices/appSettingsSlices';
import {languageChangedFunc} from 'app/locales';
import {useCallback, useMemo} from 'react';
import {Appearance, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type HandleAppSettingsProps = {
  setModalVisible: (arg: boolean) => void;
  optionsName?: string;
  modalVisible?: boolean;
};
const themeOptions = ['light', 'dark', 'system_default'];
const languageOptions = ['en', 'ar'];

const useHandleAppSettings = ({
  optionsName,
  setModalVisible,
  modalVisible,
}: HandleAppSettingsProps) => {
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

  return {
    options,
    handlePress,
    selectedOption,
  };
};
export default useHandleAppSettings;
