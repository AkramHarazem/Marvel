import {
  Dimensions,
  I18nManager,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import Carousel from 'react-native-snap-carousel';
import {
  antMan,
  captain,
  hulk,
  ironMan,
  panther,
  spider,
  thor,
  strange,
} from '@assets';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import {AppText} from '@components/common';
import typo from '@common/typo';
import {fontSizes} from '@common/fonts';

const slides = [antMan, captain, hulk, ironMan, panther, spider, thor, strange];

const screenWidth = Dimensions.get('window').width;

const LoginCarousel = () => {
  const carouselRef = useRef(null);
  const renderSlide = ({item}: {item: ImageSourcePropType}) => (
    <View style={styles.slide}>
      <Image style={styles.image} source={item} />
    </View>
  );
  let firstItem = 0;
  if (I18nManager?.isRTL) {
    firstItem = slides.length - 1;
  } else {
    firstItem = 0;
  }
  return (
    <View style={StyleSheet.flatten([styles.container])}>
      <AppText style={styles.txrStyle}>
        login_to_see_your_favorites_heros
      </AppText>
      <Carousel
        ref={carouselRef}
        data={slides}
        vertical={false}
        scrollEnabled
        autoplay
        loop
        autoplayInterval={3000}
        renderItem={renderSlide}
        useScrollView={I18nManager.isRTL ? true : false}
        firstItem={firstItem}
        sliderWidth={screenWidth}
        itemWidth={140}
      />
    </View>
  );
};

export default LoginCarousel;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: moderateVerticalScale(20),
    gap: moderateVerticalScale(20),
  },
  slide: {
    alignSelf: 'center',
    alignItems: 'center',
    width: moderateScale(120),
    height: moderateVerticalScale(150),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  txrStyle: {
    fontFamily: typo.semiBold,
    fontSize: fontSizes[22],
    textAlign: 'center',
    maxWidth: moderateScale(250),
  },
});
