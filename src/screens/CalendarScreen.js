import React, {useState} from 'react';
import {Button, Text, View, StyleSheet, Image, TextInput, ImageBackground, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarPicker from 'react-native-calendar-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop:40,
    },
    
    datetext: {
        fontSize:20,
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
  
    memo: {
        borderBottomWidth: 1,
        fontSize: 16,
        marginTop: 10,
        color: 'blue',
    },
    memoshort: {
      width: 350, height:40, borderColor: '#999',borderWidth:1, borderRadius:10, padding:10, textAlignVertical:'top',
    },
    
    memolong: {
        width: 350, height:300, borderColor: '#999',borderWidth:1, borderRadius:10, padding:10, textAlignVertical:'top',
    },
});

var list=[];
var L=[];


export default function App(){
    
  return(
  
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= "Calendar" component={CalendarScreen}/>
        <Stack.Screen name= "Todo History" component={HistoryScreen}/>
        <Stack.Screen name= "Note" component={NoteScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
  }  


function CalendarScreen({navigation}) {
    async function date_change(d){
      //console.log(d.format('YYYYMMDD'));

      var date = d.format('YYYYMMDD');

      var val_type = '';
      var val_topic = '';
      var val_content = '';

      var value = await AsyncStorage.getItem(date);
      var value_m = await AsyncStorage.getItem(date+'m');
      var value_n = await AsyncStorage.getItem(date+'n');

  
      if(value !== null) {
        val_type = value;
        val_topic= value_m;
        val_content= value_n;
      }

      navigation.navigate('Note', 
      {date: d, type: val_type, topic: val_topic, content: val_content});
    }
    return (
      <View style={styles.container}>
      <View style={{margin:10}}>
        <CalendarPicker onDateChange={date_change}/>

        <View style={{height:70}} /> 

        <Image style={{ marginLeft:20, width:50, height:50}}
          source={require('./assets/list.png')} 
          onTouchStart={function() {navigation.navigate('Todo History')}}/>
      </View>
      </View>
    );
}

function NoteScreen({route, navigation}) {
  var d= route.params.date;

  const [date, setDate] = useState(d.format('YYYYMMDD'));
  const [date1, setDate1] = useState(d.format('MMMM DD, YYYY'));
  const [date2, setDate2] = useState(d.format('MM/DD'))
  const [type, setType]= useState(route.params.type);
  const [topic, setTopic] = useState(route.params.topic);
  const [content, setContent] =useState(route.params.content);
  const [refresh, setRefresh] =useState(0);


  async function save_note() {
    //console.log(date);
    await AsyncStorage.setItem(date, type)
    await AsyncStorage.setItem(date+'m', topic)
    await AsyncStorage.setItem(date+'n', content)
    
    
    list.push({date: date2, type: type, topic: topic, content: content});
    
  
    
    for(i=0; i<list.length; i++) {
    console.log(i)
    console.log(list[i].date)
    console.log(list[i].type)
    console.log(list[i].topic)
    console.log(list[i].content)
    
    console.log('--------------------------')
    var a = <Text style={styles.text}>{list[i].date} {list[i].type}: {list[i].topic}_ {list[i].content} </Text>
    L[i]=a;
    setRefresh(refresh+1);}
  
}

  return (
    
    <ImageBackground style={{height: 800, width:'100%'}}
      source={require('./assets/paper.jpg')}>
    <View style={styles.container}>
      <View style={{margin:20}}>
                <Text style={styles.datetext}>{date1}</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>Type  </Text>
                    
                    <Image style={{width:35, height:35}} 
                        source={require('./assets/routine.png')}
                        onTouchStart={function (){setType('routine')}}
                    />
                    <View style={{width:5}}/>
                    <Image style={{width:35, height:35}} 
                        source={require('./assets/study.png')}
                        onTouchStart={function (){setType('study')}}
                    />
                    <View style={{width:5}}/>
                    <Image style={{width:35, height:35}} 
                        source={require('./assets/promise.png')}
                        onTouchStart={function (){setType('promise')}}
                    />
                    <View style={{width:5}}/>
                    <Image style={{width:35, height:35}} 
                        source={require('./assets/meeting.png')}
                        onTouchStart={function (){setType('meeting')}}
                    />
                    <View style={{width:5}}/>
                    <Image style={{width:35, height:35}} 
                        source={require('./assets/housekeeping.png')}
                        onTouchStart={function (){setType('housekeeping')}}
                    />
                    <View style={{width:10}}/>
  
                </View>

                <Text style={styles.text}>It's {type}</Text>
                
                <View style={{height:10}}/>
                <TextInput style={styles.memoshort} placeholder="Topic"
                    onChangeText={setTopic} value={topic} />
                <View style={{height:20}}/>
                <TextInput style={styles.memolong} placeholder="Content" multiline={true}
                    onChangeText={setContent} value={content} />
                <View style={{height:10}}/>
               
                <View style={{flexDirection:'row'}}>
                  <Image style={{ width:60, height:60}}
                    source={require('./assets/list.png')} 
                    onTouchStart={function() {navigation.navigate('Todo History')}}/> 
                  <View style={{width:20}}/>
                  <Image style={{ width:60, height:60}}
                    source={require('./assets/save.png')} 
                    onTouchStart={save_note}

                    /> 
                </View>
                
              
                
      </View>          
    </View>
    </ImageBackground>
  )
  

}

function HistoryScreen({navigation}) {
  return(
    <ScrollView>
      <ImageBackground style={{height: 800, width:'100%'}}
      source={require('./assets/paper.jpg')}>
      <View style={{padding:20}}>

      <View>{L}</View>
      
      </View>
      <Button title="Calendar"
          onPress={ function() {navigation.navigate('Calendar')}}/>
      
      </ImageBackground>
    </ScrollView>
  );
}