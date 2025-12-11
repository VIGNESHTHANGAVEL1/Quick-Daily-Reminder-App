import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import PushNotification from 'react-native-push-notification';
import HomeScreen from './src/screens/HomeScreen';
import AddScreen from './src/screens/AddScreen';
import { getNotifications } from './src/services/api';

const Tab = createBottomTabNavigator();

// Configure push notifications
PushNotification.configure({
  onNotification(notification) {
    // Handle notification
  },
});

function App() {
  useEffect(() => {
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
