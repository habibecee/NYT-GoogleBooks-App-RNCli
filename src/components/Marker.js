import {Callout, Marker} from 'react-native-maps';
import React from 'react';
import {View, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {colors} from '../Utils/GeneralStyles';

export default function UserMarker({
  coordinate,
  title,
  description,
  UserImage,
  onPress,
}) {
  return (
    <Marker coordinate={coordinate} title={title} description={description}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.ImageContainer}>
          <Image style={styles.Image} source={UserImage} />
        </View>
      </TouchableWithoutFeedback>
    </Marker>
  );
}

const styles = StyleSheet.create({
  ImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.tertiary,
    borderWidth: 1,
    borderColor: colors.dark,
  },
  Image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
