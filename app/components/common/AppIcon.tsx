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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
  icon,
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
      {image ? (
        <Image source={image} style={style} />
      ) : (
        icon && (
          <Icon
            name={icon}
            size={moderateScale(22, 0.3)}
            color={currentTheme.textColor}
          />
        )
      )}
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
});
