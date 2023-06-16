import {View, Text} from 'react-native';
import React from 'react';

export default function WeeklyItemsDetails({route}) {
  const item = route.params.item;
  return (
    <View>
      <Text>WeeklyItemsDetails</Text>
    </View>
  );
}
