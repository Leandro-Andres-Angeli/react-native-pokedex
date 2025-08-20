/* eslint-disable react-native/no-inline-styles */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import Tab2 from './Tab2';
import Tab1 from './Tab1';

const Tab = createBottomTabNavigator();
const TabIcon = ({ color, name }: { color: string; name: string }) => (
  <Icon color={color} size={20} name={name} />
);
const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5856D6',
        tabBarLabelStyle: {
          marginBottom: 10,
        },
        tabBarStyle: {
          backgroundColor: 'rgba(255,255,255,.7)',
          borderWidth: 0,
          elevation: 0,
          position: 'absolute',
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Listado',

          tabBarIcon: ({ color }) => TabIcon({ color, name: 'list-outline' }),
        }}
        component={Tab1}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarLabel: 'Buscar',

          tabBarIcon: ({ color }) => TabIcon({ color, name: 'search-outline' }),
        }}
        component={Tab2}
      />
      {/* <Tab.Screen
        name="SearchScreen"
        options={{
          tabBarLabel: 'Buscar',

          tabBarIcon: ({ color }) => TabIcon({ color, name: 'search-outline' }),
        }}
        component={SearchScreen}
      /> */}
    </Tab.Navigator>
  );
};

export default Tabs;
