import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSickLeaves} from '../../../hooks/use-sick-leaves';
import {SickLeaveCard} from '../../sick-leave/components/sick-leave-card';
import {Loading} from '../../../shared/components/loading';
import {useAuth} from '../../../contexts/auth-context';
import {getFullName} from '../../../shared/utils/helpers';
import {User, SickLeave} from '../../../types';
import {HomeScreenProps} from '../../../navigation/types';

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {user} = useAuth();
  const {sickLeaves, loading, fetchMySickLeaves, deleteSickLeave} = useSickLeaves();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadSickLeaves();
  }, []);

  const loadSickLeaves = async () => {
    try {
      await fetchMySickLeaves();
    } catch (error) {
      console.error('Failed to load sick leaves:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSickLeaves();
    setRefreshing(false);
  };

  const handleEdit = (sickLeave: SickLeave) => {
    navigation.navigate('CreateSickLeave', {sickLeave});
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSickLeave(id);
      Alert.alert('Success', 'Sick leave deleted successfully');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to delete sick leave');
    }
  };

  if (loading && !refreshing) {
    return <Loading message="Loading sick leaves..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hello, {user ? getFullName((user as User).firstName, (user as User).lastName) : 'User'}
        </Text>
        <Text style={styles.subtitle}>Your Sick Leave Requests</Text>
      </View>

      <FlatList
        data={sickLeaves}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <SickLeaveCard
            sickLeave={item}
            containerStyle={styles.card}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No sick leave requests yet</Text>
            <Text style={styles.emptySubtext}>
              Create your first request using the + button
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateSickLeave')}>
        <Icon name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
  },
});
