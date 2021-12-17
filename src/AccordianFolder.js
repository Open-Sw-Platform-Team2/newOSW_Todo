import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image,Dimensions,ScrollView } from 'react-native';
import SimpleAccordion from 'react-native-simple-accordian';
const deviceWidth = Dimensions.get('window').width
const accordianData = 'This is sample Accordian Text....';
import * as _ from 'lodash'

const sampleAccordianData = [
  {
    title: 'Accordian 1 ',
    content: accordianData
  },
  {
    title: 'Accordian 2',
    content: accordianData
  },
  {
    title: 'Accordian 3',
    content: accordianData
  },
  {
    title: 'Accordian 4 ',
    content: accordianData
  },
  {
    title: 'Accordian 5',
    content: accordianData
  },
  {
    title: 'Accordian 6',
    content: accordianData
  },
  
];

export default class AccordianExample extends Component {
    constructor(props){
        super(props)
        this.state = ({
            content:'',
            open: false,
        });
    }

  onChangeAccordian(section) {
    this.setState({ open: section });

  }

  renderHeader(section, i, isOpen) {
    return (
      <View style={{backgroundColor:'#ffffff',flexDirection:'row'}}>
        <Text style={[styles.headerText,{width:deviceWidth-80,padding:10,textAlign:'left'}]}>{section.title}</Text>
      </View>
    );
  }

  renderContent(section, i, isOpen) {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  }

  render() {
    return (   
            <SimpleAccordion
              style= {{
                borderWidth:1,
                borderRadius:25,
                margin:10,
                padding:10,
                backgroundColor:'#ffffff'
              }}
              activeSection={this.state.open}
              sections={sampleAccordianData}
              touchableComponent={TouchableOpacity}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={1000}
              onChange={this.onChangeAccordian.bind(this)}
            />    
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'#2c2c2c'
      
    },
    headerText1:{
      color:'white',
      textAlign:'center',
      fontSize:22
     
    },
    headerTextView:{
      height:50,
      borderWidth:1,
      backgroundColor:'#383636',
      justifyContent:'center',
    },
    title: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: '300',
      marginBottom: 20,
      color:'#ffffff'
    },
    header:{
        flex:1
    },
    headerText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
    },
    content: {
      padding: 20,
      backgroundColor: '#ffffff'
    },
  });
    