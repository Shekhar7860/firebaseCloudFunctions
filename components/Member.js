import {Text, StyleSheet, Image, View, TouchableOpacity, TextInput, Button, Alert} from 'react-native'
import React, { useEffect, useRef, useReducer } from 'react';
import InputField from './InputField'
import database from '@react-native-firebase/database';
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

   
    
const Member = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    goBack = () => {
        props.navigation.goBack()
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
           fetch('https://us-central1-hallowed-grin-213811.cloudfunctions.net/sendPush', {
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
        if(first == 'about'){
            dispatch({ type: 'about', value: second })
         }
    }
    return( <><View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolbarButton} onPress={() => goBack()}>
             <Image style={{width:30,marginLeft:5,  height:30}}source={require('../images/back.png')}></Image>
             </TouchableOpacity>
             <Text style={styles.toolbarTitle}>Become Member</Text>
             <Text style={styles.toolbarButton}></Text>
         </View>
         <View>
<InputField  name={'name'} placeholder={'Name'} keyboardType={'default'} getFunc ={(first, second) => alertFunc(first, second)}/>
<InputField  name={'email'} placeholder={'Email'} keyboardType={'default'} getFunc ={(first, second) => alertFunc(first, second)}/>
<InputField  name={'phone'} placeholder={'Phone'} maxLength={10} keyboardType={'numeric'} getFunc ={(first, second) => alertFunc(first, second)}/>
<InputField  name={'about'} placeholder={'About'}  keyboardType={'default'} getFunc ={(first, second) => alertFunc(first, second)} height={100} textAlignVertical = {'top'}/>
</View>
<View style={{marginTop : 30}}>
<Button onPress={handleClickEvent} title={'Submit'}></Button>
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
  });