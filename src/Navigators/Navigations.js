import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Account from '../pages/Account';
import LogIn from '../pages/LogIn';
import {GeneralStyles, colors, fonts} from '../Utils/GeneralStyles';
import HomeIcon from '../components/HomeIcon';
import UserIcon from '../components/UserIcon';
import {SafeAreaView} from 'react-native';
import SignIn from '../pages/SignIn';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Account"
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
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{
          title: 'Log In',
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'Sign In',
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <SafeAreaView style={GeneralStyles.SafeAreaView}>
        <Tab.Navigator
          screenOptions={() => ({
            tabBarActiveTintColor: colors.dark,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: colors.tertiary,
              justifyContent: 'center',
              alignItems: 'center',
              height: 75,
              padding: 10,
            },
            tabBarLabelStyle: {
              fontFamily: fonts.bold,
              fontSize: 18,
            },
          })}
          initialRouteName="MyAccount">
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,

              tabBarIcon: () => <HomeIcon />,
            }}
          />
          <Tab.Screen
            name="MyAccount"
            component={StackNavigator}
            options={{
              headerShown: false,

              tabBarIcon: () => <UserIcon />,
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default Navigation;
