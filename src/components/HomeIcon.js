import {TouchableOpacity} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {GeneralStyles} from '../Utils/GeneralStyles';

export default function HomeIcon() {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      style={GeneralStyles.tabIcon}
      onPress={() => Navigation.navigate('Home')}>
      <AnimatedLottieView
        source={require('../../assets/animations/homeIcon.json')}
        autoPlay
        loop
        duration={8500}
      />
    </TouchableOpacity>
  );
}
