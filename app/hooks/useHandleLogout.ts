import {colors} from '@common/colors';
import screenNames, {useMainNavigation} from '@common/screensConfig';
import typo from '@common/typo';
import {api} from '@services/api';
import {resetToken} from '@slices/authSlices';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, I18nManager} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {useDispatch} from 'react-redux';

const useHandleLogout = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const navigation = useMainNavigation();
  const logout = useCallback(() => {
    dispatch(resetToken());
    navigation.reset({
      index: 0,
      routes: [{name: screenNames.RootStack.AuthStack}],
    });
    Snackbar.show({
      text: t('you_sign_out_successfully'),
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: colors.snackColor,
      rtl: I18nManager.isRTL,
      textColor: colors.white,
      fontFamily: typo.bold,
      action: {
        text: t('dismiss'),
        textColor: colors.lightDark,
      },
    });
    dispatch(api.util.resetApiState());
  }, []);
  const handleLogOut = useCallback(() => {
    Alert.alert(t('sign_out'), t('sure_logout'), [
      {
        text: t('cancel'),
        style: 'cancel',
      },
      {
        text: t('confirm'),
        onPress: logout,
        style: 'destructive',
      },
    ]);
  }, []);

  return {handleLogOut};
};

export default useHandleLogout;
