import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';

export default function Maps() {
  return (
    <View style={[GeneralStyles.container, styles.container]}>
      <Text style={styles.SubText}>Maps</Text>
      <MapView
        style={styles.MapView}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
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

  MapView: {
    width: '100%',
    height: 500,
  },

  SubText: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.dark,
    textAlign: 'center',
    marginBottom: 20,
  },
});
