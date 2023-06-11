import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {GeneralStyles} from '../../Utils/GeneralStyles';
import database from '@react-native-firebase/database';

export default function Home() {
  return (
    <View style={GeneralStyles.container}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
