import React, {useState} from 'react';
import { StatusBar, SafeAreaView, Text, Dimensions, View, ScrollView } from 'react-native';
import { ViewStyles, textStyles } from './styles';
import Input from './components/Input';
import { images } from './Images';
import IconButton from './components/IconButton';
import Task from './components/Task'

export default function App() {

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

    return (
        <SafeAreaView style={ViewStyles.container}>
            <StatusBar barStyle="light-content" style={textStyles.StatusBar}/>
            <Text style={textStyles.title}>날짜표시예정</Text>
            <Input value={newTask} onChangeText={_handleTextChange}
            onSubmitEditing={_addTask} onBlur={_onBlur} />
                <ScrollView width = {width-20}>
                    {Object.values(tasks).reverse().map(item => (
                        <Task key={item.id} item={item} deleteTask={_deleteTask}
                        toggleTask={_toggleTask} updateTask={_updateTask} />
                    ))}
                </ScrollView>
        </SafeAreaView>
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
