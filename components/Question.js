import { AdEventType, BannerAd, BannerAdSize, InterstitialAd, RewardedAd, RewardedAdEventType, TestIds } from '@react-native-firebase/admob';
import {Alert, Button, Image, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, { useEffect, useReducer, useRef } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

const interstitial2 = InterstitialAd.createForAdRequest('ca-app-pub-4515670409707693/7225876025', {
  requestNonPersonalizedAdsOnly: true,
});
const rewarded = RewardedAd.createForAdRequest('ca-app-pub-1116385198791430/5625274651', {
  requestNonPersonalizedAdsOnly: true,
});
// import RNUpiPayment from "react-native-upi-pay";

const initialState = {
    name: '',
    email: '',
    phone : '',
    about : ''
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'name':
            return { ...state, name: action.value }
        case 'email':
            return { ...state, email: action.value }
        case 'phone':
            return { ...state, phone: action.value }
        case 'about':
                return { ...state, about: action.value }
        default:
            return state
    }
}

   
    
const Question = (props) => {
  useEffect(() => {
    // rewarded.onAdEvent((type, error, reward) => {
    //   if (type === RewardedAdEventType.LOADED) {
    //     rewarded.show();
    //   }
    //   if (type === RewardedAdEventType.EARNED_REWARD) {
    //     console.log('User earned reward of ', reward);
    //   }
    // });
    
    // rewarded.load();
  }, [])
    const [state, dispatch] = useReducer(reducer, initialState)
    goBack = () => {
        props.navigation.goBack()
    }
    const result = (res) => {
      console.log('resss', res)
    }

    const openLink = () => {
        Linking.openURL('https://www.javatpoint.com/react-native-third-party-libraries')
       }
    const handleClickEvent = () => {
        console.log('state', state, state.phone.length)
       if(state.name && state.email && state.phone && state.about){
           if(state.phone.length == 10){
       database()
       .ref('/member')
       .push({
         name : state.name,
         phone : state.phone,
         email : state.email,
         about : state.about
       })
       .then(() => {
           Alert.alert("You will be notified shortly")
           fetch('https://us-central1-hallowed-grin-213811.cloudfunctions.net/sendPushHelp', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: 'New Member Added',
              body: state.name + state.phone + 'has been aded'
            }),
          })
            .then((response) => result(response))
            .then((responseJson) => {
             
            })
            .catch((error) => {
              console.error('error', error);
            })});
       
    }
    else {
        Alert.alert("Invalid Phone Number")
    }

    }
    else {
        Alert.alert("Please enter all details")
    }
       // alert(`${form['name'].value} ${form['email'].value} ${form['phone'].value}`)
    }

    const storeData = async () => {
        try {
          await AsyncStorage.setItem('premium', 'yes')
        } catch (e) {
          // saving error
        }
      }

    const nextScreen = async () => {
      //  const data =  await AsyncStorage.getItem('premium')
      //  console.log('data is', data)
      interstitial2.onAdEvent((type) => {
        if (type === AdEventType.LOADED) {
          interstitial2.show();
        }
      });
      
      interstitial2.load();
        props.navigation.navigate('list')
        // storeData()
        // RNUpiPayment.initializePayment(
        //     {
        //       vpa: "9646407363@ybl", 
        //       payeeName: "John Doe",
        //       amount: "101",
        //       transactionRef: "aasf-332-aoei-fn",
        //     },
        //     successCallback,
        //     failureCallback
        //   );
    }
    const successCallback = (res) => {
        props.navigation.navigate('list')
      };
    
      const failureCallback = (err) => {
        console.log("res", err);
      };
    return( <><View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolbarButton} onPress={() => goBack()}>
             <Image style={{width:30,marginLeft:5,  height:30}}source={require('../images/back.png')}></Image>
             </TouchableOpacity>
             <Text style={styles.toolbarTitle}>Issue 3</Text>
             <Text style={styles.toolbarButton}></Text>
         </View>
         <View
        style={{...styles.scrollView, marginTop : 20}}>
          <Text style={{textAlign :'center', fontSize : 25, fontWeight : '600'}}>3. Third Party Linking Error </Text>
          <Text style={{textAlign :'center', fontSize : 20, fontWeight : '600', marginTop : 10}}>If you are a beginner or an intermediate, you certainly can face the third party linking issue. If you are using 0.60 or before based react native, you can link the third party automatically (react native link)or manually (by following this) {' '} <Text style={{textDecorationLine: 'underline', color : 'blue'}} onPress={() => openLink()}> link</Text>{' '} But if you are using latest version of react native, you only need to install the library in android and for ios, you need to install pod install for working with third party library such as (react-native-gifted-chat)</Text>
          <TouchableOpacity style={styles.buttonWidth} onPress={() => nextScreen()}>
            <Text style={styles.alignCenter}>Next</Text>
          </TouchableOpacity>
          {/* <Button title="Get Started" onPress={() => callFun()}/> */}
         
        </View>
<View style={{marginTop : 30, alignItems : 'center'}}>
{/* <Button onPress={handleClickEvent} title={'Submit (प्रस्तुत)'}></Button> */}
<BannerAd unitId={'ca-app-pub-4515670409707693/2785419206'} size={BannerAdSize.FULL_BANNER}/>
</View></>)
}

export default Question;
const styles = StyleSheet.create({
    toolbar:{
      backgroundColor:'#e74c3c',
      paddingBottom:10,
      flexDirection:'row' ,
      paddingTop:20   //Step 1,
      
  },
  toolbarButton:{           //Step 2
      color:'#fff',
      textAlign:'center'
  },
  toolbarTitle:{
      color:'#fff',
      textAlign:'center',
      fontWeight:'bold',
      fontSize:20,
      flex : 0.87                //Step 3
  },
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#F5FCFF'
      
    },
    h2text: {
      marginTop: 10,
      fontFamily: 'Helvetica',
      fontSize: 36,
      fontWeight: 'bold',
    },
    fullWidthButtonText: {
      color: 'white'
    },
    flatview: {
     
      paddingTop: 30,
      borderRadius: 2,
      flexDirection: 'row'
    },
    name: {
      fontFamily: 'Verdana',
      fontSize: 18,
      width:200,
      flex: 1, flexWrap: 'wrap'
    },
    email: {
      
    },
    button: {
      textAlign: 'right',
      marginTop:  -10,
      alignSelf: 'stretch'
    },
    noteStyle: {
      margin: 5,
      fontStyle: 'italic',
      color: '#b2bec3',
      fontSize: 10
    },
    featuredTitleStyle: {
      marginHorizontal: 5,
      textShadowColor: '#00000f',
      textShadowOffset: { width: 3, height: 3 },
      textShadowRadius: 3
    },
    fullWidthButton: {
      backgroundColor: 'blue',
      height:30,
      width:'30%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      color:'white',
      marginTop:-20
    },
    buttonWidth : {
      width : '80%',
      backgroundColor : '#e74c3c',
      marginTop : 30,
      height : 40,
      justifyContent : 'center',
      alignSelf : 'center'
    },
    alignCenter : {
      textAlign : 'center',
      color : 'white',
      fontWeight : 'bold'
    }
  });