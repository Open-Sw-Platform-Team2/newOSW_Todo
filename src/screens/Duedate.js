import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

export default function App() {

  const [date, setDate] = useState('')
  const [date1, setDate1] = useState('')
  const [expense, setExpense] = useState('')
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
      setExpense(value)
      setMemo(value_m)
    }
    else {
      setExpense('')
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
          <Text style={styles.text}>Duedate</Text>
          <TextInput style={styles.expense} keyboardType="numeric" onChangeText={setExpense} value={expense}/>
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