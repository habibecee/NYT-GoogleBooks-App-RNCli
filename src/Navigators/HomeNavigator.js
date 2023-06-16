import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors, fonts} from '../Utils/GeneralStyles';
import Home from '../pages/Home';
import WeeklyItemsDetails from '../pages/WeeklyItemsDetails';
import {Image} from 'react-native';
import HeaderAvatar from '../components/HeaderAvatar';
import WeeklyItems from '../pages/WeeklyItems';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home Page"
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
        name="Home Page"
        component={Home}
        options={{
          title: '',
          headerRight: () => <HeaderAvatar />,
        }}
      />
      <Stack.Screen
        name="WeeklyItems"
        component={WeeklyItems}
        options={{
          title: 'This Week',
          headerRight: () => <HeaderAvatar />,
        }}
      />
      <Stack.Screen
        name="WeeklyItem"
        component={WeeklyItemsDetails}
        options={{
          title: 'This Week',
          headerRight: () => <HeaderAvatar />,
        }}
      />
    </Stack.Navigator>
  );
}
