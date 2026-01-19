import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Button} from '../../../shared/components/button';
import {useAuth} from '../../../contexts/auth-context';
import {getFullName} from '../../../shared/utils/helpers';
import {User} from '../../../types';
import {ProfileScreenProps} from '../../../navigation/types';

export const ProfileScreen = ({}: ProfileScreenProps) => {
  const {user, logout} = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Logout', onPress: logout, style: 'destructive'},
    ]);
  };

  if (!user) {
    return null;
  }

  const userData = user as User;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {userData.firstName[0]}
            {userData.lastName[0]}
          </Text>
        </View>
        <Text style={styles.name}>
          {getFullName(userData.firstName, userData.lastName)}
        </Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>

      <View style={styles.infoSection}>
        {userData.department && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Department</Text>
            <Text style={styles.value}>{userData.department}</Text>
          </View>
        )}

        {userData.position && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Position</Text>
            <Text style={styles.value}>{userData.position}</Text>
          </View>
        )}

        {userData.phone && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{userData.phone}</Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <Text style={styles.label}>Status</Text>
          <Text
            style={[
              styles.value,
              userData.isActive ? styles.active : styles.inactive,
            ]}>
            {userData.isActive ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="danger"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  active: {
    color: '#27ae60',
  },
  inactive: {
    color: '#e74c3c',
  },
  actions: {
    padding: 24,
  },
});
