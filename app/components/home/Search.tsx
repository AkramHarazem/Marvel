import {Dimensions, StyleSheet, View} from 'react-native';
import React, {SetStateAction, useCallback} from 'react';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import {colors} from '@common/colors';
import AppTextInput from '@components/common/AppTexTInput';
import {AppIcon} from '@components/common';
import {reload} from '@assets';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';
import {useTranslation} from 'react-i18next';
import {api} from '@services/api';

type SearchTypes = {
  setSearchValue: React.Dispatch<SetStateAction<string>>;
  setOffset: React.Dispatch<SetStateAction<number>>;
  searchValue: string;
};

const {width} = Dimensions.get('window');

const Search = ({setSearchValue, searchValue, setOffset}: SearchTypes) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const currentTheme = useSelector(getCurrentTheme);
  const isDark = currentTheme.theme === 'dark';

  const handleRefetch = useCallback(() => {
    setOffset(0);
    setSearchValue('');
    dispatch(api.util.resetApiState());
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.colorWithAlpha(
            isDark ? 'black' : 'white',
            0.6,
          ),
        },
      ]}>
      <AppTextInput
        containerStyle={styles.inputStyle}
        onChangeText={setSearchValue}
        value={searchValue}
        resetValue={() => setSearchValue('')}
        placeholder={t('search_by_name')}
      />
      <AppIcon
        image={reload}
        style={StyleSheet.flatten([
          styles.reloadImg,
          {tintColor: currentTheme.textColor},
        ])}
        onPress={handleRefetch}
        disabled={false}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    height: moderateVerticalScale(60),
    paddingHorizontal: moderateScale(15),
    zIndex: 5,
  },
  reloadImg: {
    width: moderateScale(35),
    height: moderateVerticalScale(35),
    resizeMode: 'contain',
  },
  inputStyle: {
    width: moderateScale(280),
  },
});
