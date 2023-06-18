import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import {NYT_API_KEY} from '@env';
import {useNavigation} from '@react-navigation/native';
import useFetch from '../../../Context/useFetch';
import {GeneralStyles, colors, fonts} from '../../../Utils/GeneralStyles';

export default function FeedItems() {
  //   const section = route.params.section;
  const {navigate} = useNavigation();
  const {data, loading, error} = useFetch(
    `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${NYT_API_KEY}`,
  );

  //   const CategoryItems = [];

  //   const FilteredCategoryItems = data?.results?.filter(item =>
  //     item.section === section ? CategoryItems.push(item) : null,
  //   );

  //   console.log('CATEGORY ITEMS', CategoryItems);

  const renderItem = ({item, index}) => (
    <View style={styles.ItemContainer}>
      <View style={styles.ItemSubInfoContainer}>
        <Text style={styles.ItemSubsection}>{item?.subsection}</Text>
        <Text style={styles.ItemPublishedDate}>
          {item?.published_date.substring(0, 10)}
        </Text>
      </View>
      {item?.multimedia && (
        <View style={styles.ItemImageContainer}>
          <Image
            style={styles.ItemImage}
            source={{uri: item?.multimedia[1].url}}
          />
          <View style={styles.ItemImageInfoContainer}>
            <Text style={styles.ItemImageCaption}>
              {item?.multimedia[1].caption}
            </Text>
            <Text style={styles.ItemImageCopyright}>
              {item?.multimedia[1].copyright}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.ItemInfoContainer}>
        <Text style={styles.ItemTitle}>{item?.title}</Text>
        <Text style={styles.ItemAbstract}>
          {item?.abstract}
          <TouchableOpacity onPress={() => Linking.openURL(item?.url)}>
            <Text style={styles.ItemLink}>Read News On Site..</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.FlatList}
        data={data?.results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <Text style={styles.FootText}> {data?.copyright} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width,
    padding: 10,
  },

  FootText: {
    position: 'absolute',
    top: Dimensions.get('window').height / 4,
    left: Dimensions.get('window').width / 2,
    transform: [{rotate: '90deg'}],
    fontFamily: fonts.light,
    fontSize: 13,
    color: colors.secondary,
    textAlign: 'justify',
  },

  FlatList: {
    paddingVertical: 10,
  },

  ItemContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: colors.light,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    borderRadius: 10,
  },

  ItemSubInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    gap: 10,
  },

  ItemSubsection: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.secondary,
  },

  ItemPublishedDate: {
    fontFamily: fonts.light,
    fontSize: 12,
    color: colors.primary,
  },

  ItemImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  ItemImage: {
    width: '50%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },

  ItemImageInfoContainer: {
    flex: 1,
  },

  ItemImageCaption: {
    fontFamily: fonts.light,
    fontSize: 12,
    color: colors.primary,
    textAlign: 'center',
  },

  ItemImageCopyright: {
    fontFamily: fonts.light,
    fontSize: 12,
    color: colors.textDark,
    textAlign: 'center',
  },

  ItemInfoContainer: {
    marginTop: 10,
    padding: 15,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.tertiary,
  },

  ItemTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.textDark,
    textAlign: 'center',
  },

  ItemAbstract: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'justify',
  },

  ItemLink: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.darkBlue,
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
});
