import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Platform } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import AddScreen from './src/screens/AddScreen';
import { getNotifications } from './src/services/api';

const Tab = createBottomTabNavigator();

// Conditionally import push notifications only for Android
let PushNotification = null;
if (Platform.OS === 'android') {
  PushNotification = require('react-native-push-notification').default;
  
  // Configure push notifications for Android only
  PushNotification.configure({
    onNotification: function(notification) {
      console.log('Notification:', notification);
    },
    senderID: undefined,
    requestPermissions: false,
    channelId: 'default',
    playSound: true,
    soundName: 'default',
    vibrate: true,
    vibration: 300,
  });
}

function App() {
  useEffect(() => {
    // Only set up notifications for Android
    if (Platform.OS === 'android' && PushNotification) {
      // Create notification channel for Android (required for Android 8.0+)
      PushNotification.createChannel(
        {
          channelId: 'default',
          channelName: 'Reminder Notifications',
          channelDescription: 'Notifications for reminders',
          playSound: true,
          soundName: 'default',
          importance: 4, // High importance
          vibrate: true,
        },
        (created) => console.log(`Channel created: ${created}`)
      );

      // Poll for notifications every 10 seconds
      const pollNotifications = async () => {
        try {
          const response = await getNotifications();
          if (response.data.length > 0) {
            response.data.forEach((notif) => {
              PushNotification.localNotification({
                channelId: 'default',
                title: notif.title,
                message: notif.description || 'Reminder triggered!',
                playSound: true,
                soundName: 'default',
                vibrate: true,
              });
            });
          }
        } catch (error) {
          console.error('Failed to fetch notifications:', error);
        }
      };

      // Initial poll
      pollNotifications();

      // Set up interval
      const interval = setInterval(pollNotifications, 10000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let label = '';
          if (route.name === 'Home') {
            label = '📝';
          } else if (route.name === 'Add') {
            label = '➕';
          }
          return <Text style={{ fontSize: size, color }}>{label}</Text>;
        },
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: '#999',
      })}
    >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Reminders' }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{ title: 'Add Reminder' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default App;
