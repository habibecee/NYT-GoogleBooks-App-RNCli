import {View, Text, StyleSheet, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GeneralStyles} from '../../Utils/GeneralStyles';

export default function Account() {
  const {navigate} = useNavigation();
  return (
    <View style={GeneralStyles.container}>
      <Text>Account</Text>
      <Button title="Log In" onPress={() => navigate('LogIn')} />
      <Button title="Sign In" onPress={() => navigate('SignIn')} />
    </View>
  );
}

const styles = StyleSheet.create({});
