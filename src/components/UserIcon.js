import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GeneralStyles} from '../Utils/GeneralStyles';

export default function UserIcon() {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      style={GeneralStyles.tabIcon}
      onPress={() => Navigation.navigate('Account')}>
      <AnimatedLottieView
        source={require('../../assets/animations/user.json')}
        autoPlay
        loop
        duration={8500}
      />
    </TouchableOpacity>
  );
}
