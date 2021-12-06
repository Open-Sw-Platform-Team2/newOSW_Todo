import * as React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'

/* npm install react-native-calendars */
/* https://github.com/wix/react-native-calendars */
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['en'] = {
  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  monthNamesShort: ['Jan.','Feb.','Mar','Apr','May','Jun','Jul.','Aug','Sep','Oct','Nov','Dec'],
  dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  dayNamesShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
  today: 'am\'pm'
};

LocaleConfig.defaultLocale = 'en';

export default function ProgressScreen() {
  return (
    <View style={{ flex: 1 }}>

      <Text>통계 화면 수정중...</Text>

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
        '2021-12-01': {selected: true, selectedColor: 'orange'},
        '2021-12-02': {selected: true, selectedColor: 'red'},
        '2021-12-08': { customStyles: { container: { backgroundColor: 'black' },
        text: { color: 'yellow', fontWeight: 'bold' } } },
        '2021-12-09': { customStyles: { container: { backgroundColor: 'green', elevation: 10 },
        text: { color: 'yellow' } } }
        }}

        // Specify style for calendar container element. Default = {}
        style={{
        borderWidth: 1,
        borderColor: 'blue',
        height: 350
        }}

        // Specify theme properties to override specific styles for calendar parts. Default = {}
        theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'red',
            indicatorColor: 'blue',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
            }}
            />
    </View>
  );
}