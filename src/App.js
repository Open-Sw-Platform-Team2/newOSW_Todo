import * as React from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import HomeScreen from './screens/HomeScreen';
    import CalendarScreen from './screens/CalendarScreen';
    import ProgressScreen from './screens/ProgressScreen';
    import MyPageScreen from './screens/MyPageScreen';

// npm install @react-navigation/bottom-tabs 추가 설치 완료
// 하단 메뉴 옵션 변경시 참고
// https://reactnavigation.org/docs/bottom-tab-navigator/

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}
        options={{ headerShown: false }} />

        <Tab.Screen name="Calendar" component={CalendarScreen}
        options={{ headerShown: false }}/>

        <Tab.Screen name="Progress" component={ProgressScreen}
        options={{ headerShown: false }}/>

        <Tab.Screen name="MyPage" component={MyPageScreen}
        options={{ headerShown: false }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}