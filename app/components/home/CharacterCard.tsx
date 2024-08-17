import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useState} from 'react';
import {AppText} from '@components/common';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import {colors} from '@common/colors';
import {fontSizes} from '@common/fonts';
import {notAvailable} from '@assets';
import screenNames, {useHomeNavigation} from '@common/screensConfig';
import typo from '@common/typo';
import Animated from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';

const {width} = Dimensions.get('window');

export const cardWidth = moderateScale(width / 2 - 40, 0.3);

const CharacterCard = memo(({item}: any) => {
  const currentTheme = useSelector(getCurrentTheme);
  const [showLoader, SetShowLoader] = useState(true);
  const {navigate} = useHomeNavigation();

  const navigateToDetails = () => {
    navigate(screenNames.HomeStack.CharacterDetails, {
      id: item.id,
      imgUrl: `${item.thumbnail.path}.${item.thumbnail.extension}`,
    });
  };

  const handleImageLoad = () => {
    SetShowLoader(false);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={navigateToDetails}>
      <View
        style={StyleSheet.flatten([
          styles.imageContainer,
          {
            backgroundColor: currentTheme.containerBackgroundColor,
          },
        ])}>
        {showLoader && (
          <ActivityIndicator
            size={'large'}
            color={currentTheme.textColor}
            style={styles.loader}
          />
        )}
        <Animated.Image
          source={
            item.thumbnail?.path.includes('image_not_available')
              ? notAvailable
              : {
                  uri: `${item.thumbnail.path}.${item.thumbnail.extension}`.replace(
                    'http://',
                    'https://',
                  ),
                }
          }
          style={styles.image}
          sharedTransitionTag="hero"
          resizeMode="cover"
          onLoadEnd={handleImageLoad}
        />
      </View>

      <View style={styles.nameContainer}>
        <AppText style={styles.name} numberOfLines={2}>
          {item?.name}
        </AppText>
      </View>
    </TouchableOpacity>
  );
});

export default CharacterCard;

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: moderateVerticalScale(200),
    borderRadius: moderateScale(12),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(6),
    elevation: 5,
  },
  nameContainer: {
    width: '100%',
    height: moderateVerticalScale(47, 0.3),
    position: 'absolute',
    bottom: -1,
    zIndex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorWithAlpha('black', 0.5),
    borderBottomRightRadius: moderateScale(12),
    borderBottomLeftRadius: moderateScale(12),
  },
  imageContainer: {
    flex: 1,
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(12),
    resizeMode: 'cover',
  },
  loader: {
    position: 'absolute',
  },
  name: {
    fontSize: fontSizes[13],
    lineHeight: moderateVerticalScale(16),
    textAlign: 'center',
    fontFamily: typo.bold,
    color: colors.white,
  },
});
