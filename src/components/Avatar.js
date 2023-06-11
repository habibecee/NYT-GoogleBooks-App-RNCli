import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Avatar({style, source}) {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      style={style}
      onPress={() => Navigation.navigate('Account Page')}>
      <AnimatedLottieView source={source} autoPlay />
    </TouchableOpacity>
  );
}
