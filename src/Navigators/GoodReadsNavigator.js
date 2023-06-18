import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors, fonts} from '../Utils/GeneralStyles';
import HeaderAvatar from '../components/HeaderAvatar';
import GoodReads from '../pages/GoodReads/GoodReads';

const Stack = createNativeStackNavigator();

export default function GoodReadsNavigator({route}) {
  return (
    <Stack.Navigator
      initialRouteName="GoodReads"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: fonts.bold,
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: colors.tertiary,
        },
        headerTintColor: colors.textDark,
        headerBackTitleStyle: {
          fontFamily: fonts.bold,
          color: colors.textDark,
          size: 20,
        },
      }}>
      <Stack.Screen
        name="GoodReads Page"
        component={GoodReads}
        options={{
          title: 'GoodReads Main Page',
          headerRight: () => <HeaderAvatar />,
        }}
      />
    </Stack.Navigator>
  );
}
