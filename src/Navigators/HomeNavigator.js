import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors, fonts} from '../Utils/GeneralStyles';
import Home from '../pages/Home/Home';
import HeaderAvatar from '../components/HeaderAvatar';
import WeeklyItems from '../pages/Home/WeeklyItems/WeeklyItems';
import WeeklyItemsDetails from '../pages/Home/WeeklyItems/WeeklyItemsDetails';
import Archive from '../pages/Home/Archive/Archive';
import Books from '../pages/Home/Books/Books';
import Article from '../pages/Home/Article/Article';

const Stack = createNativeStackNavigator();

export default function HomeNavigator({route}) {
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
          title: 'Best Sellers',
          headerRight: () => <HeaderAvatar />,
        }}
      />
      <Stack.Screen
        name="WeeklyItemsDetails"
        component={WeeklyItemsDetails}
        options={({route}) => {
          return {
            title: route?.params?.item?.title,
            headerRight: () => <HeaderAvatar />,
          };
        }}
      />
      <Stack.Screen
        name="Archive"
        component={Archive}
        options={{
          title: 'Archive',
          headerRight: () => <HeaderAvatar />,
        }}
      />
      <Stack.Screen
        name="Books"
        component={Books}
        options={{
          title: 'Books',
          headerRight: () => <HeaderAvatar />,
        }}
      />
      <Stack.Screen
        name="Article"
        component={Article}
        options={{
          title: 'Article',
          headerRight: () => <HeaderAvatar />,
        }}
      />
    </Stack.Navigator>
  );
}
