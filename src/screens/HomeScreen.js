import React, {useState} from 'react';
import { StatusBar, SafeAreaView, Text, Dimensions, View, ScrollView } from 'react-native';
//import { ViewStyles, textStyles, barStyles } from '../styles';
import Input from '../components/Input';
import { images } from '../Images';
import IconButton from '../components/IconButton';
import Task from '../components/Task'
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import moment from 'moment';
import AccordianExample from '../AccordianFolder';
import { useSelector, useDispatch } from 'react-redux';
import { switchTheme } from '../redux/themeAction';


export default function HomeScreen() {

    const theme = useSelector((state) => state.themeReducer.theme);
    const dispatch = useDispatch();

    const width = Dimensions.get('window').width;

    const [newTask, setNewTask] = useState('');

    const [tasks, setTasks] = useState({
        '1': {id: '1', text: "Todo item #1", completed: false},
        '2': {id: '2', text: "Todo item #2", completed: true},
    });

    const _addTask = () => {
        alert(`Add: ${newTask}`);
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: {id: ID, text: newTask, completed: false},
        };
        setNewTask('');
        setTasks({...tasks, ...newTaskObject});
    }

    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
    }

    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        setTasks(currentTasks);
    };

    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        setTasks(currentTasks);
    };

    const _onBlur = () => {
        setNewTask('');
    };

    const _handleTextChange = text => {
        setNewTask(text);
    };

    //스타일 적용
    const Container = styled.SafeAreaView`
        flex: 1;
        align-items: center;
        justify-content: flex-start;
        background-color: ${({theme}) => theme.background};
    `;

    const Title = styled.Text`
        font-size: 40px;
        font-weight: 600;
        color: ${({theme}) => theme.main};
        align-self: flex-start;
        margin: 0px auto 0px;
    `;

    const List = styled.ScrollView`
        flex: 1;
        width: ${({width}) => width - 20}px;
    `;

    const Button = styled.TouchableOpacity`
        margin: 32px 0;
        background-color: ${({theme}) => theme.itemBackground};
        padding: 16px 32px;
        border-radius: 6px;
    `;

    const ButtonText = styled.Text`
        font-size: 15px;
        font-weight: 600;
        color: ${({theme}) => theme.main};
    `
    return isReady ? (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar barStyle={theme.statusBarStyle} style={theme.background}/>
                <Title>{currentDate}</Title>
                {theme.mode === "light"? (
                    <Button onPress={() => dispatch(switchTheme(darkTheme))}>
                        <ButtonText>Change to Dark Theme</ButtonText>
                    </Button>
                ) : (
                    <Button onPress={() => dispatch(switchTheme(lightTheme))}>
                        <ButtonText>Change to Light Theme</ButtonText>
                    </Button>
                )}
                <Input placeholder="+ Add a task" value={newTask} onChangeText={_handleTextChange}
                onSubmitEditing={_addTask} onBlur={_onBlur} />
                    <List width={width}>
                        {Object.values(tasks).reverse().map(item => (
                            <Task key={item.id} text={item.text} item={item} deleteTask={_deleteTask}
                            toggleTask={_toggleTask} updateTask={_updateTask} />
                        ))}
                    </List>
            </Container>
        </ThemeProvider>
  
    );
};

