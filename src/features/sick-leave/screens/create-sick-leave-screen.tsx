import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Input} from '../../../shared/components/input';
import {Button} from '../../../shared/components/button';
import {useSickLeaves} from '../../../hooks/use-sick-leaves';
// import {SickLeave} from '../../../types';
import {formatDate} from '../../../shared/utils/helpers';
import {CreateSickLeaveScreenProps} from '../../../navigation/types';

export const CreateSickLeaveScreen = ({navigation, route}: CreateSickLeaveScreenProps) => {
  const {createSickLeave, updateSickLeave} = useSickLeaves();
  const editingSickLeave = route?.params?.sickLeave;
  const isEditing = !!editingSickLeave;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [reason, setReason] = useState('');
  const [medicalCertificate, setMedicalCertificate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingSickLeave) {
      setStartDate(new Date(editingSickLeave.startDate));
      setEndDate(new Date(editingSickLeave.endDate));
      setReason(editingSickLeave.reason);
      setMedicalCertificate(editingSickLeave.medicalCertificate || '');
    }
  }, [editingSickLeave]);

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const formatDateForAPI = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleSubmit = async () => {
    if (!reason) {
      Alert.alert('Error', 'Please enter a reason');
      return;
    }

    if (startDate > endDate) {
      Alert.alert('Error', 'Start date must be before or equal to end date');
      return;
    }

    setLoading(true);
    try {
      const data = {
        startDate: formatDateForAPI(startDate),
        endDate: formatDateForAPI(endDate),
        reason,
        medicalCertificate: medicalCertificate || undefined,
      };

      if (isEditing) {
        await updateSickLeave(editingSickLeave.id, data);
        Alert.alert('Success', 'Sick leave updated successfully', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      } else {
        await createSickLeave(data);
        Alert.alert('Success', 'Sick leave request created successfully', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      }
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} sick leave`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          {isEditing ? 'Edit Sick Leave Request' : 'Create Sick Leave Request'}
        </Text>

        <View style={styles.dateField}>
          <Text style={styles.label}>Start Date *</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowStartPicker(true)}>
            <Text style={styles.dateText}>{formatDate(startDate)}</Text>
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleStartDateChange}
            />
          )}
        </View>

        <View style={styles.dateField}>
          <Text style={styles.label}>End Date *</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowEndPicker(true)}>
            <Text style={styles.dateText}>{formatDate(endDate)}</Text>
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleEndDateChange}
              minimumDate={startDate}
            />
          )}
        </View>

        <Input
          label="Reason *"
          value={reason}
          onChangeText={setReason}
          placeholder="Enter reason for sick leave"
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />

        <Input
          label="Medical Certificate (Optional)"
          value={medicalCertificate}
          onChangeText={setMedicalCertificate}
          placeholder="Enter certificate number or details"
        />

        <Button
          title={isEditing ? 'Update Request' : 'Submit Request'}
          onPress={handleSubmit}
          loading={loading}
          buttonStyle={styles.submitButton}
        />

        <Button
          title="Cancel"
          onPress={() => navigation.goBack()}
          variant="secondary"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  dateField: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  dateButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 8,
  },
});
