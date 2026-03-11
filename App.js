// App
// - Purpose: Application entry point. Sets up React Navigation with Home and Inventory screens.
// - Output: NavigationContainer with stack navigator containing `Home` and `Inventory`.

import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import HomeScreen from './screens/HomeScreen';
import InventoryScreen from './screens/InventoryScreen';
import BrowserScreen from './screens/BrowserScreen';
import BasketScreen from './screens/BasketScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  // A ref to the navigator so we can navigate from outside a screen component.
  const navigationRef = useRef(null);

  useEffect(() => {
    // Navigate to the basket when the user taps a notification.
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response received:', response);
      console.log('[Notification tapped] navigating to basket');
      navigationRef.current?.navigate('Basket');
    });
    return () => subscription.remove();
  }, []);
  
  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Inventory') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Browse') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Basket') {
              iconName = focused ? 'cart' : 'cart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2f95dc',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Inventory" component={InventoryScreen} />
        <Tab.Screen name="Browse" component={BrowserScreen} />
        <Tab.Screen name="Basket" component={BasketScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
