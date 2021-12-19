/*SoyeunMin, add Duedate*/

/*
npm install @react-native-async-storage/async-storage
npm install moment
npm install react-native-calendar-picker
*/
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-web';
/*scrollview로 달력에서 화면을 내리면 duedate 저장 리스트가 뜨게 하려고 했으나
이유를 알 수 없는 오류가 떠 보류했습니다.*/

export default function App() {

  const [date, setDate] = useState('')
  const [date1, setDate1] = useState('')
  const [expense, setDeadline] = useState('')
  const [memo, setMemo] = useState('')

  async function date_change(d) {
    console.log(d.format('YYYYMMDD'));
    setDate(d.format('YYYYMMDD'));
    setDate1(d.format('MMMM DD, YYYY'))
    
    var key = d.format('YYYYMMDD');
    var value = await AsyncStorageLib.getItem(key);
    var value_m = await AsyncStorageLib.getItem(key + 'm');

    console.log(value);

    if (value !== null) {
      setDeadline(value)
      setMemo(value_m)
    }
    else {
      setDeadline('')
      setMemo('')
    }
  }

  async function save_memo() {
    await AsyncStorageLib.setItem(date, expense)
    await AsyncStorageLib.setItem(date + 'm', memo)
  }

  return (
    <View style={styles.container}>
      <CalendarPicker onDateChange={date_change}/>
      <View style={styles.box}>
        <Text style={styles.datetext}>{ date1 }</Text>
        <View style={styles.row}>
          <Text style={styles.text}>Deadline: </Text>
          <TextInput style={styles.expense} keyboardType="numeric" onChangeText={setDeadline} value={expense}/>
          <Button title="Save" onPress={save_memo}/>
        </View>
        <TextInput style={styles.memo} placeholder="Memo" onChangeText={setMemo} value={memo}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  box: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  datetext: {
    fontSize: 20,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  expense: {
    flex: 1,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: 'blue',
  },
  memo: {
    borderBottomWidth: 1,
    fontSize: 16,
    marginTop: 10,
    color: 'blue',
  }
});