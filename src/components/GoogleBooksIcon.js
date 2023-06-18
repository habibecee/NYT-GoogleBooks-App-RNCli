import {TouchableOpacity} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {GeneralStyles} from '../Utils/GeneralStyles';

export default function GoogleBooksIcon() {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      style={GeneralStyles.tabIcon}
      onPress={() => Navigation.navigate('Google Books')}>
      <AnimatedLottieView
        source={require('../../assets/animations/BookIcon.json')}
        autoPlay
      />
    </TouchableOpacity>
  );
}
