import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../contexts/auth-context';
import {AuthNavigator} from '../features/auth/navigation';
import {HomeTabs} from '../features/home/navigation';
import {CreateSickLeaveScreen} from '../features/sick-leave/screens';
import {Loading} from '../shared/components/loading';
import {RootStackParamList, MainStackParamList} from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
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
        name="HomeTabs"
        component={HomeTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateSickLeave"
        component={CreateSickLeaveScreen}
        options={{title: 'New Request'}}
      />
      {/* Add more feature screens here that need to be accessible from any tab:
      <Stack.Screen name="EditSickLeave" component={EditSickLeaveScreen} options={{title: 'Edit Request'}} />
      <Stack.Screen name="SickLeaveDetail" component={SickLeaveDetailScreen} options={{title: 'Details'}} />
      */}
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  const {isAuthenticated, isLoading} = useAuth();

  if (isLoading) {
    return <Loading message="Loading..." />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {!isAuthenticated ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <RootStack.Screen name="Main" component={MainStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
