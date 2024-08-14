import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import React, {Dispatch, SetStateAction} from 'react';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';
import RadioButton from './RadioButton';
import AppText from './AppText';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import typo from '@common/typo';
import {fontSizes} from '@common/fonts';

type ModalProps = {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  optionsName?: string;
  modalVisible?: boolean;
  options: Array<string>;
  handlePress: (arg: string) => void;
  selectedOption?: string;
};

const OptionsModal = ({
  modalVisible,
  setModalVisible,
  options,
  handlePress,
  selectedOption,
}: ModalProps) => {
  const currentTheme = useSelector(getCurrentTheme);

  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={0.3}
      onBackButtonPress={() => {
        setModalVisible(!modalVisible);
      }}
      onBackdropPress={() => {
        setModalVisible(!modalVisible);
      }}
      style={[styles.centeredView]}>
      <View
        style={[
          styles.modalView,
          {backgroundColor: currentTheme.tabBackground},
        ]}>
        {options.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.itemContainer}
            onPress={() => handlePress(item)}>
            <RadioButton selected={item === selectedOption} />
            <AppText style={styles.txtStyle}>{item}</AppText>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

export default OptionsModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    borderRadius: moderateScale(20),
    paddingVertical: moderateVerticalScale(40),
    paddingHorizontal: moderateScale(30),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: moderateVerticalScale(40),
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  txtStyle: {
    fontFamily: typo.semiBold,
    fontSize: fontSizes[16],
  },
});
