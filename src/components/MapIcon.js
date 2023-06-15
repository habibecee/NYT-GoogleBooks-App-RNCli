import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GeneralStyles} from '../Utils/GeneralStyles';

export default function MapIcon() {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      style={GeneralStyles.tabIcon}
      onPress={() => Navigation.navigate('Maps')}>
      <AnimatedLottieView
        source={require('../../assets/animations/travel-world.json')}
        autoPlay
      />
    </TouchableOpacity>
  );
}
