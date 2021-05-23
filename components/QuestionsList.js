import {Text, StyleSheet, Image, View, TouchableOpacity, TextInput, Button, Alert,  Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react';
import InputField from './InputField'
import database from '@react-native-firebase/database';
import Carousel from 'react-native-snap-carousel';
const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 100;
import { InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize, AdEventType, RewardedAdEventType  } from '@react-native-firebase/admob';
const interstitial2 = InterstitialAd.createForAdRequest('ca-app-pub-1116385198791430/2772698847', {
  requestNonPersonalizedAdsOnly: true,
});
const rewarded = RewardedAd.createForAdRequest('ca-app-pub-1116385198791430/8763392128', {
  requestNonPersonalizedAdsOnly: true,
});
const initialState = {
    name: '',
    email: '',
    phone : '',
    about : ''
}


   
    
const QuestionsList = (props) => {
  const [data, setData] = useState([])
  useEffect(() => {
    database().ref('/requests').once('value')
     .then((dataSnapshot) => {
   //   alert(';jsjjss')
       let newdata = dataSnapshot.val();
     //  console.log(dataSnapshot)
     if(dataSnapshot.val())
     {
       let items = Object.values(newdata);
      setData(items)
      
     }
       
      }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
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
    
    goBack = () => {
        props.navigation.goBack()
    }
    const result = (res) => {
      console.log('resss', res)
    }
    const nextScreen = () => {
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
              interstitial2.onAdEvent((type) => {
                if (type === AdEventType.LOADED) {
                  interstitial2.show();
                }
              });
              
              interstitial2.load();
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
   const  _renderItem =  ({item, index}) =>  {
        return (
          <View style={{height :400, backgroundColor : '#16a085', paddingTop : 10}}>
          <Text style={{color :'white', margin:10}}>Q - {item.location}</Text>
              <Text style={{color :'white', marginLeft : 10, marginTop : 5}}>A- {item.name}</Text>
          </View>
      );}
    return( <><View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolbarButton} onPress={() => goBack()}>
             <Image style={{width:30,marginLeft:5,  height:30}}source={require('../images/back.png')}></Image>
             </TouchableOpacity>
             <Text style={styles.toolbarTitle}>Issues List</Text>
             <Text style={styles.toolbarButton}></Text>
         </View>
         <View
        style={{...styles.scrollView, marginTop : 20}}>
         { data.length !== 0? <Carousel
       layout={'tinder'} 
            data={data}
            renderItem={_renderItem}
       sliderWidth={sliderWidth}
        itemWidth={itemWidth}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            autoplay={false}
            snapOnAndroid={true} //to enable snapping on android
            /> : <View><Text style={{textAlign :'center', fontSize : 20}}>Please Wait</Text></View>}
          <TouchableOpacity style={styles.buttonWidth} onPress={() => nextScreen()}>
            <Text style={styles.alignCenter}>Submit Query</Text>
          </TouchableOpacity>
          {/* <Button title="Get Started" onPress={() => callFun()}/> */}
         
        </View>
<View style={{marginTop : 30, alignItems : 'center'}}>
{/* <Button onPress={handleClickEvent} title={'Submit (प्रस्तुत)'}></Button> */}
<BannerAd unitId={'ca-app-pub-1116385198791430/7244288710'} size={BannerAdSize.FULL_BANNER}/>
</View></>)
}

export default QuestionsList;
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