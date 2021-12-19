//npm install styled-components
//npm install moment
//타이틀 현재 시간 표시 : https://aboutreact.com/react-native-get-current-date-time/

/*개인적인 견해지만 나중에 테마 구현을 고려한다면
styled-components를 이용한 스타일링이 활용도가 높다고 생각합니다! */

import React, {useState, useEffect} from 'react';
import { StatusBar, SafeAreaView, Text, Dimensions, View, ScrollView, Alert } from 'react-native';
//import { ViewStyles, textStyles, barStyles } from '../styles';
import Input from '../components/Input';
import { images } from '../Images';
import IconButton from '../components/IconButton';
import Task from '../components/Task';
import styled, { ThemeProvider } from 'styled-components';

import { lightTheme, darkTheme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { switchTheme } from '../redux/themeAction';
import ThemeChangeButton from '../components/themeChangeButton';
import Modal from 'react-native-modal';
import SearchBar from '../components/SearchBar';
import { TextInput } from 'react-native';

export default function HomeScreen() {
    //검색기능
    const onSearch = (text) => {
        if (text) {
          setSearching(true)
          const temp = text.toLowerCase()
    
          const tempList = dataSource.filter(item => {
            if (item.match(temp))
              return item
          })
          setFiltered(tempList)
        }
        else {
          setSearching(false)
          setFiltered(dataSource)
        }
    }

    //완료 미완료 모아보기
    const [viewAllTasks, setViewAllTasks] = useState(true);
    const [viewCompleteTasks, setViewCompleteTasks] = useState(false);
    const [viewIncompleteTasks, setViewIncompleteTasks] = useState(false);
    //검색기능
    const [isSearching, setIsSearching] = useState(false);
    const [searchText, setSearchText] = useState('');
    const _handleSearchTextChange = text => {
        setSearchText(text);
    };
    //코멘트 추가
    const [CommentModalVisible, setCommentModalVisible] = useState(false);
    const _addComment = () => {
        setCommentModalVisible(true);
    }


    //모달 제어용 state
    const [modalVisible, setModalVisible] = useState(false);
    const [modalOutput, setModalOutput] = useState("View All Tasks");

    const theme = useSelector((state) => state.themeReducer.theme);
    const dispatch = useDispatch();

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

    const _clearAllTask = () => {
        Alert.alert("Confirm", "Clear tasks?",[
            {
            text: "Yes",
            onPress: () => setTasks([]),
            }, { text: "No"},
        ]);
    };

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

    const _searchMode = () => {
        if(isSearching){
            setIsSearching(false);
            setSearchText('');
        }
        else if (!isSearching){
            setIsSearching(true);
        }   
    };


    //스타일 적용
    const Container = styled.SafeAreaView`
        flex: 1;
        align-items: center;
        justify-content: flex-start;
        background-color: ${({theme}) => theme.background};
    `;

    const ButtonContainer = styled.View`
        flex-direction: row;
        align-items: center;
        background-color: ${({theme}) => theme.background};
        border-radius: 10px;
        padding: 5px;
        margin: 3px 0px;
    `;

    const Title = styled.Text`
        font-size: 40px;
        font-weight: 600;
        color: ${({theme}) => theme.main};
        align-self: flex-start;
        margin: 10px auto 10px;
    `;

    const List = styled.ScrollView`
        flex: 1;
        width: ${({width}) => width - 40}px;
    `;

    //sort를 위한 모달
    const StyledModalContainer_filter = styled.View`
        flex-direction: column;
        align-items: center;
        /* 모달창 크기 조절 */
        width: 320px;
        height: 220px;
        background-color: ${({theme}) => theme.background};
        border-radius: 10px;
    `;
    const StyledModalContainer = styled.View`
        flex-direction: column;
        align-items: center;
        /* 모달창 크기 조절 */
        width: 320px;
        height: 500px;
        background-color: ${({theme}) => theme.background};
        border-radius: 10px;
    `;
    const ModalButtionContainer = styled.View`
        flex-direction: row;
        align-items: center;
        background-color: ${({theme}) => theme.background};
    `;
    const StyledModalButton = styled.TouchableOpacity`
        /* Modal Button들의 모달창 내의 높이를 균일하게 하기 위하여 flex를 줌 */
        flex: 1;
        width: 320px;
        justify-content: center;
    `;
    const StyledModalGradeWrapper = styled.View`
        flex: 1;
        width: 320px;
        justify-content: center;
    `;
    const StyledModalGradeText = styled.Text`
        align-self: center;
        color: ${({theme}) => theme.main};
        font-size: 15px;
    `;
    const StyledModalText = styled.Text`
        align-self: center;
        color: ${({theme}) => theme.text};
        font-size: 15px;
    `;
    const HorizentalLine = styled.View`
        background-color: ${({theme}) => theme.text};
        height: 1px;
        align-self: stretch;
    `;
    const StyledModalOpenButton = styled.TouchableOpacity`
        height: 50px;
        width: 50%;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        border-width: 1px;
        border-color: ${({theme}) => theme.text};
    `;
  
    const StyledModalOutputText = styled.Text`
        color: ${({theme}) => theme.text};
        font-size: 20px;
    `;

    const StyledAddCommentModal = styled.TextInput.attrs(({theme})=>({placeholderTextColor: theme.main,
    }))`
        width:320px;
        height: 60%;
        padding: 15px 20px;
        background-color: ${({theme}) => theme.itemBackground};
        font-size: 15px;
        color: ${({theme}) => theme.text};
    `;

    return isReady ? (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar barStyle={theme.statusBarStyle} style={theme.background}/>
                <Title>{currentDate}</Title>
                {isSearching?
                (<SearchBar placeholder='Search items' value={searchText} onChangeText={_handleSearchTextChange}/>
                ):(
                <Input placeholder="+ Add a task" value={newTask} onChangeText={_handleTextChange}
                onSubmitEditing={_addTask} onBlur={_onBlur} />)}
                <ButtonContainer>
                    <StyledModalOpenButton
                        onPress={() => {
                        setModalVisible(true);
                        }}>
                        {/* 모달에서 선택 결과 값을 State로 받아서 화면에 표시 */}
                        <StyledModalOutputText>{modalOutput}</StyledModalOutputText>
                    </StyledModalOpenButton>

                    {theme.mode === "light"? (
                        <ThemeChangeButton type = {images.themeChange} onPressOut={() => dispatch(switchTheme(darkTheme))}/>
                    ) : (
                        <ThemeChangeButton type = {images.themeChange} onPressOut={() => dispatch(switchTheme(lightTheme))}/>
                    )}

                    <IconButton type={images.deleteAll} onPressOut={_clearAllTask}/>
                    <IconButton type={images.search} onPressOut={_searchMode}/>
                </ButtonContainer>
                    
                    {viewAllTasks?
                    (isSearching?
                    (<List width={width}>
                        {Object.values(tasks).reverse().map(item =>{
                        if (item.text.match(searchText))
                        return (
                            <Task key={item.id} text={item.text} item={item} deleteTask={_deleteTask}
                            toggleTask={_toggleTask} updateTask={_updateTask} addComment={_addComment}/>
                        )})}
                    </List>
                    ):(
                    <List width={width}>
                        {Object.values(tasks).reverse().map(item => (
                            <Task key={item.id} text={item.text} item={item} deleteTask={_deleteTask}
                            toggleTask={_toggleTask} updateTask={_updateTask} addComment={_addComment}/>
                        ))}
                    </List>
                    )):(null)}

                    {viewIncompleteTasks?
                    (isSearching?(
                    <List width={width}>
                        {Object.values(tasks).reverse().map(item =>{
                        if ((!item.completed)&&item.text.match(searchText))
                        return (
                            <Task key={item.id} text={item.text} item={item} deleteTask={_deleteTask}
                            toggleTask={_toggleTask} updateTask={_updateTask} addComment={_addComment}/>
                        )})}
                    </List>
                    ):(
                    <List width={width}>
                        {Object.values(tasks).reverse().map(item =>{
                        if (!item.completed)
                        return (
                            <Task key={item.id} text={item.text} item={item} deleteTask={_deleteTask}
                            toggleTask={_toggleTask} updateTask={_updateTask} addComment={_addComment}/>
                        )})}
                    </List>)):(null)}

                    {viewCompleteTasks?
                    (isSearching?(
                    <List width={width}>
                        {Object.values(tasks).reverse().map(item =>{
                        if (item.completed&&item.text.match(searchText))
                        return (
                            <Task key={item.id} text={item.text} item={item} deleteTask={_deleteTask}
                            toggleTask={_toggleTask} updateTask={_updateTask} addComment={_addComment}/>
                        )})}
                    </List>
                    ):(
                    <List width={width}>
                        {Object.values(tasks).reverse().map(item =>{
                        if (item.completed)
                        return (
                            <Task key={item.id} text={item.text} item={item} deleteTask={_deleteTask}
                            toggleTask={_toggleTask} updateTask={_updateTask} addComment={_addComment}/>
                        )})}
                    </List>)
                    ):(null)}


        <Modal
        //isVisible Props에 State 값을 물려주어 On/off control
        isVisible={CommentModalVisible}
        //아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <StyledModalContainer>
          <StyledModalGradeWrapper>
            <StyledModalGradeText>Add Comments</StyledModalGradeText>
          </StyledModalGradeWrapper>
          <HorizentalLine />
          <StyledAddCommentModal
          placeholder="add comments to your task..."/>
          <HorizentalLine />
          <ModalButtionContainer>
          <IconButton type = {images.location}/>
          <IconButton type = {images.addImage}/>
          {/*<IconButton type = {images.cancel}/>
          cancel 버튼 만들어봤는데 둘 중에 하나 선택하시면 될 것 같아요*/}
          </ModalButtionContainer>
          <HorizentalLine />
          <StyledModalButton
            onPress={() => {
              setCommentModalVisible(false);
            }}
          >
            <StyledModalGradeText>Cancel</StyledModalGradeText>
          </StyledModalButton>
        </StyledModalContainer>
      </Modal>


        <Modal
        //isVisible Props에 State 값을 물려주어 On/off control
        isVisible={modalVisible}
        //아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <StyledModalContainer_filter>
          <StyledModalGradeWrapper>
            <StyledModalGradeText>Filter Tasks</StyledModalGradeText>
          </StyledModalGradeWrapper>

          <HorizentalLine />

          <StyledModalButton
            onPress={() => {
              setModalOutput("All Tasks");
              setModalVisible(false);
              setViewAllTasks(true);
              setViewCompleteTasks(false);
              setViewIncompleteTasks(false);
            }}
          >
            <StyledModalText>View All Tasks</StyledModalText>
          </StyledModalButton>

          <HorizentalLine />

          <StyledModalButton
            onPress={() => {
              setModalOutput("Complete Tasks");
              setModalVisible(false);
              setViewAllTasks(false);
              setViewCompleteTasks(true);
              setViewIncompleteTasks(false);
            }}
          >
            <StyledModalText>View Complete Tasks</StyledModalText>
          </StyledModalButton>

          <HorizentalLine />

          <StyledModalButton
            onPress={() => {
              setModalOutput("Incomplete Tasks");
              setModalVisible(false);
              setViewAllTasks(false);
              setViewCompleteTasks(false);
              setViewIncompleteTasks(true);
            }}
          >
            <StyledModalText>View Incomplete Tasks</StyledModalText>
          </StyledModalButton>

          <HorizentalLine />

          <StyledModalButton
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <StyledModalGradeText>Cancel</StyledModalGradeText>
          </StyledModalButton>
        </StyledModalContainer_filter>
      </Modal>

            </Container>
        </ThemeProvider>
    ) : (
        <AppLoading
            startAsync = {_loadTasks}
            onFinish={() => setIsReady(true)}
            onError={console.error}/>
    );
};


