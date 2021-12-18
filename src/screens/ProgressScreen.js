import * as React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'

/* npm install react-native-progress --save */
/* https://github.com/oblador/react-native-progress */
import * as Progress from 'react-native-progress';

/* npm install react-native-calendars */
/* https://github.com/wix/react-native-calendars */
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

/* 달력 정보 */
LocaleConfig.locales['en'] = {
  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  monthNamesShort: ['Jan.','Feb.','Mar','Apr','May','Jun','Jul.','Aug','Sep','Oct','Nov','Dec'],
  dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  dayNamesShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
  today: 'am\'pm'
};

LocaleConfig.defaultLocale = 'en';

/* 달력 하단 (프로그레스) 목록 스타일 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3F7F2',
        },

    item: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        height: 125,
        justifyContent: 'space-around',
        //alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        //borderWidth: 1,
        //borderStyle: 'dashed',
        //borderColor: 'red',
        },

    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
        },
    });

/* 목록 데이터 */
const DATA = [
  {
    id: '1',
    title: 'Study',
  },
  {
    id: '2',
    title: 'React',
  },
  {
    id: '3',
    title: 'Native Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>
    { title }
    </Text>
    <Progress.Bar
        borderColor='#00a87e'
        color='#00a87e'
        //height={ 10 }
        progress={ 0.3 }
        width={ null }
        />
    <Text style={{ textAlign: 'right' }}>
    3 / 10 or 30%
    </Text>
  </View>
);

export default function ProgressScreen() {
    const renderItem = ({ item }) => (
        <Item title={item.title} />
        );

  return (
    <View style={{ flex: 1 }}>

      <Calendar
        // 현재 날짜, Default = Date()
        current={Date()}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={undefined}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={undefined}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {console.log('selected day', day)}}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {console.log('selected day', day)}}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {console.log('month changed', month)}}
        // Hide month navigation arrows. Default = false
        hideArrows={false}

        // Replace default arrows with "custom" ones (direction can be 'left' or 'right')
        //renderArrow={(direction) => direction === 'left' ? <Icon name="circledowno" size={30} color="#4F8EF7" /> : <Icon name="circledowno" size={30} color="#4F8EF7" />}

        // Do not show days of other months in month page. Default = false
        hideExtraDays={false}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={false}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={7}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={false}
        // Disable right arrow. Default = false
        disableArrowRight={false}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={false}

        // Replace default month and year title with "custom" one. the function receive a date as parameter
        //renderHeader={(date) => {/*Return JSX*/}}

        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={false}

        markingType={'custom'}
        markedDates={{
        '2021-12-07': { customStyles: {
                                  container: { backgroundColor: 'red' },
                                  text: { color: 'white', fontWeight: 'bold' }
                                  }},

        '2021-12-08': { customStyles: {
                                  container: { backgroundColor: 'orange' },
                                  text: { color: 'white', fontWeight: 'bold' }
                                  }},

        '2021-12-09': { customStyles: {
            container: { backgroundColor: 'green' },
            text: { color: 'white', fontWeight: 'bold' }
            }},
        }}

        // Specify style for calendar container element. Default = {}
        style={{
        //borderWidth: 1,
        //borderColor: 'blue',
        height: 330
        }}

        // Specify theme properties to override specific styles for calendar parts. Default = {}
        theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',

            todayTextColor: '#008563',

            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            //dotColor: '#00adf5',
            //selectedDotColor: '#ffffff',

            arrowColor: 'green',

            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'green',
            indicatorColor: 'blue',
            textDayFontFamily: 'sans-serif',
            textMonthFontFamily: 'sans-serif',
            textDayHeaderFontFamily: 'sans-serif',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',

            textDayFontSize: 16,
            textMonthFontSize: 22,
            textDayHeaderFontSize: 16

/*
            'stylesheet.calendar.header': {
            dayTextAtIndex0: { color: '#d52712' },
            dayTextAtIndex1: { color: 'black' },
          dayTextAtIndex2: { color: 'black' },
            dayTextAtIndex3: { color: 'black' },
            dayTextAtIndex4: { color: 'black' },
            dayTextAtIndex5: { color: 'black' },
           dayTextAtIndex6: { color: '#0f59e6' },
         }*/


            }}
            />


    <View style={styles.container}>
        <Text style={{
        padding: 15,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        //fontFamily: 'sans-serif',
        color: '#008563',
        }}>
        Completion Rate
        </Text>

        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            />
        </View>

    </View>
  );
}