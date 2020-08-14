import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import MachineScreen from './modules/components/MachineScreen';
import WeightScreen from './modules/components/WeightScreen';
import DistanceScreen from './modules/components/DistanceScreen';
import SettingsScreen from './modules/components/SettingsScreen';

declare const global: {HermesInternal: null | {}};

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            var iconName: string = '';
            if (route.name === 'Machines') {
              iconName = focused ? 'bicycle' : 'bicycle-outline';
            } else if (route.name === 'Weight') {
              iconName = focused ? 'barbell-sharp' : 'barbell-outline';
            } else if (route.name === 'Distance') {
              iconName = focused ? 'ios-walk' : 'ios-walk-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-options' : 'ios-options-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'dimgray',
          showLabel: false,
        }}>
        <Tab.Screen name="Machines" component={MachineScreen} />
        <Tab.Screen name="Weight" component={WeightScreen} />
        <Tab.Screen name="Distance" component={DistanceScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
