
import React, { Component, useState } from 'react';
import {TextInput} from 'react-native'

export default function InputField({name,label, placeholder, maxLength, keyboardType, getFunc, height, textAlignVertical}) {
  const [state, setState] = useState('')

  const callFunc = (text) => {
    setState(text)
    getFunc(name, text)
  }
  return (
    <>
      <TextInput 
      style={{borderWidth : 1, width : '90%', alignSelf : 'center', marginBottom : 10, marginTop : 15, height : height}}
      value={state} 
      name={name}
      placeholder={placeholder}
      maxLength={maxLength}
      onChangeText={text => callFunc(text)}
      keyboardType={keyboardType}
      textAlignVertical= {textAlignVertical} 
     />
    </>
  );

}