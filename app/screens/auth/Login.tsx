import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Controller, FieldValues, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import {fontSizes} from '@common/fonts';
import {colors} from '@common/colors';
import typo from '@common/typo';
import AppTextInput from '@components/common/AppTexTInput';
import {AppButton, AppText} from '@components/common';
import {BUTTON_TYPES} from '@components/common/AppButton';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';
import {LoginCarousel} from '@components/auth';
import {useNavigation} from '@react-navigation/native';
import screenNames from '@common/screensConfig';
import {setToken} from '@slices/authSlices';
import {logo} from '@assets';

const Login = () => {
  const {t} = useTranslation();
  const currentTheme = useSelector(getCurrentTheme);
  const passwordRef = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    resetField,
    formState: {errors, isValid},
  } = useForm<FieldValues>({
    mode: 'onTouched',
    defaultValues: {
      userName: '',
      password: '',
    },
  });

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    await sleep(2000); //simulate login api
    if (
      (data?.userName.trim() === 'akram' ||
        data?.userName.trim() === 'Akram') &&
      data?.password.trim() === 'Akram@123'
    ) {
      reset();
      setError('');
      dispatch(setToken('marvel123456789'));
      navigation.reset({
        index: 0,
        routes: [{name: screenNames.RootStack.AppStack}],
      });
    } else {
      setError('invalid_username_or_password');
    }
    setIsLoading(false);
  };

  const onFocus = () => {
    setError('');
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="position"
      contentContainerStyle={{
        flex: 1,
      }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.container,
          {
            backgroundColor: currentTheme.containerBackgroundColor,
            paddingBottom: insets.bottom + moderateVerticalScale(16),
          },
        ]}>
        <View style={styles.logoContainer}>
          <Image style={styles.logoStyle} source={logo} />
        </View>
        <AppText style={styles.txtStyle}>
          login_to_see_your_favorites_heros
        </AppText>
        <LoginCarousel />
        <View style={styles.btnInputContainer}>
          <Controller
            control={control}
            name="userName"
            rules={{
              required: 'user_name_is_required',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AppTextInput
                onChangeText={onChange}
                value={value}
                resetValue={() => resetField('userName')}
                placeholder={t('enter_your_user_name')}
                label={'user_name'}
                error={errors.userName?.message?.toString()}
                onBlur={onBlur}
                onFocus={onFocus}
                autoComplete="username"
                returnKeyType="done"
                returnKeyLabel={t('next')}
                onSubmitEditing={() => passwordRef?.current?.focus()}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'password_is_required',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AppTextInput
                value={value}
                ref={passwordRef}
                onChangeText={onChange}
                label={'password'}
                placeholder={t('enter_your_password')}
                secureTextEntry
                error={errors.password?.message?.toString()}
                onBlur={onBlur}
                onFocus={onFocus}
                autoComplete="password"
                returnKeyType="done"
                returnKeyLabel={t('done')}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
          />

          {error && <AppText style={styles.errorTxt}>{error}</AppText>}
          <AppButton
            type={isValid ? BUTTON_TYPES.PRIMARY : BUTTON_TYPES.DISABLED}
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}>
            login
          </AppButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateVerticalScale(55),
    paddingHorizontal: moderateScale(24),
    flex: 1,
    gap: moderateVerticalScale(14),
  },
  logoContainer: {
    width: moderateScale(200),
    height: moderateScale(80),
    alignSelf: 'center',
  },
  logoStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  txtStyle: {
    fontFamily: typo.semiBold,
    fontSize: fontSizes[22],
    textAlign: 'center',
    maxWidth: moderateScale(250),
    alignSelf: 'center',
  },
  btnInputContainer: {
    gap: moderateVerticalScale(16),
    alignItems: 'center',
    width: '100%',
  },
  errorTxt: {
    color: colors.error,
    fontSize: fontSizes[12],
    fontFamily: typo.regular,
    textAlign: 'center',
  },
});
