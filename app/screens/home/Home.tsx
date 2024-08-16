import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ErrorView, LoadingView} from '@components/common';
import {CharactersList, Search} from '@components/home';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';
import {useGetAllCharactersQuery} from '@services/characters';

export type apiDataType = {
  offset: number;
  count: number;
  total: number;
  limit: number;
  results: any[];
};

const timeStamp = Date.now();
const Home = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const [searchValue, setSearchValue] = useState('');
  const [offset, setOffset] = useState(0);

  const {
    currentData: data,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useGetAllCharactersQuery(
    {
      offset,
      nameStartsWith: searchValue,
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
        <Search setSearchValue={setSearchValue} setOffset={setOffset} />
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
  },
});
