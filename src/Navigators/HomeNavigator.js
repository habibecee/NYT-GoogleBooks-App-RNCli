import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors, fonts} from '../Utils/GeneralStyles';
import Home from '../pages/Home';
import WeeklyItemsDetails from '../pages/WeeklyItemsDetails';

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
        options={{headerShown: false}}
        name="Home Page"
        component={Home}
      />
      <Stack.Screen name="WeeklyItem" component={WeeklyItemsDetails} />
    </Stack.Navigator>
  );
}
