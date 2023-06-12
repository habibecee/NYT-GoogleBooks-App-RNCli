import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors, fonts} from '../Utils/GeneralStyles';
import Maps from '../pages/Maps';

const Stack = createNativeStackNavigator();

export default function MapNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Maps Page"
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
      <Stack.Screen name="Maps Page" component={Maps} />
    </Stack.Navigator>
  );
}
