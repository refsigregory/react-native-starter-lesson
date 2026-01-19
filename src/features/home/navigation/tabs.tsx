import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HomeNavigator} from './navigator';
import {ProfileNavigator} from '../../profile/navigation';
import {TabParamList} from '../../../navigation/types';

const Tab = createBottomTabNavigator<TabParamList>();

const HomeIcon = ({color, size}: {color: string; size: number}) => (
  <Icon name="home" size={size} color={color} />
);

const PersonIcon = ({color, size}: {color: string; size: number}) => (
  <Icon name="person" size={size} color={color} />
);

export const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: PersonIcon,
        }}
      />
    </Tab.Navigator>
  );
};
