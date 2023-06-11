import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import Avatar from '../../components/Avatar';
import LogIn from '../../components/LogIn';
import {MainContext} from '../../Context/Context';
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';
import Button from '../../components/Button';

export default function Account() {
  const {navigate} = useNavigation();
  const {user, logOut, handleSubmit} = useContext(MainContext);

  if (user) {
    return (
      <View style={[GeneralStyles.container, styles.container]}>
        <FlashMessage position="top" />
        <Avatar
          style={styles.AccountAvatar}
          source={require('../../../assets/animations/girl-book.json')}
        />

        <View style={styles.AccountDetail}>
          <Image source={{uri: user?.photoURL}} style={styles.AccountImage} />
          <Text style={styles.AccountText}>
            {' '}
            Welcome! {user?.uid} {user?.email}{' '}
          </Text>
        </View>
        <Button
          onPress={() => navigate('Settings', {id: user?.uid, item: user})}
          title="Account Settings"
          styleButton={{backgroundColor: colors.dark, marginBottom: 20}}
        />

        <Button
          onPress={handleSubmit(logOut)}
          title="Log Out "
          styleButton={{backgroundColor: colors.primary}}
        />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[GeneralStyles.container, styles.container]}>
        <FlashMessage position="top" />
        <Avatar
          style={styles.Avatar}
          source={require('../../../assets/animations/searchUsers.json')}
        />
        <Text style={styles.SubText}>Do you have an account? </Text>
        <Text style={styles.SubText}>Log In now!</Text>

        <LogIn />

        <Text style={styles.SubText}> Or? </Text>

        <Button
          onPress={() => navigate('Register')}
          title="Register"
          styleButton={{backgroundColor: colors.primary}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },

  Avatar: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    marginBottom: 20,
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  AccountAvatar: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    marginBottom: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
  },

  AccountDetail: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
  },
  AccountImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
  },
  AccountText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.dark,
    textAlign: 'center',
  },

  SubText: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.dark,
    textAlign: 'center',
    marginBottom: 20,
  },
});
