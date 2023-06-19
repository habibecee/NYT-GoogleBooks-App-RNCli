import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors, fonts} from '../Utils/GeneralStyles';
import HeaderAvatar from '../components/HeaderAvatar';
import Books from '../pages/Books/Books';
import BookDetails from '../pages/Books/BookDetails';

const Stack = createNativeStackNavigator();

export default function BooksNavigator({route}) {
  return (
    <Stack.Navigator
      initialRouteName="Books"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: fonts.bold,
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: colors.tertiary,
          alignItems: 'center',
        },
        headerTintColor: colors.textDark,
        headerBackTitleStyle: {
          fontFamily: fonts.bold,
          color: colors.textDark,
          size: 20,
        },
      }}>
      <Stack.Screen
        name="Books"
        component={Books}
        options={{
          title: 'Search Books',
          headerRight: () => <HeaderAvatar />,
        }}
      />
      <Stack.Screen
        name="BookDetails"
        component={BookDetails}
        options={({route}) => {
          return {
            title: route?.params?.item?.volumeInfo?.title,
            headerRight: () => <HeaderAvatar />,
          };
        }}
      />
    </Stack.Navigator>
  );
}
