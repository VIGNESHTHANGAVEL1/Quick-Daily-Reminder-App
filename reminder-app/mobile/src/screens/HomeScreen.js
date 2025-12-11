import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { getReminders, deleteReminder, updateReminder } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchReminders();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const response = await getReminders();
      setReminders(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load reminders');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Alert.alert('Delete Reminder', 'Are you sure?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteReminder(id);
            setReminders(reminders.filter((r) => r._id !== id));
          } catch (error) {
            Alert.alert('Error', 'Failed to delete reminder');
          }
        },
      },
    ]);
  };

  const handleStatusChange = async (reminder) => {
    try {
      const newStatus = reminder.status === 'active' ? 'completed' : 'active';
      const updated = await updateReminder(reminder._id, { status: newStatus });
      setReminders(reminders.map((r) => (r._id === reminder._id ? updated.data : r)));
    } catch (error) {
      Alert.alert('Error', 'Failed to update reminder');
    }
  };

  const renderReminder = ({ item }) => (
    <TouchableOpacity
      style={[styles.reminderCard, item.status === 'completed' && styles.completed]}
      onPress={() => handleStatusChange(item)}
    >
      <View style={styles.cardContent}>
        <Text style={[styles.title, item.status === 'completed' && styles.completedText]}>
          {item.title}
        </Text>
        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}
        <View style={styles.meta}>
          <Text style={styles.metaText}>📅 {item.date}</Text>
          <Text style={styles.metaText}>🕐 {item.time}</Text>
          <Text style={styles.metaText}>
            {item.repeat === 'once' ? '🔔 Once' : '🔄 Daily'}
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('AddScreen', { reminder: item })}
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDelete(item._id)}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⏰ My Reminders</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#667eea" style={{ marginTop: 20 }} />
      ) : reminders.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No reminders yet!</Text>
        </View>
      ) : (
        <FlatList
          data={reminders}
          renderItem={renderReminder}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddScreen')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  reminderCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completed: {
    opacity: 0.6,
    borderLeftColor: '#28a745',
    backgroundColor: '#f9f9f9',
  },
  cardContent: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  editBtn: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  fabText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
});
