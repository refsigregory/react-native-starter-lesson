import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../contexts/auth-context';
import {LoginScreen} from '../screens/login-screen';
import {HomeScreen} from '../screens/home-screen';
import {CreateSickLeaveScreen} from '../screens/create-sick-leave-screen';
import {ProfileScreen} from '../screens/profile-screen';
import {Loading} from '../components/loading';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeIcon = ({color, size}: {color: string; size: number}) => (
  <Icon name="home" size={size} color={color} />
);

const PersonIcon = ({color, size}: {color: string; size: number}) => (
  <Icon name="person" size={size} color={color} />
);

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          title: 'Sick Leaves',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          title: 'My Profile',
          tabBarIcon: PersonIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const {isAuthenticated, isLoading} = useAuth();

  if (isLoading) {
    return <Loading message="Loading..." />;
  }

  return (
    <NavigationContainer>
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
        {!isAuthenticated ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={HomeTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CreateSickLeave"
              component={CreateSickLeaveScreen}
              options={{title: 'New Request'}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
