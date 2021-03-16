import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home'
import Help from './components/Help'
import Member from './components/Member'
import Question from './components/Question'
import QuestionList from './components/QuestionsList'

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
        <Stack.Screen name="Help" options={{headerShown: false}} component={Help} />
        <Stack.Screen name="Member" options={{headerShown: false}} component={Member} />
        <Stack.Screen name="Question" options={{headerShown: false}} component={Question} />
        <Stack.Screen name="list" options={{headerShown: false}} component={QuestionList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;