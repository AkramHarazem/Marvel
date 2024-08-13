import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import images from '../../assets';
import {moderateScale} from 'react-native-size-matters/extend';
import {colors} from '@common/colors';

const TabIcon = ({focused, image}) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={images[image]}
        resizeMode="contain"
        style={styles.tabBarIcon}
        tintColor={colors.red}
      />
    </View>
  );
};

export default TabIcon;

const styles = StyleSheet.create({
  tabBarIcon: {
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    resizeMode: 'contain',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
