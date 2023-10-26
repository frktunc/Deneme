import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import  Colors  from '../styles/color'


const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white', 
    paddingVertical: 20,
    margin:10,
    marginRight:80,
    marginLeft:80,
    borderRadius: 7,
    borderWidth:1,
    
  },
  buttonText: {
    color:'blue', 
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center'
  },
  
});

export default CustomButton;
