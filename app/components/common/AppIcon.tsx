import {
  I18nManager,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters/extend';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';

type AppIconProps = {
  image?: ImageSourcePropType;
  icon?: string;
  onPress?: any;
  style?: ImageStyle;
  shouldReverse?: boolean;
  disabled?: boolean;
};

const AppIcon = ({
  image,
  onPress,
  style,
  shouldReverse = false,
  disabled = true,
}: AppIconProps) => {
  const {goBack} = useNavigation();
  const currentTheme = useSelector(getCurrentTheme);

  return (
    <TouchableOpacity
      onPress={onPress ? onPress : goBack}
      style={[styles.container, shouldReverse && styles.reverse]}
      disabled={disabled}>
      <Image
        source={image}
        style={[styles.image, style, {tintColor: currentTheme.textColor}]}
      />
    </TouchableOpacity>
  );
};

export default AppIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  reverse: {
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
  image: {
    width: moderateScale(22, 0.3),
    height: moderateScale(22, 0.3),
  },
});
