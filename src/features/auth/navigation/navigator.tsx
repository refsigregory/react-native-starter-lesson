import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens';
import {AuthStackParamList} from '../../../navigation/types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
