import screenNames, {useMainNavigation} from '@common/screensConfig';
import {showSnack} from '@common/utils';
import {api} from '@services/api';
import {resetToken} from '@slices/authSlices';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-native';
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
    showSnack(t('you_sign_out_successfully'), t('dismiss'));
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
