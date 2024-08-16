import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import React, {SetStateAction, useCallback, useMemo} from 'react';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters/extend';
import {fontSizes} from '@common/fonts';
import typo from '@common/typo';
import CharacterCard, {cardWidth} from './CharacterCard';
import {AppText} from '@components/common';
import {apiDataType} from '@screens/home/Home';

type CharactersLisTypes = {
  data: apiDataType;
  setOffset: React.Dispatch<SetStateAction<number>>;
};

type ListItemType = any | 'placeholder';

const {width} = Dimensions.get('window');
const numColumns = Math.floor((width - moderateScale(15) * 2) / cardWidth);
const Placeholder = () => <View style={{width: cardWidth}} />;

const CharactersList = ({data, setOffset}: CharactersLisTypes) => {
  const isEmpty = data?.results?.length === 0;
  const cards = useMemo(() => {
    const d = data?.results ? [...data?.results] : [];
    while (d.length && d.length % numColumns !== 0) {
      d.push('placeholder');
    }
    return d;
  }, [numColumns, data]);

  const onReachEnd = useCallback(() => {
    if (data?.offset < data?.total && data?.results?.length !== data?.total) {
      setOffset((prev: number) => prev + data?.count);
    }
  }, []);

  const renderItem = useCallback(
    ({item}: ListItemType) =>
      item === 'placeholder' ? <Placeholder /> : <CharacterCard item={item} />,
    [],
  );

  const renderEmpty = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <AppText style={styles.emptyText}>no_characters_found</AppText>
      </View>
    );
  }, []);

  const renderHeader = useCallback(() => {
    return isEmpty ? null : (
      <View style={styles.headerContainer}>
        <AppText style={styles.headerText}>marvel_characters</AppText>
      </View>
    );
  }, [isEmpty]);

  return (
    <FlatList
      data={cards}
      renderItem={renderItem}
      keyExtractor={(item, idx) => item?.id + idx}
      numColumns={Math.max(numColumns, 2)}
      contentContainerStyle={styles.contentContainerStyle}
      columnWrapperStyle={styles.columnWrapperStyle}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={30}
      initialNumToRender={10}
      windowSize={11}
      ListEmptyComponent={renderEmpty}
      ListHeaderComponent={renderHeader}
      onEndReached={onReachEnd}
    />
  );
};

export default CharactersList;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    marginTop: moderateVerticalScale(55),
    paddingBottom: moderateVerticalScale(145),
    paddingHorizontal: moderateScale(20),
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginVertical: moderateScale(10),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: fontSizes[24],
    fontFamily: typo.semiBold,
    textAlign: 'center',
    lineHeight: moderateVerticalScale(45),
  },
  headerContainer: {
    marginBottom: moderateVerticalScale(10),
  },
  headerText: {
    fontSize: fontSizes[22],
    fontFamily: typo.medium,
  },
});
