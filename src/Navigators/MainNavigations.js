import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GeneralStyles, colors, fonts} from '../Utils/GeneralStyles';
import HomeIcon from '../components/HomeIcon';
import UserIcon from '../components/UserIcon';
import AccountNavigator from './AccountNavigator';
import HomeNavigator from './HomeNavigator';
import Loading from '../components/Loading';
import {useContext, useEffect} from 'react';
import {MainContext} from '../Context/Context';
import MapNavigator from './MapNavigator';
import MapIcon from '../components/MapIcon';
import GoogleBooksIcon from '../components/GoogleBooksIcon';
import BooksNavigator from './BooksNavigator';

const Tab = createBottomTabNavigator();

function MainNavigation() {
  const {user, loading} = useContext(MainContext);

  if (loading) {
    return <Loading />;
  }

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
              paddingHorizontal: 10,
            },
            tabBarLabelStyle: {
              fontFamily: fonts.bold,
              fontSize: 18,
            },
          })}
          initialRouteName={user ? 'Home' : 'Account Page'}>
          <Tab.Screen
            name="Home"
            component={HomeNavigator}
            options={{
              headerShown: false,

              tabBarIcon: () => <HomeIcon />,
            }}
          />
          <Tab.Screen
            name="Google Books"
            component={BooksNavigator}
            options={{
              headerShown: false,

              tabBarIcon: () => <GoogleBooksIcon />,
            }}
          />
          <Tab.Screen
            name="Maps"
            component={MapNavigator}
            options={{
              headerShown: false,

              tabBarIcon: () => <MapIcon />,
            }}
          />
          <Tab.Screen
            name="My Account"
            component={AccountNavigator}
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

export default MainNavigation;
