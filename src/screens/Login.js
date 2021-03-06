//로그인 화면

import React from 'react';
import styled from 'styled-components';
import {Text, Button} from 'react-native'

const Container = styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
    `;

const Login = ({navigation}) => {
    return (
        <Container>
            <Text>Login Screen</Text>
            <Button title ="Signup" onPress={()=> navigation.navigate('Signup')}/>
        </Container>
    );
};

export default Login;