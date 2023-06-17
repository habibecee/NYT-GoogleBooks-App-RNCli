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

export default function WeeklyItemsDetails({route}) {
  const item = route.params.item;

  return (
    <ScrollView style={styles.Container}>
      <AlarmIcon style={styles.AlarmIcon} onPress={() => navigate('Account')} />
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

        <Text style={styles.title}>{item?.title}</Text>
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
    right: -10,
    top: 0,
  },

  ImageContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  image: {},

  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textDark,
  },

  author: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textDark,
  },
  publisher: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textLight,
  },

  descriptionContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textDark,
    textAlign: 'justify',
  },
  contributor: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textLight,
    textAlign: 'right',
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
