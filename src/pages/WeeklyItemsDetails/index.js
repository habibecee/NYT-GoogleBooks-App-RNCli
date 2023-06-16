import {View, Text} from 'react-native';
import React from 'react';

export default function WeeklyItemsDetails({route}) {
  const id = route.params.id;
  return (
    <View>
      <Text>WeeklyItemsDetails</Text>
    </View>
  );
}
