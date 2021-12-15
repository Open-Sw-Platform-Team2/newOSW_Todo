//npm install styled-components
//npm install moment
//타이틀 현재 시간 표시 : https://aboutreact.com/react-native-get-current-date-time/

/*개인적인 견해지만 나중에 테마 구현을 고려한다면
styled-components를 이용한 스타일링이 활용도가 높다고 생각합니다! */

import React, {useState, useEffect} from 'react';
import { StatusBar, SafeAreaView, Text, Dimensions, View, ScrollView } from 'react-native';
//import { ViewStyles, textStyles, barStyles } from '../styles';
import Input from '../components/Input';
import { images } from '../Images';
import IconButton from '../components/IconButton';
import Task from '../components/Task'
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import moment from 'moment';

export default function HomeScreen() {

    const width = Dimensions.get('window').width;
    
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        var date = moment()
            .utcOffset('+09:00')
            .format(' YYYY.MM.DD ');
            setCurrentDate(date);
    }, []);

    const [isReady, setIsReady] = useState(false);

    const [newTask, setNewTask] = useState('');

    const [tasks, setTasks] = useState({});

    const _saveTasks = async tasks => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        } catch (e) {
            console.error(e);
        }
    };

    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    };

    const _addTask = () => {
        alert(`Add: ${newTask}`);
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: {id: ID, text: newTask, completed: false},
        };
        setNewTask('');
        _saveTasks({...tasks, ...newTaskObject});
    }

    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        _saveTasks(currentTasks);
    }

    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        _saveTasks(currentTasks);
    };

    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        _saveTasks(currentTasks);
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

    return isReady ? (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar barStyle="light-content" style={theme.background}/>
                <Title>{currentDate}</Title>
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
    ) : (
        <AppLoading
            startAsync = {_loadTasks}
            onFinish={() => setIsReady(true)}
            onError={console.error}/>
    );
};

//현재날짜표시 나중에  clock.js로 분리하기
const todayTitle = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    let DayOfWeek = week[now.getDay()];

    return todayYear + '.' + todayMonth + '.' + todayDate;
};