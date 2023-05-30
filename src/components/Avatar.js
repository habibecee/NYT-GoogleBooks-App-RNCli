import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GeneralStyles} from '../Utils/GeneralStyles';

export default function Avatar({style}) {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      style={style}
      onPress={() => Navigation.navigate('Account')}>
      <AnimatedLottieView
        source={require('../../assets/animations/simpleUserIcon.json')}
        autoPlay
      />
    </TouchableOpacity>
  );
}
