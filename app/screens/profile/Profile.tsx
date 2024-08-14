import {OptionsModal} from '@components/common';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';
import {getUserInfo} from '@selectors/userInfoSelectors';
import React, {useState} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import {useSelector} from 'react-redux';
import {colors} from '@common/colors';
import useImageBase64 from '@hooks/useImageBase64';
import {MoreButton} from '@components/more';
import {phone, email, idCard, avatar, editing} from '@assets';

const Profile = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const userInfo = useSelector(getUserInfo);
  const [modalVisible, setModalVisible] = useState(false);

  const userImage = userInfo?.image
    ? {uri: `data:image/png;base64,${userInfo?.image}`}
    : avatar;
  const {handlePress, options} = useImageBase64({
    modalVisible,
    setModalVisible,
  });

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: currentTheme.containerBackgroundColor},
      ]}>
      <View style={styles.profilePictureContainer}>
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Image style={styles.image} source={userImage} />
          <Pressable
            style={styles.editIconContainer}
            onPress={() => setModalVisible(!modalVisible)}>
            <Image
              style={styles.editIcon}
              source={editing}
              tintColor={colors.red}
            />
          </Pressable>
        </Pressable>
      </View>
      <View style={styles.infoContainer}>
        <MoreButton image={idCard} label={userInfo.name} disabled={true} />
        <MoreButton image={email} label={userInfo.email} disabled={true} />
        <MoreButton image={phone} label={userInfo.phone} disabled={true} />
      </View>
      <OptionsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        options={options}
        handlePress={handlePress}
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateVerticalScale(35),
  },
  profilePictureContainer: {
    height: moderateVerticalScale(115),
    width: moderateScale(115),
    borderRadius: moderateScale(60),
    alignSelf: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    height: moderateVerticalScale(25),
    width: moderateScale(25),
    right: 5,
    bottom: 5,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: moderateScale(60),
  },
  editIcon: {
    height: '100%',
    width: '100%',
  },
  infoContainer: {
    marginTop: moderateVerticalScale(40),
  },
});
