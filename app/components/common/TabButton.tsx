import {
  AccessibilityState,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import * as Animatable from 'react-native-animatable';
import images from '../../assets';
import {useTranslation} from 'react-i18next';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';
import AppText from './AppText';
import typo from '@common/typo';

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
      textViewRef.current?.animate({0: {scaleX: 0}, 1: {scaleX: 1}});
    } else {
      viewRef.current?.animate({0: {scaleX: 1}, 1: {scaleX: 0}});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, {flex: focused ? 1 : 0.65}]}>
      <View>
        <View style={[styles.btn]}>
          <Image
            source={images[name]}
            resizeMode="contain"
            style={styles.tabBarIcon}
            tintColor={currentTheme.textColor}
          />
          <Animatable.View ref={textViewRef} duration={500}>
            {focused && <AppText style={styles.txtStyle}>{t(name)}</AppText>}
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
  },
  tabBarIcon: {
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    resizeMode: 'contain',
  },
  txtStyle: {
    paddingHorizontal: moderateScale(8),
    fontFamily: typo.bold,
  },
});
