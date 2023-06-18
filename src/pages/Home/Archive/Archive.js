import React, {useCallback, useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AnimatedLottieView from 'lottie-react-native';
import {MainContext} from '../../../Context/Context';
import {NYT_API_KEY} from '@env';
import {GeneralStyles, colors, fonts} from '../../../Utils/GeneralStyles';

export default function Archive() {
  const {navigate} = useNavigation();
  const {userData, user} = useContext(MainContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = `https://api.nytimes.com/svc/archive/v1/${selectedYear}/${selectedMonth}.json?api-key=${NYT_API_KEY}`;

  console.log('DATA', data?.response?.docs[0]?.abstract);

  const handleDateChange = (event, newDate) => {
    if (newDate) {
      setSelectedDate(newDate);
      setSelectedMonth(newDate.getMonth() + 1);
      setSelectedYear(newDate.getFullYear());
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [data, url]);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      handleFetchData();
    }
  }, [handleFetchData]);

  const handleFetchData = async () => {
    setLoading(true);
    await fetchData();
  };

  const renderItem = ({item}) => (
    <View style={styles.ItemContainer}>
      <View style={styles.ItemSubInfoContainer}>
        <Text style={styles.ItemPublishedDate}>
          {item?.pub_date.substring(0, 10)}
        </Text>
      </View>
      {item?.multimedia && (
        <View style={styles.ItemImageContainer}>
          <Image
            style={styles.ItemImage}
            source={{
              uri: `https://static01.nyt.com/${item?.multimedia[0]?.url}`,
            }}
          />
        </View>
      )}
      {item?.multimedia[0]?.caption !== null && (
        <View style={styles.ItemImageInfoContainer}>
          <Text style={styles.ItemImageCaption}>
            {item?.multimedia[0]?.caption}
          </Text>
        </View>
      )}
      <View style={styles.ItemInfoContainer}>
        <Text style={styles.ItemSubsection}>{item?.headline?.main}</Text>
        <Text style={styles.ItemByline}>{item?.byline?.original}</Text>
        <Text style={styles.ItemParagraph}>{item?.lead_paragraph}</Text>

        <Text style={styles.ItemAbstract}>
          {item?.abstract}
          <TouchableOpacity onPress={() => Linking.openURL(item?.web_url)}>
            <Text style={styles.ItemLink}>Read News On Site..</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[GeneralStyles.container, styles.container]}>
      <View style={styles.datePickerContainer}>
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
        <TouchableOpacity onPress={handleFetchData}>
          <AnimatedLottieView
            style={styles.searchAnimation}
            source={require('../../../../assets/animations/search-icon.json')}
            autoPlay
            loop
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.selectedDate}>
        {selectedDate.toLocaleDateString('tr-TR', {
          month: 'long',
          year: 'numeric',
        })}
      </Text>

      {selectedYear === '' || selectedMonth === '' ? (
        <Text style={styles.noDataText}>Please select a date.</Text>
      ) : null}

      {loading ? (
        <AnimatedLottieView
          style={styles.loadingAnimation}
          source={require('../../../../assets/animations/loading-book.json')}
          autoPlay
          loop
        />
      ) : (
        <View style={styles.resultsContainer}>
          {data?.response && (
            <Text style={styles.NewsFound}>
              {data?.response?.docs?.length} News Found
            </Text>
          )}

          {data?.response?.docs !== null ? (
            <FlatList
              style={styles.FlatList}
              data={data?.response?.docs}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.noDataText}>API'den veri alınamadı.</Text>
          )}
        </View>
      )}

      <Text style={styles.FootText}> {data?.copyright} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    padding: 10,
    backgroundColor: colors.bgLight,
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
    width: '100%',
    height: 150,
  },

  ItemImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
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

  ItemByline: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.textDark,
    textAlign: 'center',
  },

  ItemParagraph: {
    fontFamily: fonts.light,
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'justify',
  },

  ItemAbstract: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.secondary,
    textAlign: 'justify',
  },

  ItemLink: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.darkBlue,
    textDecorationLine: 'underline',
    marginLeft: 5,
  },

  selectedDate: {
    fontFamily: fonts.regular,
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: colors.textDark,
  },

  NewsFound: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.primary,
    marginLeft: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width,
    height: 50,
    marginTop: 20,
  },

  searchAnimation: {
    width: 50,
    height: 50,
  },
  loadingAnimation: {
    flex: 1,
  },
  resultsContainer: {
    flex: 1,
  },

  noDataText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textDark,
    textAlign: 'center',
    marginTop: 20,
  },
});
