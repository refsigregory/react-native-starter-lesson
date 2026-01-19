import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens';
import {HomeStackParamList} from '../../../navigation/types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{title: 'Sick Leaves'}}
      />
      {/* Add more home-related screens here if needed:
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{title: 'Notifications'}} />
      */}
    </Stack.Navigator>
  );
};
