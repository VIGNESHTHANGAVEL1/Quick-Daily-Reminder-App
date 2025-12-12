import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createReminder, updateReminder } from '../services/api';

export default function AddScreen({ route, navigation }) {
  const reminder = route?.params?.reminder;
  const [title, setTitle] = useState(reminder?.title || '');
  const [description, setDescription] = useState(reminder?.description || '');
  const [date, setDate] = useState(reminder?.date || '');
  const [time, setTime] = useState(reminder?.time || '');
  const [repeat, setRepeat] = useState(reminder?.repeat || 'once');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !date || !time) {
      Alert.alert('Error', 'Title, date, and time are required');
      return;
    }

    setLoading(true);
    try {
      const data = {
        title: title.trim(),
        description: description.trim(),
        date,
        time,
        repeat,
      };

      if (reminder) {
        await updateReminder(reminder._id, data);
        Alert.alert('Success', 'Reminder updated!');
      } else {
        await createReminder(data);
        Alert.alert('Success', 'Reminder created!');
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to save reminder');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {reminder ? 'Edit Reminder' : 'Add Reminder'}
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter reminder title"
            value={title}
            onChangeText={setTitle}
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { minHeight: 80 }]}
            placeholder="Enter reminder description"
            value={description}
            onChangeText={setDescription}
            editable={!loading}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Date *</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={date}
              onChangeText={setDate}
              editable={!loading}
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 12 }]}>
            <Text style={styles.label}>Time *</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM"
              value={time}
              onChangeText={setTime}
              editable={!loading}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Repeat</Text>
          <Picker
            selectedValue={repeat}
            onValueChange={setRepeat}
            enabled={!loading}
            style={styles.picker}
          >
            <Picker.Item label="Once" value="once" />
            <Picker.Item label="Daily" value="daily" />
          </Picker>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Saving...' : reminder ? 'Update' : 'Create'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonCancel, loading && { opacity: 0.6 }]}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.buttonCancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#667eea',
    padding: 20,
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  form: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 14,
    color: '#333',
  },
  picker: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 4,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonCancel: {
    backgroundColor: '#6c757d',
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonCancelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
