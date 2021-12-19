//로그인, 회원가입 관리 내비게이션

import React, {useContext} from "react";
import {ThemeContext} from 'styled-components/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, Signup} from '../screens';

const Stack = createStackNavigator();

const AuthStack =()=> {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerTitleAlign: 'center',
                cardStyle: {backgroundColor: theme.backgroundColor},
            }}
            >
            <Stack.Screen name = "Login" components={Login}/>
            <Stack.Screen name = "Signup" components={Signup}/>

        </Stack.Navigator>
    );
};

export default AuthStack;
