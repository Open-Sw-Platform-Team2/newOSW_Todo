import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ProgressScreen from '../screens/ProgressScreen';
import MyPageScreen from '../screens/MyPageScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" components={Home}/>
            <Stack.Screen name="Calendar" components={Calendar}/>
            <Stack.Screen name="Home" components={Home}/>

        </Stack.Navigator>
    )
}