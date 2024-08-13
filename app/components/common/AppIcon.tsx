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

type AppIconProps = {
  icon: ImageSourcePropType;
  onPress?: any;
  style?: ImageStyle;
  shouldReverse?: boolean;
  disabled?: boolean;
};

const AppIcon = ({
  icon,
  onPress,
  style,
  shouldReverse = false,
  disabled = true,
}: AppIconProps) => {
  const {goBack} = useNavigation();

  return (
    <TouchableOpacity
      onPress={onPress ? onPress : goBack}
      style={styles.container}
      disabled={disabled}>
      <Image source={icon} style={[style, shouldReverse && styles.reverse]} />
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
