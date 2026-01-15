import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TouchableOpacity, Alert} from 'react-native';
import {SickLeave} from '../types';
import {formatDate, getDateDifference} from '../utils/helpers';

interface SickLeaveCardProps {
  sickLeave: SickLeave;
  containerStyle?: ViewStyle;
  onEdit?: (sickLeave: SickLeave) => void;
  onDelete?: (id: number) => void;
}

export const SickLeaveCard: React.FC<SickLeaveCardProps> = ({
  sickLeave,
  containerStyle,
  onEdit,
  onDelete,
}) => {
  const days = getDateDifference(sickLeave.startDate, sickLeave.endDate);
  const canEdit = sickLeave.status === 'pending';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return '#27ae60';
      case 'rejected':
        return '#e74c3c';
      default:
        return '#f39c12';
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Sick Leave',
      'Are you sure you want to delete this sick leave request?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete?.(sickLeave.id),
        },
      ],
    );
  };

  return (
    <View style={[styles.card, containerStyle]}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {formatDate(sickLeave.startDate)} - {formatDate(sickLeave.endDate)}
        </Text>
        <View
          style={[
            styles.badge,
            {backgroundColor: getStatusColor(sickLeave.status)},
          ]}>
          <Text style={styles.badgeText}>{sickLeave.status.toUpperCase()}</Text>
        </View>
      </View>

      <Text style={styles.days}>{days} day(s)</Text>
      <Text style={styles.reason} numberOfLines={2}>
        {sickLeave.reason}
      </Text>

      {sickLeave.adminComment && (
        <View style={styles.comment}>
          <Text style={styles.commentLabel}>Admin Comment:</Text>
          <Text style={styles.commentText}>{sickLeave.adminComment}</Text>
        </View>
      )}

      {canEdit && (onEdit || onDelete) && (
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => onEdit(sickLeave)}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  days: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  reason: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  comment: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  commentLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
