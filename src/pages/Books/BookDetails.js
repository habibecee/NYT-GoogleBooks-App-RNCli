import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../Utils/GeneralStyles';
import AnimatedLottieView from 'lottie-react-native';

export default function BookDetails({route}) {
  const item = route?.params?.item;

  console.log('item', item);
  return (
    <ScrollView style={styles.container}>
      {/* {item?.volumeInfo?.imageLinks && ( */}
      <View style={styles.bookImageContainer}>
        <Image
          style={styles.bookImage}
          source={{uri: item?.volumeInfo?.imageLinks?.thumbnail}}
        />
      </View>
      {/* )} */}
      <View style={styles.bookInfoContainer}>
        <Text style={styles.bookTitle}>{item?.volumeInfo?.title}</Text>

        {item?.volumeInfo?.authors?.map((author, index) => (
          <Text style={styles.bookAuthors} key={index}>
            By {author}
          </Text>
        ))}

        {item?.volumeInfo?.categories?.map((category, index) => (
          <View style={styles.bookCategoryContainer} key={index}>
            <Text style={styles.bookCategory}>{category}</Text>
          </View>
        ))}
        <View style={styles.bookDetailsContainer}>
          <Text style={styles.bookPublishedDate}>
            Published Date: {item?.volumeInfo?.publishedDate}
          </Text>
          <Text style={styles.bookPageCount}>
            {' '}
            Page Count: {item?.volumeInfo?.pageCount}
          </Text>
          <Text style={styles.bookLanguage}>
            {' '}
            Language: {item?.volumeInfo?.language}
          </Text>
        </View>
        <Text style={styles.bookDescription}>
          {item?.volumeInfo?.description}
        </Text>

        <TouchableOpacity onPress={() => Linking.openURL(item?.infoLink)}>
          <AnimatedLottieView
            style={styles.searchAnimation}
            source={require('../../../assets/animations/google-play-books.json')}
            autoPlay
            loop
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
    marginBottom: 16,
  },

  bookImageContainer: {
    width: Dimensions.get('window').width,
    height: 300,
    backgroundColor: colors.tertiary,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    marginBottom: 16,
  },

  bookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bookInfoContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
  },
  bookTitle: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.textDark,
  },
  bookAuthors: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textLight,
  },

  bookCategoryContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  bookCategory: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textDark,
  },

  bookDetailsContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    backgroundColor: colors.bgLight,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 10,
    padding: 8,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
  },
  bookPublishedDate: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'left',
  },
  bookDescription: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'justify',
  },
  bookPageCount: {
    fontFamily: fonts.light,
    fontSize: 12,
    color: colors.textLight,
  },
  bookLanguage: {
    fontFamily: fonts.light,
    fontSize: 12,
    color: colors.textLight,
  },
  searchAnimation: {
    width: 70,
    height: 70,
  },
});
