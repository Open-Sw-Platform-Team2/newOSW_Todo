import * as React from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    SafeAreaViewComponent,
    TouchableOpacity,
    Button,
    Share,
} from 'react-native';
// import {ScrollView} from "react-native-web";
import LoginScreen from './Login';
import SignupScreen from './Signup';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "react-navigation-stack";
// import Share from 'react-native-share';

//공유하기 기능
const onShare = async () => {
    try {
        const result = await Share.share(
            {
                message: 'sharing',
            } );
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log('activityType!');
            } else {
                console.log('Share!'); }
        } else if (result.action === Share.dismissedAction) {
            console.log('dismissed'); }
    } catch (error) { alert(error.message); }
};

const link =
    Platform.OS ==='ios'


// //링크 생성시 넣기
// const result=await Share.share(
//     {
//         message:'link',
//     }
// );


// const myCustomShare=async()=>{
//     const shareOptions={
//         message:'This is a test message',
//     }
//     try{
//         const ShareResponse = await Share.open(shareOptions);
//     } catch(error){
//         console.log('Error => ', error);
//     }
// };


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
                {/*<Button title="Login" onPress={()=> navigation.navigate('LoginScreen')}/>*/}
                {/*새로 stack navigation 띄우는 것 안됨*/}
                <TouchableOpacity style={styles.userBtn} onPress={()=> navigation.navigate('LoginScreen')}>
                    <Text style={styles.userBtnTxt}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userBtn} onPress={()=> onShare()}>
                    <Text style={styles.userBtnTxt}>Share</Text>
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
    );
}

export default MyPageScreen;


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