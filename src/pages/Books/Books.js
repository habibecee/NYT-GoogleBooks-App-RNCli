import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {colors, fonts} from '../../Utils/GeneralStyles';
import AnimatedLottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import Arrow from '../../components/Arrow';

const Books = () => {
  const {navigate} = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`,
      );
      const data = response.data;

      if (data.items) {
        setBooks(data.items);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderBookItem = ({item}) => {
    const bookInfo = item?.volumeInfo;

    return (
      <TouchableOpacity
        style={styles.bookContainer}
        onPress={() => navigate('BookDetails', {item: item})}>
        {/* {bookInfo?.imageLinks && ( */}
        <Image
          style={styles.bookCover}
          source={{uri: bookInfo?.imageLinks?.thumbnail}}
        />
        {/* )} */}
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{bookInfo?.title}</Text>
          {bookInfo?.authors && (
            <Text style={styles.bookAuthors}>
              By {bookInfo?.authors.join(', ')}
            </Text>
          )}
        </View>
        <View style={styles.arrow}>
          <Arrow
            name="right"
            source={require('../../../assets/animations/grayArrow.json')}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search books..."
          onChangeText={text => setSearchTerm(text)}
          value={searchTerm}
        />
        <TouchableOpacity onPress={searchBooks}>
          <AnimatedLottieView
            style={styles.searchAnimation}
            source={require('../../../assets/animations/search-icon.json')}
            autoPlay
            loop
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.bookList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    width: Dimensions.get('window').width,
    paddingHorizontal: 16,
    marginEnd: 16,
  },

  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.dark,
    padding: 10,
    borderRadius: 10,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.dark,
  },

  searchAnimation: {
    width: 50,
    height: 50,
  },

  bookList: {
    flex: 1,
  },
  bookContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: colors.tertiary,
    borderRadius: 10,
    padding: 8,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
  },
  bookCover: {
    width: 100,
    height: 120,
    resizeMode: 'cover',
    marginRight: 8,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 4,
  },
  bookAuthors: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textLight,
  },

  arrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Books;
