import {Dimensions, StyleSheet} from 'react-native';
import React, {memo, useCallback} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  useGetCharacterByIdQuery,
  useLazyGetCharacterAllComicsQuery,
} from '@services/characters';
import {
  AppButton,
  AppTab,
  AppText,
  ErrorView,
  LoadingView,
} from '@components/common';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import {FlatList} from 'react-native-gesture-handler';
import {Text} from 'react-native-animatable';
import {fontSizes} from '@common/fonts';
import typo from '@common/typo';
import Animated from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const timeStamp = Date.now();

const Comic = memo(({item}: any) => {
  return <AppTab label={item?.title} disabled={true} />;
});

const CharacterDetails = () => {
  const {id, imgUrl}: {id?: number; imgUrl?: string} = useRoute()?.params || {};

  const {
    data: {data: {results: char = []} = {}} = {},
    isError,
    isFetching,
    refetch,
  } = useGetCharacterByIdQuery(
    {
      id,
      timeStamp,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );

  const [
    getCharacterAllComics,
    {currentData: data, isError: isComicsError, isFetching: isFetchingComics},
  ] = useLazyGetCharacterAllComicsQuery();

  const onReachEnd = useCallback(() => {
    if (
      data?.data.offset < data?.data.total &&
      data?.data.results?.length !== data?.data.total
    ) {
      getCharacterAllComics({
        id,
        offset: data?.data.offset + data?.data.count,
        timeStamp,
      });
    }
  }, [data?.data]);

  const handleRetry = () => {
    Promise.all([
      isError && refetch(),
      isComicsError &&
        getCharacterAllComics({
          id,
          offset: (data?.data?.offset ?? 0) + (data?.data?.count ?? 0),
          timeStamp,
        }),
    ]);
  };

  const isEmpty = data?.data.results?.length === 0;

  const renderHeader = useCallback(() => {
    return isEmpty ? null : (
      <>
        <AppText style={styles.nameStyle}>{char[0]?.name}</AppText>
        <AppText style={styles.descriptionStyle}>
          {char[0]?.description || 'no_description'}
        </AppText>
        <Text>
          <AppText style={styles.comicNumStyle}>available_comics</AppText>
          <AppText style={styles.comicNumStyle}>
            : {char[0]?.comics.available}
          </AppText>
        </Text>
        {char[0]?.comics.available > 0 && !data?.data?.results ? (
          <AppButton
            onPress={() => getCharacterAllComics({offset: 0, id, timeStamp})}
            isLoading={isFetchingComics}>
            view_comics
          </AppButton>
        ) : null}
      </>
    );
  }, [isEmpty, char, isFetchingComics]);

  const renderItem = useCallback(({item}: any) => <Comic item={item} />, []);

  return (
    <ErrorView hasError={isError || isComicsError} onRetry={handleRetry}>
      <LoadingView
        visible={
          isFetching || (isFetchingComics && data?.data?.results.length > 0)
        }
      />
      <Animated.Image
        source={{
          uri: imgUrl?.replace('http://', 'https://'),
        }}
        style={styles.image}
        sharedTransitionTag="hero"
      />
      {!isFetching && char?.length > 0 && (
        <FlatList
          data={data?.data?.results}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={item => String(item?.id)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={30}
          initialNumToRender={10}
          windowSize={11}
          ListHeaderComponent={renderHeader}
          ListHeaderComponentStyle={styles.headerContainer}
          onEndReached={onReachEnd}
        />
      )}
    </ErrorView>
  );
};

export default CharacterDetails;

const styles = StyleSheet.create({
  image: {
    width: width,
    height: moderateVerticalScale(300),
  },
  contentContainerStyle: {
    marginTop: moderateVerticalScale(25),
    paddingHorizontal: moderateScale(24),
    paddingBottom: moderateVerticalScale(145),
  },
  headerContainer: {
    gap: moderateVerticalScale(10),
    alignItems: 'center',
    marginBottom: moderateVerticalScale(30),
  },
  nameStyle: {
    fontSize: fontSizes[20],
    fontFamily: typo.semiBold,
  },
  descriptionStyle: {
    fontSize: fontSizes[16],
    fontFamily: typo.medium,
    textAlign: 'center',
  },
  comicNumStyle: {
    fontSize: fontSizes[16],
    fontFamily: typo.bold,
  },
});
