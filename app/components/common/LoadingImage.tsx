import {MLogo} from '@assets';
import React, {useRef, useEffect} from 'react';
import {Animated, Easing, I18nManager, StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';

const LoadingImage = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    );
    animation.start();
    return () => {
      animation.stop();
    };
  }, [animatedValue]);

  const opacityInterpolation = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 1],
  });

  return (
    <Animated.Image
      source={MLogo}
      style={[
        styles.image,
        {
          opacity: opacityInterpolation,
          ...(I18nManager.isRTL ? {right: '50%'} : {left: '50%'}),
        },
      ]}
    />
  );
};

export default LoadingImage;

const styles = StyleSheet.create({
  image: {
    width: moderateScale(100),
    height: moderateVerticalScale(100),
    resizeMode: 'contain',
    position: 'absolute',
    top: '50%',
    transform: [
      {translateX: -moderateScale(50)},
      {translateY: -moderateVerticalScale(50)},
    ],
  },
});
