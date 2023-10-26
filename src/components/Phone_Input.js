import React, { useState } from 'react';
import { View, TextInput, Button, Text,StyleSheet, ScrollView  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import  Colors  from '../styles/color'

const countryCodes = [
  { label: '+1 (United States)', value: '+1' },
  { label: '+44 (United Kingdom)', value: '+44' },
  { label: '+49 (Germany)', value: '+49' },
  { label: '+90 (Turkey)', value: '+90' },
  { label: '+33 (France)', value: '+33' },
  { label: '+81 (Japan)', value: '+81' },
  { label: '+34 (Spain)', value: '+34' },
  { label: '+39 (Italy)', value: '+39' },
  { label: '+61 (Australia)', value: '+61' },
  { label: '+7 (Russia)', value: '+7' },

];

function PhoneNumberInput() {
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[3].value);
  const [phoneNumber, setPhoneNumber] = useState('');



  return (
    
    <View style={styles.container}>
      <View >
        <Picker
          style={styles.pickker_input}
          selectedValue={selectedCountryCode}
          onValueChange={(itemValue) => setSelectedCountryCode(itemValue)}
        >
          {countryCodes.map((code) => (
            <Picker.Item key={code.value} label={code.label} value={code.value} />
          ))}
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Telefon Numarası"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        
        />
      </View>
   
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
  pickker_input:{
    borderWidth:1,
    marginBottom:10,
    marginRight:180,
    marginLeft:0,
    borderRadius:10,
    padding:0
  }
});
export default PhoneNumberInput;
