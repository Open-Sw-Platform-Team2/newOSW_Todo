import * as React from 'react';
import { Text, View } from 'react-native';
import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
//import {ThemeProvider} from "styled-components/native";


// import {theme} from './native';

/* npm install react-native-vector-icons (옵션 변경은 링크 참조) */
/* https://github.com/oblador/react-native-vector-icons */
/* https://materialdesignicons.com */
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/* npm install @react-navigation/bottom-tabs (옵션 변경은 링크 참조) */
/* https://reactnavigation.org/docs/bottom-tab-navigator */
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import HomeScreen from './screens/HomeScreen';
    import CalendarScreen from './screens/CalendarScreen';
    import ProgressScreen from './screens/ProgressScreen';
    import MyPageScreen from './screens/MyPageScreen';

//테마 관련 import
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import themeReducer from './redux/themeReducer';
//테마 관련 import

const Tab = createBottomTabNavigator();

const ThemedHomeScreen = () => {
  const store = createStore(combineReducers({ themeReducer }), applyMiddleware(thunk));
  return(
    <Provider store={store}><HomeScreen/></Provider>
  )

};

export default function App() {
  return (
   
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarActiveTintColor: '#e91e63', }}
      >
      
      <Tab.Screen name="Home" component={ ThemedHomeScreen }
      options={{ tabBarLabel: 'Home',
      tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="format-list-checks" color={color} size={size} /> ),
      headerShown: false }}
      />

      <Tab.Screen name="Calendar" component={ CalendarScreen }
      options={{ tabBarLabel: 'Calendar',
      tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="calendar-month-outline" color={color} size={size} /> ),
      headerShown: false }}
      />

      <Tab.Screen name="Progress" component={ ProgressScreen }
      options={{ tabBarLabel: 'Progress',
      tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="chart-donut" color={color} size={size} /> ),
      headerShown: false }}
      />

      <Tab.Screen name="MyPage" component={ MyPageScreen }
      options={{ tabBarLabel: 'MyPage',
      tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} /> ),
      tabBarBadge: 2,
      headerShown: false }}
      />

      </Tab.Navigator>
      </NavigationContainer>
      
      );
      }