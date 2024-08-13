import {
  AccessibilityState,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import * as Animatable from 'react-native-animatable';
import images from '../../assets';
import {colors} from '@common/colors';
import {useTranslation} from 'react-i18next';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';

interface TabButtonProps {
  name: string;
  onPress?: any;
  accessibilityState?: AccessibilityState;
}
const TabButton = (props: TabButtonProps) => {
  const currentTheme = useSelector(getCurrentTheme);
  const {t} = useTranslation();
  const {name, onPress, accessibilityState} = props;
  const focused = accessibilityState?.selected;
  const viewRef = useRef<Animatable.View & {animate: Function}>(null);
  const textViewRef = useRef<Animatable.View & {animate: Function}>(null);

  useEffect(() => {
    if (focused) {
      viewRef.current?.animate({0: {scale: 0}, 1: {scale: 1}});
      textViewRef.current?.animate({0: {scale: 0}, 1: {scale: 1}});
    } else {
      viewRef.current?.animate({0: {scale: 1}, 1: {scale: 0}});
      textViewRef.current?.animate({0: {scale: 1}, 1: {scale: 0}});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, {flex: focused ? 1 : 0.65}]}>
      <View>
        <Animatable.View
          ref={viewRef}
          duration={500}
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: colors.red, borderRadius: moderateScale(16)},
          ]}
        />
        <View
          style={[styles.btn, {backgroundColor: focused ? null : colors.red}]}>
          <Image
            source={images[name]}
            resizeMode="contain"
            style={styles.tabBarIcon}
            tintColor={currentTheme.textColor}
          />
          <Animatable.View ref={textViewRef} duration={500}>
            {focused && (
              <Text
                style={{
                  color: currentTheme.textColor,
                  paddingHorizontal: moderateScale(8),
                }}>
                {t(name)}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateVerticalScale(55),
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  },
  tabBarIcon: {
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    resizeMode: 'contain',
  },
});
