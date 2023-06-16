import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {colors, fonts} from '../Utils/GeneralStyles';
import {useNavigation} from '@react-navigation/native';
import {MainContext} from '../Context/Context';
import Avatar from './Avatar';

export default function HeaderAvatar() {
  const {navigate} = useNavigation();
  const {user, logOut, handleSubmit, userData} = useContext(MainContext);

  if (user) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigate('Account Page')}>
        <Image style={styles.Avatar} source={{uri: userData?.avatar}} />

        <Text style={styles.SubText}>{userData?.username}</Text>
      </TouchableOpacity>
    );
  }

  if (!user) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigate('Account Page')}>
        <Avatar
          style={styles.Avatar}
          source={require('../../assets/animations/simpleUserIcon.json')}
        />
        <Text style={styles.SubText}>Sign In</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },

  Avatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },

  SubText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.primary,
  },
});
