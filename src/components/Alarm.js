import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {TouchableOpacity} from 'react-native';

export default function AlarmIcon({style, onPress}) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <AnimatedLottieView
        source={require('../../assets/animations/bell.json')}
        autoPlay
      />
    </TouchableOpacity>
  );
}
