/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity
} from 'react-native';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize, AdEventType, RewardedAdEventType  } from '@react-native-firebase/admob';


async function saveTokenToDatabase(token) {
  // Assume user is already signed in

  // Add the token to the users datastore
  database()
  .ref('/token')
  .push({
    token: token
  })
  .then(() => console.log('Data set.'));
}


const Home: (props) => React$Node = (props) => {
  useEffect(() => {
    // Get the device token
   // saveTokenToDatabase()
    // messaging()
    //   .getToken()
    //   .then(token => {
    //     return saveTokenToDatabase(token);
    //   });
    }, [])

    const result = (result) => {
      console.log('resulttt', result)
  console.log('result', result.json())
    }
  callFun = () => {
    fetch('https://us-central1-hallowed-grin-213811.cloudfunctions.net/sendPush', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'my push',
      body: "this iss my push from shekhar"
    }),
  })
    .then((response) => result(response))
    .then((responseJson) => {
      console.log('respos', responseJson);
    })
    .catch((error) => {
      console.error('error', error);
    });;
  }
  return (
    <>
    <BannerAd unitId={'ca-app-pub-1116385198791430/7349951722'} size={BannerAdSize.FULL_BANNER}/>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex:1}}>
        <View
          style={styles.scrollView}>
          <Text style={{textAlign :'center', fontSize : 32, fontWeight : '600'}}>Welcome To Helping Hands App</Text>
          <Text style={{textAlign :'center', fontSize : 32, fontWeight : '600'}}>This App is Specially designed to help the people with disablities, children who cannot study, aged people who are homeless </Text>
          <TouchableOpacity style={styles.buttonWidth} onPress={() => props.navigation.navigate('Help')}>
            <Text style={styles.alignCenter}>Need Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWidth} onPress={() => props.navigation.navigate('Member')}>
            <Text style={styles.alignCenter}>Become A Member</Text>
          </TouchableOpacity>
          {/* <Button title="Get Started" onPress={() => callFun()}/> */}
         
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    justifyContent : 'center', alignItems : 'center', flex:1
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  buttonWidth : {
    width : '80%',
    backgroundColor : '#e74c3c',
    marginTop : 20,
    height : 40,
    justifyContent : 'center'
  },
  alignCenter : {
    textAlign : 'center',
    color : 'white',
    fontWeight : 'bold'
  }
});

export default Home;