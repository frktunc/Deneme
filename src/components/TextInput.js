
import React, { Component, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import  Colors  from '../styles/color'

function Text_input({placeholder,sec}) {
  const [text, setText] = useState(''); // Metni state olarak saklayın
  console.log("setText",text)

  const onChangeText = (newText) => {
    setText(newText); // Metin değişikliklerini state'e kaydedin
  
    console.log("onchangetext",newText)
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
        secureTextEntry={sec}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft:20,
    paddingRight:20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.blue,
    padding: 10,
    borderRadius: 5,
    backgroundColor:'white'
  },
});

export default Text_input;

