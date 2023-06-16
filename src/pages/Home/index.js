import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import {MainContext} from '../../Context/Context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home() {
  const {navigate} = useNavigation();
  const {userData, user, ShowItems, showMenu, setShowMenu} =
    useContext(MainContext);

  return (
    <View style={[GeneralStyles.container, styles.container]}>
      <Text style={styles.SubText}>Welcome to the New York Times</Text>
      <View style={styles.SectionContainer}>
        <TouchableOpacity
          style={styles.Sections}
          onPress={() => navigate('WeeklyItems')}>
          <Image
            style={styles.SectionImage}
            source={require('../../../assets/images/NYTLogo.jpeg')}
          />
          <Text style={styles.SectionTitle}>This Week</Text>
        </TouchableOpacity>

        <View style={styles.MenuContainer}>
          <TouchableOpacity style={styles.Sections} onPress={ShowItems}>
            <Icon
              name="chevron-forward-sharp"
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>

          {showMenu && (
            <>
              <TouchableOpacity
                style={styles.Sections}
                onPress={() => navigate('WeeklyItems')}>
                <Image
                  style={styles.SectionImage}
                  source={require('../../../assets/images/Archive.jpeg')}
                />
                <Text style={styles.SectionTitle}>Archive</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Sections}
                onPress={() => navigate('WeeklyItems')}>
                <Image
                  style={styles.SectionImage}
                  source={require('../../../assets/images/Books.jpeg')}
                />
                <Text style={styles.SectionTitle}>Books</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Sections}
                onPress={() => navigate('WeeklyItems')}>
                <Image
                  style={styles.SectionImage}
                  source={require('../../../assets/images/PopularArticle.jpeg')}
                />
                <Text style={styles.SectionTitle}>Popular Article</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgLight,
    alignItems: 'center',
    gap: 20,
  },
  SubText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.primary,
    textAlign: 'left',
    marginLeft: 20,
  },

  SectionContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 40,
  },

  MenuContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Sections: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  SectionImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  SectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.dark,
    textAlign: 'center',
  },
});
