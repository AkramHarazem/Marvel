import RNSecureStorage, {ACCESSIBLE} from 'react-native-secure-key-store';

const config = {
  accessible: ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
};

export default {
  async getItem(key: string) {
    return await RNSecureStorage.get(key);
  },
  async setItem(key: string, value: string) {
    return await RNSecureStorage.set(key, value, config);
  },
  async removeItem(key: string) {
    return await RNSecureStorage.remove(key);
  },
  clear() {
    return RNSecureStorage.setResetOnAppUninstallTo(true);
  },
};
