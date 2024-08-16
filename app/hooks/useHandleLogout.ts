import screenNames, {useMainNavigation} from '@common/screensConfig';
import {api} from '@services/api';
import {resetToken} from '@slices/authSlices';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

const useHandleLogout = () => {
  const dispatch = useDispatch();
  const navigation = useMainNavigation();
  const handleLogOut = useCallback(() => {
    dispatch(resetToken());
    dispatch(api.util.resetApiState());
    navigation.reset({
      index: 0,
      routes: [{name: screenNames.RootStack.AuthStack}],
    });
  }, []);
  return {handleLogOut};
};

export default useHandleLogout;
