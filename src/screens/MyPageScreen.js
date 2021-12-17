import * as React from 'react';
import { Text, View, Image, ScrollView, SafeAreaView, StyleSheet, SafeAreaViewComponent,TouchableOpacity,} from 'react-native';
// import {ScrollView} from "react-native-web";

const MyPageScreen = ({navigation}) => {
    return (
        // <SafeAreaView> //회색박스 생기는 에러 발생부분
            <ScrollView style = {{flex:1, backgroundColor: '#fff'}}
                        style={styles.container}
                        contentContainerStyle={{justifyContent: 'center',alignItems: 'center'}}
                        showsVerticalScrollIndicator={false}>
                <Text style = {styles.userName}>Ewhayeon</Text>
                <Text style = {styles.userId}>ewhain@ewhain.net</Text>
                <View style = {styles.userBtnWrapper}>
                    {/*Todo: 본인 계정일 때만 뜨도록 변경해야함*/}
                    <TouchableOpacity style={styles.userBtn}>
                        <Text style={styles.userBtnTxt}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.userBtn}>
                        <Text style={styles.userBtnTxt}>Log out</Text>
                    </TouchableOpacity>
                </View>
                {/*  부가정보  */}
                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>122</Text>
                        <Text style={styles.userInfoSubTitle}>Todo Items</Text>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>5</Text>
                        <Text style={styles.userInfoSubTitle}>Friends</Text>
                    </View>
                </View>

            </ScrollView>
        // </SafeAreaView>
    )
}

export default MyPageScreen;
// {
//   // return (
//   //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   //     <Text>마이 페이지 작업</Text>
//   //   </View>
//   // );
// }

//사용할 스타일
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    aboutUser: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    },
    userBtnTxt: {
        color: '#2e64e5',
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
    },
    userInfoItem: {
        justifyContent: 'center',
    },
    userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    userInfoSubTitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});