import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, fonts} from '../Utils/GeneralStyles';

export default function Button({onPress, title, styleButton, isValid}) {
  return (
    <TouchableOpacity
      style={[styles.ButtonContainer, styleButton]}
      onPress={onPress}
      disabled={isValid ? !isValid : null}>
      <Text style={styles.ButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ButtonContainer: {
    padding: 10,
    borderRadius: 10,
  },
  ButtonText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});
