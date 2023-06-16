import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import {MainContext} from '../../Context/Context';
import useFetch from '../../Context/useFetch';
import {NYT_API_KEY} from '@env';
import {useNavigation} from '@react-navigation/native';
import AlarmIcon from '../../components/Alarm';

export default function Home() {
  const {navigate} = useNavigation();
  const {userData, user} = useContext(MainContext);
  const {data, loading, error} = useFetch(
    `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${NYT_API_KEY}`,
  );

  console.log('DATA BOOKS', data);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.ItemContainer}
      key={item?.rank}
      onPress={() => navigate('WeeklyItem', {id: item?.rank})}>
      <View style={styles.ItemImageContainer}>
        <Image style={styles.ItemImage} source={{uri: item?.book_image}} />
      </View>
      <View style={styles.ItemInfoContainer}>
        <View style={styles.ItemTitleContainer}>
          <AlarmIcon style={styles.AlarmIcon} />
          <Text style={styles.ItemTitle}>{item?.title}</Text>
          <AlarmIcon style={styles.AlarmIcon} />
        </View>
        <Text style={styles.ItemAuthor}>{item?.author} </Text>
        <Text style={styles.ItemPublisher}>{item?.publisher}</Text>
        <Text style={styles.ItemDescription}>{item?.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[GeneralStyles.container, styles.constainer]}>
      <View style={styles.SubImageContainer}>
        <Image
          style={styles.SubImage}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/7/77/The_New_York_Times_logo.png',
          }}
        />
      </View>
      <Text style={styles.SubText}>
        {' '}
        Date: {data?.results?.bestsellers_date} /{' '}
        {data?.results?.published_date}{' '}
      </Text>
      <FlatList
        data={data?.results?.books}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={styles.FlatList}
        showsVerticalScrollIndicator={false}
      />
      <Text style={styles.FootText}> {data?.copyright} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: colors.bgLight,
  },
  SubImageContainer: {
    padding: 20,
    alignItems: 'center',
  },
  SubImage: {
    width: Dimensions.get('window').width - 50,
    height: 50,
  },
  SubText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.primary,
    textAlign: 'left',
    marginLeft: 20,
  },

  FootText: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    left: Dimensions.get('window').width / 2,
    transform: [{rotate: '90deg'}],
    fontFamily: fonts.light,
    fontSize: 13,
    color: colors.secondary,
    textAlign: 'justify',
  },

  FlatList: {
    marginEnd: 15,
  },

  ItemContainer: {
    width: Dimensions.get('window').width - 20,
    borderRadius: 10,
    marginBottom: 10,
    marginEnd: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  ItemImageContainer: {
    left: 0,
    width: '32%',
    backgroundColor: colors.bgLight,
  },
  ItemImage: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },

  ItemInfoContainer: {
    width: '68%',
    height: 130,
    padding: 10,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  ItemTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  AlarmIcon: {
    width: 35,
    height: 35,
  },

  ItemTitle: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.textWarn,
    textDecorationLine: 'underline',
  },
  ItemAuthor: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textPrimary,
  },
  ItemPublisher: {
    fontFamily: fonts.light,
    fontSize: 12,
    color: colors.textDark,
  },
  ItemDescription: {
    fontFamily: fonts.light,
    fontSize: 10,
    color: colors.textLight,
    textAlign: 'justify',
  },
});
