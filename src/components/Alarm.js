import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GeneralStyles} from '../Utils/GeneralStyles';

export default function AlarmIcon({style}) {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity style={style} onPress={() => Navigation.navigate('Maps')}>
      <AnimatedLottieView
        source={require('../../assets/animations/bell.json')}
        autoPlay
      />
    </TouchableOpacity>
  );
}
