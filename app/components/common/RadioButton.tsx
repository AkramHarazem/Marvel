import {colors} from '@common/colors';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters/extend';
import {useSelector} from 'react-redux';

const RadioButton = ({selected}: {selected: boolean}) => {
  const currentTheme = useSelector(getCurrentTheme);
  return (
    <View style={[styles.outerCircle, {borderColor: currentTheme.textColor}]}>
      {!!selected && (
        <View
          style={[
            styles.innerCircle,
            {backgroundColor: currentTheme.textColor},
          ]}
        />
      )}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  outerCircle: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(8),
  },
});
