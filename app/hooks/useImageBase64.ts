import {
  launchCamera,
  launchImageLibrary,
  Asset,
  ImagePickerResponse,
  MediaType,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
// @ts-ignore
import ImgToBase64 from 'react-native-image-base64';
import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInfo} from '@selectors/userInfoSelectors';
import {setUserInfo} from '@slices/userInfoSlices';
import {showSnack} from '@common/utils';
import {useTranslation} from 'react-i18next';
import {colors} from '@common/colors';

type ImageBase64Props = {
  setModalVisible: (arg: boolean) => void;
  modalVisible?: boolean;
};

const OPTIONS: CameraOptions & ImageLibraryOptions = {
  includeBase64: true,
  mediaType: 'photo' as MediaType,
  quality: 0.8,
  maxHeight: 512,
  maxWidth: 512,
  cameraType: 'back',
};

const useImageBase64 = ({setModalVisible, modalVisible}: ImageBase64Props) => {
  const {t} = useTranslation();
  const options = ['camera', 'gallery'];
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);

  const resize = async (asset: Asset) => {
    if (!asset || !asset.uri) {
      return;
    }

    try {
      const result = await ImageResizer.createResizedImage(
        asset.uri,
        512,
        512,
        'PNG',
        5,
        0,
        undefined,
        false,
        {
          mode: 'contain',
          onlyScaleDown: true,
        },
      );

      const base64 = await ImgToBase64.getBase64String(result.uri);
      dispatch(setUserInfo({...userInfo, image: base64}));
      showSnack(t('upload_succeeded'), t('dismiss'));
    } catch (error) {
      showSnack(t('upload_failed'), t('dismiss'), colors.error);
    }
  };

  const onSelectPhoto = (response: ImagePickerResponse) => {
    const asset = response?.assets?.[0];
    if (asset) {
      resize(asset);
    }
  };

  const openImageLibrary = async () => {
    launchImageLibrary(OPTIONS, response => onSelectPhoto(response));
  };

  const openCamera = async () => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    ).then(result => {
      if (result === 'granted') {
        launchCamera(OPTIONS, response => onSelectPhoto(response));
      }
    });
  };

  const handlePress = useCallback(
    (option: string) => {
      if (option === 'camera') {
        openCamera();
      } else {
        openImageLibrary();
      }
      setModalVisible(!modalVisible);
    },
    [modalVisible],
  );

  return {handlePress, options};
};

export default useImageBase64;
