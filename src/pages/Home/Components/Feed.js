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
import {NYT_API_KEY} from '@env';
import {useNavigation} from '@react-navigation/native';
import {MainContext} from '../../../Context/Context';
import useFetch from '../../../Context/useFetch';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, fonts} from '../../../Utils/GeneralStyles';

export default function Feed() {
  const {navigate} = useNavigation();
  const {data, loading, error} = useFetch(
    `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${NYT_API_KEY}`,
  );

  console.log('DATA BOOKS', data);

  const renderItem = ({item, index}) => (
    <TouchableOpacity style={styles.ItemContainer} key={index}>
      <Text style={styles.ItemTitle}>{item?.display_name}</Text>
      <Icon name="chevron-forward-sharp" size={30} color={colors.primary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.SubTitle}>Categories</Text>
      <FlatList
        style={styles.FlatList}
        data={data?.results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width - 50,
  },
  SubTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.primary,
    textAlign: 'left',
    marginLeft: 20,
  },
  FlatList: {},
  ItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.tertiary,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
  },
  ItemTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.primary,
  },
});
