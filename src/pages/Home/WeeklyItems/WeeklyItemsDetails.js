import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../Utils/GeneralStyles';
import AlarmIcon from '../../../components/Alarm';
import {useNavigation} from '@react-navigation/native';

export default function WeeklyItemsDetails({route}) {
  const {navigate} = useNavigation();
  const item = route.params.item;

  return (
    <ScrollView style={styles.Container}>
      <View style={styles.ImageContainer}>
        <Image
          style={[
            styles.image,
            {
              width: item?.book_image_width,
              height: item?.book_image_height,
            },
          ]}
          source={{uri: item?.book_image}}
        />

        <View style={styles.ImageInfoContainer}>
          <Text style={styles.title}>{item?.title}</Text>
          <AlarmIcon
            style={styles.AlarmIcon}
            onPress={() => navigate('Home')}
          />
        </View>
        <Text style={styles.author}>{item?.author}</Text>
        <Text style={styles.publisher}>{item?.publisher}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{item?.description}</Text>
        <Text style={styles.contributor}>{item?.contributor}</Text>
      </View>

      <View style={styles.ByLinks}>
        {item?.buy_links.map((link, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.ByLinksContainer}
              onPress={() => Linking.openURL(link?.url)}>
              <Text style={styles.ByLinksName}>{link.name}</Text>
              {link.name === 'Amazon' && (
                <Image
                  style={styles.ByLinksLogo}
                  source={require('../../../../assets/images/ByLinksLogos/amazonLogo.png')}
                />
              )}
              {link.name === 'Apple Books' && (
                <Image
                  style={styles.ByLinksLogo}
                  source={require('../../../../assets/images/ByLinksLogos/apple-books-logo.jpeg')}
                />
              )}
              {link.name === 'Barnes and Noble' && (
                <Image
                  style={styles.ByLinksLogo}
                  source={require('../../../../assets/images/ByLinksLogos/BNLogo.png')}
                />
              )}
              {link.name === 'Books-A-Million' && (
                <Image
                  style={styles.ByLinksLogo}
                  source={require('../../../../assets/images/ByLinksLogos/Books-A-Million-logo.png')}
                />
              )}
              {link.name === 'Bookshop' && (
                <Image
                  style={styles.ByLinksLogo}
                  source={require('../../../../assets/images/ByLinksLogos/NytLogo.jpeg')}
                />
              )}
              {link.name === 'IndieBound' && (
                <Image
                  style={styles.ByLinksLogo}
                  source={require('../../../../assets/images/ByLinksLogos/IB-logo.png')}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.bgLight,
    paddingBottom: 20,
  },

  AlarmIcon: {
    position: 'absolute',
    width: 80,
    height: 80,
    right: -100,
    // top: 0,
  },

  ImageContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  image: {},

  ImageInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textWarn,
  },

  author: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.textDark,
  },
  publisher: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textDark,
  },

  descriptionContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    paddingTop: 10,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textPrimary,
    textAlign: 'justify',
  },
  contributor: {
    fontFamily: fonts.light,
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  ByLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  ByLinksContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  ByLinksLogo: {
    width: 35,
    height: 35,
    borderRadius: 15,
  },

  ByLinksName: {
    fontFamily: fonts.light,
    fontSize: 10,
    color: colors.textDark,
  },

  ByLinksGo: {
    fontFamily: fonts.light,
    fontSize: 10,
    color: colors.textDark,
    textDecorationLine: 'underline',
  },
});
