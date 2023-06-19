import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from '../pages/Account/Account';
import {colors, fonts} from '../Utils/GeneralStyles';
import Register from '../pages/Account/Register';
import Settings from '../pages/Account/Settings';

const Stack = createNativeStackNavigator();

export default function AccountNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="My Account"
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
      <Stack.Screen name="My Account" component={Account} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
