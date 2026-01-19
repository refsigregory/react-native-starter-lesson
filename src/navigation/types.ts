import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {SickLeave} from '../types';

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
};

// Home Stack (within Home Tab)
export type HomeStackParamList = {
  HomeList: undefined;
};

// Profile Stack (within Profile Tab)
export type ProfileStackParamList = {
  ProfileMain: undefined;
};

// Tab Navigator
export type TabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

// Main Stack (contains tabs + cross-feature screens)
export type MainStackParamList = {
  HomeTabs: NavigatorScreenParams<TabParamList>;
  CreateSickLeave: {sickLeave?: SickLeave};
  // Add more cross-feature screens here:
  // EditSickLeave: {sickLeave: SickLeave};
  // SickLeaveDetail: {id: number};
};

// Root Stack (Auth vs Main)
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
};

// Screen Props Types
export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;
export type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'HomeList'>;
export type ProfileScreenProps = NativeStackScreenProps<ProfileStackParamList, 'ProfileMain'>;
export type CreateSickLeaveScreenProps = NativeStackScreenProps<MainStackParamList, 'CreateSickLeave'>;

// Declare global navigation types for TypeScript
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
