import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileScreen} from '../screens';
import {ProfileStackParamList} from '../../../navigation/types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator = () => {
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
        name="ProfileMain"
        component={ProfileScreen}
        options={{title: 'My Profile'}}
      />
      {/* Add more profile-related screens here:
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{title: 'Edit Profile'}} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{title: 'Settings'}} />
      */}
    </Stack.Navigator>
  );
};
