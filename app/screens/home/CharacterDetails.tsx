import {Dimensions, Image, StyleSheet} from 'react-native';
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

const {width} = Dimensions.get('window');

const Comic = memo(({item}: any) => {
  return <AppTab label={item?.title} disabled={true} />;
});

const CharacterDetails = () => {
  const {id}: {id?: number} = useRoute()?.params || {};

  const {
    data: {data: {results: char = []} = {}} = {},
    isError,
    isFetching,
    refetch,
  } = useGetCharacterByIdQuery(
    {
      id,
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
      });
    }
  }, [data?.data]);

  const handleRetry = () => {
    Promise.all([
      isError && refetch(),
      isComicsError &&
        getCharacterAllComics({
          id,
          offset: data?.offset ?? 0,
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
        {char[0]?.comics.available > 0 ? (
          <AppButton onPress={() => getCharacterAllComics({offset: 0, id})}>
            view_comics
          </AppButton>
        ) : null}
      </>
    );
  }, [isEmpty, char]);

  const renderItem = useCallback(({item}: any) => <Comic item={item} />, []);

  return (
    <ErrorView hasError={isError || isComicsError} onRetry={handleRetry}>
      <LoadingView visible={isFetchingComics || isFetching} />
      {!isFetching && (
        <>
          <Image
            source={{
              uri: `${char[0].thumbnail.path}.${char[0].thumbnail.extension}`,
            }}
            style={styles.image}
          />
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
        </>
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
  },
  comicNumStyle: {
    fontSize: fontSizes[16],
    fontFamily: typo.bold,
  },
});
