import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import {fontSizes} from '@common/fonts';
import typo from '@common/typo';
import {AppIcon, AppText} from '@components/common';
import {colors} from '@common/colors';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';

type AppTabProps = {
  image?: ImageSourcePropType;
  label?: string;
  onPress?: any;
  disabled?: boolean;
};

const AppTab = ({
  image,
  label,
  onPress = () => {},
  disabled = false,
}: AppTabProps) => {
  const currentTheme = useSelector(getCurrentTheme);

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: currentTheme.tabBackground}]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}>
      <View style={styles.row}>
        {image ? (
          <Image
            source={image}
            style={styles.icon}
            tintColor={currentTheme.textColor}
          />
        ) : null}
        <AppText style={styles.label}>{label}</AppText>
      </View>
      {!disabled ? (
        <AppIcon icon={'chevron-right'} shouldReverse={true} disabled={true} />
      ) : null}
    </TouchableOpacity>
  );
};

export default AppTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(15),
    paddingHorizontal: moderateScale(25),
    borderRadius: moderateScale(7),
    marginBottom: moderateVerticalScale(10),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  icon: {
    height: moderateScale(20, 0.3),
    width: moderateScale(20, 0.3),
    resizeMode: 'contain',
  },
  label: {
    fontSize: fontSizes[16],
    textAlign: 'left',
    fontFamily: typo.semiBold,
  },
  row: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(20),
  },
});
