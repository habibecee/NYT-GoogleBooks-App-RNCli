import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {StyleSheet, TouchableOpacity} from 'react-native';

export default function Arrow({name, onPress, source}) {
  return (
    <TouchableOpacity
      style={
        (name === 'bottom' && styles.bottom) ||
        (name === 'left' && styles.left) ||
        (name === 'right' && styles.right)
      }
      onPress={onPress}>
      <AnimatedLottieView source={source} autoPlay />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  right: {
    width: 50,
    height: 50,
    transform: [{rotate: '-90deg'}],
    marginBottom: 10,
  },
  left: {
    width: 50,
    height: 50,
    transform: [{rotate: '90deg'}],
    marginBottom: 10,
  },
  bottom: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
});
