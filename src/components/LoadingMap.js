import {View, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {GeneralStyles} from '../Utils/GeneralStyles';

export default function LoadingMap() {
  return (
    <SafeAreaView style={GeneralStyles.SafeAreaView}>
      <View style={GeneralStyles.container}>
        <AnimatedLottieView
          style={styles.AnimatedLottieView}
          source={require('../../assets/animations/locations.json')}
          autoPlay
          loop
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AnimatedLottieView: {
    flex: 1,
  },
});
