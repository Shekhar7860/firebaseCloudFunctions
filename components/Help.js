import {Text, StyleSheet, Image, View, TouchableOpacity, TextInput, Button, Alert, ScrollView} from 'react-native'
import React, { useEffect, useRef, useReducer } from 'react';
import InputField from './InputField'
import database from '@react-native-firebase/database';
import { InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize, AdEventType, RewardedAdEventType  } from '@react-native-firebase/admob';
const rewarded = RewardedAd.createForAdRequest('ca-app-pub-1116385198791430/5537250561', {
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
  useEffect(() => {
    rewarded.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        rewarded.show();
      }
      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log('User earned reward of ', reward);
      }
    });
    
    rewarded.load();
  }, [])
    const [state, dispatch] = useReducer(reducer, initialState)
    goBack = () => {
        props.navigation.goBack()
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
           fetch('https://us-central1-hallowed-grin-213811.cloudfunctions.net/sendPush', {
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
        if(first == 'description'){
            dispatch({ type: 'description', value: second })
         }
    }
    
    return( <><View style={styles.toolbar}>
                <TouchableOpacity style={styles.toolbarButton} onPress={() => goBack()}>
                     <Image style={{width:30,marginLeft:5,  height:30}}source={require('../images/back.png')}></Image>
                     </TouchableOpacity>
                     <Text style={styles.toolbarTitle}>Need Help</Text>
                     <Text style={styles.toolbarButton}></Text>
                 </View>
                 <BannerAd unitId={'ca-app-pub-1116385198791430/7780270526'} size={BannerAdSize.FULL_BANNER}/>
                 <View style={{flex:1, marginBottom : 20}}>
                   <ScrollView >
                 <Text style={{textAlign :'center', fontSize : 20, fontWeight : '600', marginTop : 20}}>Below Are The List Of Services You Can Get From This App (ऑनलाइन लेनदेन ऐप में आपका स्वागत है)?</Text>
                 <Text style={{textAlign :'center', fontSize : 20, fontWeight : '600', marginTop : 20}}>1. Book Hotels/Tickets/Buses/Trains (बुक होटल / टिकट / बस / ट्रेनें)</Text>
                 <Text style={{textAlign :'center', fontSize : 20, fontWeight : '600', marginTop : 20}}>2. Purchase Things Online (चीजें ऑनलाइन खरीदें)</Text>
                 <Text style={{textAlign :'center', fontSize : 20, fontWeight : '600', marginTop : 20}}>3. Order Anything for your beloved instantly (
अपने प्रिय के लिए तुरंत कुछ भी ऑर्डर करें)</Text>
                 <Text style={{textAlign :'center', fontSize : 20, fontWeight : '600', marginTop : 20}}>4. Other Online Transactions (अन्य ऑनलाइन लेनदेन)</Text>

                 <Text style={{textAlign :'center', fontSize : 20, fontWeight : '600', marginTop : 20}}>Additional Services (अतिरिक्त सेवाएं)</Text>
                 <Text style={{textAlign :'center', fontSize : 20, fontWeight : '600', marginTop : 20}}>1. Fill A Govt Online Form (एक ऑनलाइन फॉर्म भरें)</Text>
                 <Text style={{textAlign :'center', fontSize : 20, fontWeight : '600', marginTop : 20}}>2. Translate any text in english, write any article in english (
कोई भी लेख अंग्रेजी में लिखें )</Text>
<Text style={{textAlign :'center', fontSize : 20, fontWeight : '600', marginTop : 20}}>3. Other Online Work You Dont Know How To Do (
अन्य ऑनलाइन कार्य आप न जाने कैसे )</Text>
          <TouchableOpacity style={styles.buttonWidth} onPress={() => props.navigation.navigate('Member')}>
          <Text style={styles.alignCenter}>Give Your Task</Text>
          </TouchableOpacity>
                 </ScrollView>
                 
       {/* <InputField  name={'name'} placeholder={'Name'} keyboardType={'default'} getFunc ={(first, second) => alertFunc(first, second)}/>
       <InputField  name={'email'} placeholder={'Email'} keyboardType={'default'} getFunc ={(first, second) => alertFunc(first, second)}/>
       <InputField  name={'phone'} placeholder={'Phone'} maxLength={10} keyboardType={'numeric'} getFunc ={(first, second) => alertFunc(first, second)}/>
       <InputField  name={'description'} placeholder={'Describe Issue'}  keyboardType={'default'} getFunc ={(first, second) => alertFunc(first, second)} height={100}   textAlignVertical = {'top'}/> */}
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
      marginTop : 20,
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