import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import LoadingImage from './LoadingImage';
import {colors} from '@common/colors';

const LoadingView = ({visible}: {visible: boolean}) => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      statusBarTranslucent={true}>
      <View style={[styles.overlay, {backgroundColor: colors.black}]} />
      <LoadingImage />
    </Modal>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
});
