import { AdEventType, BannerAd, BannerAdSize, InterstitialAd, RewardedAd, RewardedAdEventType, TestIds } from '@react-native-firebase/admob';
import {Alert, Button, Image, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, { useEffect, useReducer, useRef } from 'react';

import InputField from './InputField'
import database from '@react-native-firebase/database';

const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-4515670409707693/4495770908', {
  requestNonPersonalizedAdsOnly: true,
});
const rewarded = RewardedAd.createForAdRequest('ca-app-pub-4515670409707693/1707307102', {
  requestNonPersonalizedAdsOnly: true,
});

const initialState = {
    name: '',
    email: '',
    phone : '',
    description : ''
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'name':
            return { ...state, name: action.value }
        case 'email':
            return { ...state, email: action.value }
        case 'phone':
            return { ...state, phone: action.value }
        case 'description':
                return { ...state, description: action.value }
        default:
            return state
    }
}
const Help = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
      interstitial.onAdEvent((type) => {
        if (type === AdEventType.LOADED) {
          interstitial.show();
        }
      });
      
      interstitial.load();
    }, [])
    goBack = () => {
        props.navigation.goBack()
    }
    const result = (res) => {
      console.log('resss', res)
    }

    const handleClickEvent = () => {
        //console.log('state', state)
       if(state.name && state.email && state.phone && state.description){
           if(state.phone.length == 10){
       database()
       .ref('/help')
       .push({
         name : state.name,
         phone : state.phone,
         email : state.email,
         description : state.description
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
              title: 'Help Needed',
              body: state.name + state.phone + 'Help Needed'
            }),
          })
            .then((response) => result(response))
            .then((responseJson) => {
              console.log('respos', responseJson);
              rewarded.onAdEvent((type, error, reward) => {
                if (type === RewardedAdEventType.LOADED) {
                  rewarded.show();
                }
                if (type === RewardedAdEventType.EARNED_REWARD) {
                  console.log('User earned reward of ', reward);
                }
              });
              
              rewarded.load();
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

    const nextScreen = () => {
      props.navigation.navigate('Member')
    }
const openLink = () => {
 Linking.openURL('https://stackoverflow.com/questions/44446523/unable-to-load-script-from-assets-index-android-bundle-on-windows')
}
    const alertFunc = (first, second) => {
           if(first == 'name'){
           dispatch({ type: 'name', value: second })
        }
        if(first == 'email'){
           dispatch({ type: 'email', value: second })
        }
        if(first == 'phone'){
           dispatch({ type: 'phone', value: second })
        }
        if(first == 'description'){
            dispatch({ type: 'description', value: second })
         }
    }
    
    return( <><View style={styles.toolbar}>
                <TouchableOpacity style={styles.toolbarButton} onPress={() => goBack()}>
                     <Image style={{width:30,marginLeft:5,  height:30}}source={require('../images/back.png')}></Image>
                     </TouchableOpacity>
                     <Text style={styles.toolbarTitle}>React Native Common Issues</Text>
                     <Text style={styles.toolbarButton}></Text>
                 </View>
                 
        <View
          style={styles.scrollView}>
          <Text style={{textAlign :'center', fontSize : 25, fontWeight : '600'}}>1. Red Screen Error (Unable to resolve scripts from assets/could not connect to development server) </Text>
          <Text style={{textAlign :'center', fontSize : 20, fontWeight : '600', marginTop : 10}}>This is most common error which is faced by any fresher who start learning react native. Basically, this is the issue due to bundler. If you want to run an android/ios app on your phone, you need to start development server (local server by typing npm start). Then, if your android phone is connected through usb cable and your sdk path is correct, you will be good to go. But, if you still face an error, you need to type command - adb reverse tcp:8081 tcp:8081. By opening terminal inside platform tools of sdk path <Text style={{textDecorationLine: 'underline', color : 'blue'}} onPress={() => openLink()}>link</Text></Text>
          <TouchableOpacity style={styles.buttonWidth} onPress={() => nextScreen()}>
            <Text style={styles.alignCenter}>Next</Text>
          </TouchableOpacity>
          {/* <Button title="Get Started" onPress={() => callFun()}/> */}
         
        </View>
      
     <View style={{marginTop : 10, alignItems : 'center'}}>
     <BannerAd  unitId={'ca-app-pub-4515670409707693/6738790864'} size={BannerAdSize.FULL_BANNER}/>
      </View> 
      </>)
}

export default Help

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
      marginTop : 10,
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