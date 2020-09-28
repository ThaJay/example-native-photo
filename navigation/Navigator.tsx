import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ImagesScreen from '../screens/ImagesScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const ImagesStack = createStackNavigator<TabOneParamList>();

export default function ImagesNavigator() {
  return (
    <ImagesStack.Navigator>
      <ImagesStack.Screen
        name="Images"
        component={ImagesScreen}
        options={{ headerTitle: 'Images' }}
      />
      <ImagesStack.Screen
        name="ImageDetails"
        component={DetailsScreen}
        options={{ headerTitle: 'Image Details' }}
      />
    </ImagesStack.Navigator>
  );
}
