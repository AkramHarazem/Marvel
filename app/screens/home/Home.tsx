import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters/extend';
import {useDispatch, useSelector} from 'react-redux';
import {useDebounce} from 'use-debounce';
import debounce from 'lodash.debounce';
import {ErrorView, LoadingView} from '@components/common';
import {CharactersList, Search} from '@components/home';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';
import {useGetAllCharactersQuery} from '@services/characters';
import {api} from '@services/api';

export type apiDataType = {
  offset: number;
  count: number;
  total: number;
  limit: number;
  results: any[];
};

const timeStamp = Date.now();
const Home = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(getCurrentTheme);
  const [searchValue, setSearchValue] = useState('');
  const [offset, setOffset] = useState(0);
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);

  const handleSearch = useCallback(
    debounce(() => {
      setOffset(0);
      dispatch(api.util.resetApiState());
    }, 1000),
    [],
  );

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchValue, handleSearch]);

  const {
    currentData: data,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useGetAllCharactersQuery(
    {
      offset,
      nameStartsWith: debouncedSearchValue,
      timeStamp,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );

  return (
    <ErrorView hasError={isError} onRetry={refetch}>
      <View
        style={[
          styles.container,
          {backgroundColor: currentTheme.containerBackgroundColor},
        ]}>
        <LoadingView visible={isFetching} />
        <Search
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          setOffset={setOffset}
        />
        {!isLoading && data ? (
          <CharactersList data={data.data} setOffset={setOffset} />
        ) : null}
      </View>
    </ErrorView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  },
});
