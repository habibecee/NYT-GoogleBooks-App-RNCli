import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import Avatar from '../../components/Avatar';
import LogIn from './Components/LogIn';
import {MainContext} from '../../Context/Context';
import FlashMessage from 'react-native-flash-message';
import Button from '../../components/Button';

export default function Account() {
  const {navigate} = useNavigation();
  const {user, logOut, handleSubmit, userData} = useContext(MainContext);

  if (user) {
    return (
      <View style={[GeneralStyles.container, styles.container]}>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <Text style={styles.AccountText}>Welcome!</Text>
          <ScrollView style={styles.ScrollView}>
            <FlashMessage position="top" />

            {userData?.avatar ? (
              <View style={styles.AccountDetail}>
                <Image
                  source={{uri: userData?.avatar}}
                  style={styles.AccountAvatar}
                />

                <Text style={styles.AccountText}>{userData?.username}</Text>
              </View>
            ) : (
              <Avatar
                style={styles.AccountAvatar}
                source={require('../../../assets/animations/girl-book.json')}
              />
            )}

            <Button
              onPress={() => navigate('Settings', {uid: user?.uid})}
              title="Account Settings"
              styleButton={{backgroundColor: colors.dark, marginBottom: 20}}
            />

            <Button
              onPress={handleSubmit(logOut)}
              title="Log Out "
              styleButton={{backgroundColor: colors.primary}}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[GeneralStyles.container, styles.container]}>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <ScrollView style={styles.ScrollView}>
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
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
  },

  ScrollView: {
    flex: 1,
    width: '100%',
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
    marginBottom: 20,
  },

  AccountText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.secondary,
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
