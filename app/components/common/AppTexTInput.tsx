import React, {useState, ForwardedRef} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  I18nManager,
  ViewProps,
  Image,
  ImageSourcePropType,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import AppText from './AppText';
import {colors} from '@common/colors';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import {fontSizes} from '@common/fonts';
import typo from '@common/typo';
import {eye, eye_off, close} from '@assets';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';

export type InputProps = {
  onChangeText: any;
  value?: string;
  resetValue?: () => void;
  secureTextEntry?: boolean;
  error?: string;
  containerStyle?: ViewProps['style'];
  editable?: boolean;
  onPress?: any;
  icon?: ImageSourcePropType;
  preText?: string;
  label?: string;
  isBottomSheet?: boolean;
} & TextInputProps;

const AppTextInput = React.forwardRef(
  (
    props: InputProps,
    ref: ForwardedRef<TextInput | any>,
  ): React.JSX.Element => {
    const {
      error = '',
      containerStyle = {},
      onPress,
      label = '',
      secureTextEntry,
      onChangeText,
      value = '',
      resetValue,
      editable = true,
      onBlur,
      onFocus,
      ...otherProps
    } = props;
    const currentTheme = useSelector(getCurrentTheme);
    const [show, setShow] = useState(secureTextEntry);
    const [focused, setFocused] = useState(false);
    const onFocusHandler = (
      e: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => {
      onFocus && onFocus(e);
      setFocused(true);
    };

    const onBlurHandler = (
      e: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => {
      setFocused(false);
      onBlur && onBlur(e);
    };

    const getBorderColor = () => {
      if (error) {
        return colors.error;
      } else if (focused) {
        return currentTheme.focusInput;
      } else {
        return colors.lighterGray;
      }
    };

    return (
      <TouchableOpacity
        disabled={editable}
        onPress={onPress}
        activeOpacity={1}
        style={containerStyle}>
        <View style={styles.labelContainer}>
          {label.length !== 0 ? (
            <AppText style={[styles.label, {color: currentTheme.textColor}]}>
              {label}
            </AppText>
          ) : null}
        </View>
        <View style={[styles.container, {borderColor: getBorderColor()}]}>
          <TextInput
            ref={ref}
            style={styles.textInput}
            placeholderTextColor={colors.lightGray}
            onChangeText={onChangeText}
            value={value}
            secureTextEntry={show}
            testID={'textInput'}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            editable={editable}
            pointerEvents={onPress && !editable ? 'none' : 'auto'}
            {...otherProps}
          />
          {value?.length === 0 ? (
            <View />
          ) : secureTextEntry ? (
            <TouchableOpacity
              onPress={() => setShow(!show)}
              style={styles.iconContainer}>
              <Image
                source={show ? eye : eye_off}
                style={[styles.icon, !show && {tintColor: colors.black}]}
              />
            </TouchableOpacity>
          ) : (
            <>
              {editable && (
                <TouchableOpacity
                  onPress={resetValue}
                  style={styles.iconContainer}>
                  <Image source={close} style={styles.icon} />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
        {error.length !== 0 ? (
          <AppText style={styles.errorTxt}>{error}</AppText>
        ) : null}
      </TouchableOpacity>
    );
  },
);

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: moderateVerticalScale(45),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    backgroundColor: colors.white,
  },
  label: {
    fontFamily: typo.semiBold,
    color: colors.gray,
    fontSize: fontSizes[14],
    paddingBottom: moderateVerticalScale(5),
  },
  textInput: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    fontSize: fontSizes[16],
    color: colors.black,
    height: '100%',
    writingDirection: 'ltr',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontFamily: typo.regular,
  },
  errorTxt: {
    fontSize: fontSizes[12],
    color: colors.error,
    alignSelf: 'flex-start',
    marginTop: moderateVerticalScale(5),
    fontFamily: typo.regular,
  },
  iconContainer: {
    paddingHorizontal: moderateScale(16),
  },
  icon: {
    width: moderateScale(20),
    height: moderateVerticalScale(20),
    tintColor: colors.lightGray,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(4),
  },
});
