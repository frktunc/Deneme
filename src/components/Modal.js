import React, { useState } from 'react';
import { View, Text, Button, TextInput,StyleSheet,ImageBackground } from 'react-native';
import  Colors  from '../styles/color';
import { showMessage, hideMessage } from "react-native-flash-message";
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';

const bloodKind = [
 
   {label: 'A(RH)-', value:'A(RH)-'},
   {label: 'A(RH)+', value:'A(RH)+'},
   {label: 'B(RH)+', value:'B(RH)+'},
   {label: 'B(RH)-', value:'B(RH)-'},
   {label: 'AB(RH)+', value:'AB(RH)+'},
   {label: 'AB(RH)-', value:'A(RH)-'},
   {label: '0(RH)+', value:'0(RH)+'},
   {label: '0(RH)-', value:'0(RH)-'},
]

function ModalPage({navigation}) {

  const token = useSelector((state)=>state.auth.token);

  const [editedName, setEditedName] = useState('');
  const [editedSurname, setEditedSurname] = useState('');
  const [editedAge, setEditedAge] = useState('');
  const[editHeight,setEditHeight] = useState('');
  const[editWeight,setEditWeight] = useState('');
  const[editBlood,setEditBlood] = useState('');

  const userData = {
    name : editedName,
    surname: editedSurname,
    bloodGroup: editBlood,
    height: editHeight,
    weight: editWeight,
    birthDate: editedAge
  }
    
   

  
  
   function handleİnformations(){
    console.log(userData)

    axios.post('http://10.0.2.2:3000/api/patient/update',userData,{
      headers: {
        'Authorization': token.data
      },
    }) 
    .then((response) => {

      const responseData = response.data;
      console.log(response)
      showMessage({
        message:'Bilgileriniz Başarı ile Güncellendi',
        type: 'success'
      })
    })
    .catch(error => {
      // console.log(token)
      console.log(error)
      showMessage({
        type: 'danger',
        message: 'Hata Bilgileriniz Güncellenemedi'
      })
    })
  }
  return (
   
    <View style={styles.container}>
      
      <ImageBackground style={styles.image_background} source={require("../../assets/image/background.png")}>
      <ScrollView style={{flex:1}}>
      <View style= {styles.baslik_container}>
        <Text style={styles.baslik_text}>
          Profilinizi Düzenleyin
        </Text>
      </View>
      <View style={styles.text_continer}>

      <Text style={styles.text_style}>İsim Bilgileriniz:</Text>
      <TextInput style={styles.input_style}  value={editedName} onChangeText={(text) => setEditedName((text))} />

      <Text style={styles.text_style}>Soyisim Bilgileriniz:</Text>
      <TextInput style={styles.input_style}  value={editedSurname} onChangeText={(text) => setEditedSurname((text))} />

      <Text  style={styles.text_style}>Yaş Bilgileriniz: </Text>
      <TextInput keyboardType="numeric"  style={styles.input_style} value={editedAge} onChangeText={(text) => setEditedAge(text)} />

      <Text style={styles.text_style}>Kilo Bilgileriniz:</Text>
      <TextInput keyboardType="numeric" style={styles.input_style} value={editWeight.toString()} onChangeText={(text) => setEditWeight(text)} />

      <Text  style={styles.text_style}>Boy Bilgileriniz:</Text>
      <TextInput keyboardType="numeric" style={styles.input_style} value={editHeight.toString()} onChangeText={(text) => setEditHeight(text)} />

      <Text  style={styles.text_style}>Kan Grubu Bilgileriniz:</Text>     
      <Picker
      style={styles.pickker_input}
      selectedValue={editBlood}
     onValueChange={(itemValue, itemIndex) => setEditBlood(itemValue)}

      >
    {bloodKind.map((bloodType) => (
      
    <Picker.Item
    
    style={styles.picker_style}
      key={bloodType.value}
      label={bloodType.label}
      value={bloodType.value}
    />
  ))}
  
</Picker>
      

      </View>
      <View style={styles.button_main_container}>
      <Button
      style={styles.button_container}
      color={Colors.yellow}
        title="    Bilgilerimi Kaydet   "
        onPress={() => {
         
          handleİnformations();
          // navigation.goBack({editBlood}); 
          // showMessage({
          //   message: "𝕭𝖎𝖑𝖌𝖎𝖑𝖊𝖗𝖎𝖓𝖎𝖟 𝕭𝖆𝖘̧𝖆𝖗ı 𝖎𝖑𝖊 𝕺𝖑𝖚𝖘̧𝖙𝖚𝖗𝖚𝖑𝖉𝖚.",
          //   type: "info",
          //   animationDuration:300,
          //   floating:true,
            
            
          // });
        }}
      />
      </View>
      </ScrollView>
      </ImageBackground>
    
    </View>
  
  );
}
const styles = StyleSheet.create({
container:{
  flex:1,
  
},
image_background:{
  flex:1,
  resizeMode:'cover'
},
baslik_container:{
  justifyContent:'center',
  alignItems:'center',
  padding:20

},
baslik_text:{
  fontSize:32,
  color:Colors.yellow
},
text_continer:{
  padding:5,
  paddingLeft:10,
},
text_style:{
  fontSize:23,
  fontWeight:'bold'
},
input_style:{
  backgroundColor:Colors.primaryLight,
  borderRadius:8,
  textAlign:'center',
  marginTop:10,
  marginBottom:10,
  color:'white',
  fontSize:18
},
button_container:{
    width: 300, 
    height: 50, 
    borderRadius: 10, 
    borderWidth: 2,
   
},
button_main_container:{
  justifyContent:'center',
  alignItems:'center',
  paddingTop:20
  
},
picker_style:{
  backgroundColor:Colors.primary,
  borderRadius: 10, 
  
}
})
export default ModalPage;
