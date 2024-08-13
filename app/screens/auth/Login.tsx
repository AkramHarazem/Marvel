import {StyleSheet, TextInput, View} from 'react-native';
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
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';

const Login = () => {
  const {t} = useTranslation();
  const currentTheme = useSelector(getCurrentTheme);
  const passwordRef = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const insets = useSafeAreaInsets();

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
    await sleep(2000);
    if (
      (data?.userName === 'akram' || data?.userName === 'Akram') &&
      data?.password === 'Akram@123'
    ) {
      reset();
      setError('');
    } else {
      setError('invalid_username_or_password');
    }
    setIsLoading(false);
  };

  const onFocus = () => {
    setError('');
  };
  console.log(
    'containerBackgroundColor',
    currentTheme.containerBackgroundColor,
  );
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: currentTheme.containerBackgroundColor,
          paddingBottom: insets.bottom + moderateVerticalScale(16),
        },
      ]}>
      <View style={[styles.alignCenter]}>
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
      </View>
    </ScrollView>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    paddingTop: moderateVerticalScale(48),
    paddingBottom: moderateVerticalScale(16),
    paddingHorizontal: moderateScale(24),
    justifyContent: 'space-between',
    flex: 1,
  },
  alignCenter: {
    alignItems: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtContainer: {
    gap: moderateVerticalScale(8),
    marginVertical: moderateVerticalScale(32),
  },
  btnInputContainer: {
    gap: moderateVerticalScale(16),
    width: '100%',
  },
  errorTxt: {
    color: colors.error,
    fontSize: fontSizes[12],
    fontFamily: typo.regular,
    textAlign: 'center',
  },
});
