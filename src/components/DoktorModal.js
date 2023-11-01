import React, { useState } from 'react';
import { View, Text, Button, TextInput,StyleSheet,ImageBackground } from 'react-native';
import  Colors  from '../styles/color';
import { showMessage, hideMessage } from "react-native-flash-message";
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useSelector } from 'react-redux';
const RankKind = [
 
   {label: 'Junior Doctor', value:'Junior Doctor'},
   {label: 'Senior Doctor', value:'Senior Doctor'},
   {label: 'Consultant', value:'Consultant'},
   {label: 'Specialist', value:'Specialist'},
   {label: 'Chief Doctor', value:'Chief Doctor'},
   
]

const SpecializationMap = [
  {label: 'Cerrahi', value:'Cerrahi'},
  {label: 'Diş Hekimi', value:'Diş Hekimi'},
  {label: 'Kulak Burun Boğaz', value:'Kulak Burun Boğaz'},
  {label: 'Çocuk Doktoru', value:'Çocuk Doktoru'},
  {label: 'Psikoloji', value:'Psikoloji'},
  {label: 'Diyetisyen', value:'Diyetisyen'},
  {label: 'Kardiyoloji', value:'Kardiyoloji'},
  {label: 'Onkolog', value:'Onkolog'},
  {label: 'Ürolog', value:'Ürolog'},
]

function ModalPage() {
  
  const [editedName, setEditedName] = useState('');
  const [editedSurname,setEditSurname] = useState('');
  const [editedSpecialization,setEditedSpecialization] = useState('');
//   const [editedHospitalName,setEditedHospitalName] = useState('');
  const [editedAbout,setEditedAbout] = useState('');
  const [editedRank,setEditedRank] = useState('');
//   const [editedRate,setEditedRate] = useState('');
  const [editedIban,setEditedIban] = useState('');
  
  const token = useSelector((state) => state.auth.token)

  const userData = {
    name : editedName,
    surname : editedSurname,
    specialization: editedSpecialization,
    // hospitalName: editedHospitalName,
    about: editedAbout,
    rank: editedRank,
    // rate:editedRate,
    iban: editedIban
  }
    
   
  

  const handleNameChange = (text) => {
    const uppercaseText = text.toUpperCase(); 
    setEditedName(uppercaseText); 
   
  };
  const handleSurnameChange = (text) => {
    const uppercaseText = text.toUpperCase(); 
   
    setEditSurname(uppercaseText);
  };

  
  

  function handleİnformations(){
    console.log(userData)
    axios.post('http://10.0.2.2:3000/api/doctor/profile',userData,{
      headers:{
        'Authorization':token.data
      }
    })
    .then(response => {

      const responseData = response.data;
      console.log(response)
      showMessage({
        message:'Bilgileriniz Başarı ile Güncellendi',
        type: 'success'
      })
    })
    .catch(error => {
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
      <TextInput style={styles.input_style} value={editedName} onChangeText={(text) => handleNameChange((text))}  />

      <Text style={styles.text_style}>Soyisim Bilgileriniz:</Text>
      <TextInput style={styles.input_style} value={editedSurname} onChangeText={(text) => handleSurnameChange((text))} />

      <Text  style={styles.text_style}>Branş Bilgileriniz: </Text>
      <Picker
      style={styles.pickker_input}
      selectedValue={editedSpecialization}
     onValueChange={(itemValue, itemIndex) => setEditedSpecialization(itemValue)}

      >
    {SpecializationMap.map((RankType) => (
      
    <Picker.Item
    
    style={styles.picker_style}
      key={RankType.value}
      label={RankType.label}
      value={RankType.value}
    />
  ))}
  
</Picker>


      <Text style={styles.text_style}>Ünvan Bilgileriniz:</Text>

      


      <Picker
      style={styles.pickker_input}
      selectedValue={editedRank}
     onValueChange={(itemValue, itemIndex) => setEditedRank(itemValue)}

      >
    {RankKind.map((RankType) => (
      
    <Picker.Item
    
    style={styles.picker_style}
      key={RankType.value}
      label={RankType.label}
      value={RankType.value}
    />
  ))}
  
</Picker>

     

      <Text style={styles.text_style}>Hakkınızda Yazınız :</Text>
      <TextInput  style={styles.input_style} value={editedAbout} onChangeText={(text) => setEditedAbout(text)} />
      
      <Text style={styles.text_style}>İban Bilgileriniz: </Text>
      <TextInput  style={styles.input_style} placeholder='TR ************************' value={editedIban} onChangeText={(text) => setEditedIban(text)} />

     

      </View>
      <View style={styles.button_main_container}>
      <Button
      style={styles.button_container}
      color={Colors.yellow}
        title="    Bilgilerimi Kaydet   "
        onPress={() => {
         
          handleİnformations();
          
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
  fontSize:16
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
