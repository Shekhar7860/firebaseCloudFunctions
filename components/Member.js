import { AdEventType, BannerAd, BannerAdSize, InterstitialAd, RewardedAd, RewardedAdEventType, TestIds } from '@react-native-firebase/admob';
import {Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, { useEffect, useReducer, useRef } from 'react';

import InputField from './InputField'
import database from '@react-native-firebase/database';

const interstitial2 = InterstitialAd.createForAdRequest('ca-app-pub-4515670409707693/7738362983', {
  requestNonPersonalizedAdsOnly: true,
});
const rewarded = RewardedAd.createForAdRequest('ca-app-pub-4515670409707693/1707307102', {
  requestNonPersonalizedAdsOnly: true,
});
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

   
    
const Member = (props) => {
  useEffect(() => {
    
  }, [])
    const [state, dispatch] = useReducer(reducer, initialState)
    goBack = () => {
        props.navigation.goBack()
    }
    const result = (res) => {
      console.log('resss', res)
    }
    const nextScreen = () => {
      interstitial2.onAdEvent((type) => {
        if (type === AdEventType.LOADED) {
          interstitial2.show();
        }
      });
      
      interstitial2.load();
      props.navigation.navigate('Question')
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
        if(first == 'about'){
            dispatch({ type: 'about', value: second })
         }
    }
    return( <><View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolbarButton} onPress={() => goBack()}>
             <Image style={{width:30,marginLeft:5,  height:30}}source={require('../images/back.png')}></Image>
             </TouchableOpacity>
             <Text style={styles.toolbarTitle}>Issue 2</Text>
             <Text style={styles.toolbarButton}></Text>
         </View>
         <View
        style={{...styles.scrollView, marginTop : 20}}>
          <Text style={{textAlign :'center', fontSize : 25, fontWeight : '600'}}>2. Android App Run Error </Text>
          <Text style={{textAlign :'center', fontSize : 20, fontWeight : '600', marginTop : 10}}>Another common issue faced by most freshers or even developers is the issue of app running in android device or in emulator. Most developers waste so much of time in resolving this issue. But this issue can be resolved in 2-3 seconds. You only need to place local.properties file (that contains path of sdk) inside android folder<Text style={{textDecorationLine: 'underline', color : 'blue'}} onPress={() => openLink()}>link</Text></Text>
          <TouchableOpacity style={styles.buttonWidth} onPress={() => nextScreen()}>
            <Text style={styles.alignCenter}>Next</Text>
          </TouchableOpacity>
          {/* <Button title="Get Started" onPress={() => callFun()}/> */}
         
        </View>
<View style={{marginTop : 30, alignItems : 'center'}}>
{/* <Button onPress={handleClickEvent} title={'Submit (प्रस्तुत)'}></Button> */}
<BannerAd unitId={'ca-app-pub-4515670409707693/2799545856'} size={BannerAdSize.FULL_BANNER}/>
</View></>)
}

export default Member;
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