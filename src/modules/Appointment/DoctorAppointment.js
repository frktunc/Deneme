import { Text, View ,ImageBackground,ScrollView,TouchableOpacity} from 'react-native'
import React, {useState,useEffect} from 'react'
import styles from './DoctorAppointment_style'
import { Card, Image } from 'react-native-elements';
import PatientCard from '../../components/PatientCard';
import Icon from 'react-native-vector-icons/FontAwesome';


function DoctorAppointment({navigation}) {

 
    return (
          <ImageBackground style={styles.image_background} source={require("../../../assets/image/background.png")}>
            <ScrollView style={{ flex:1}}>
            <View style={styles.container}>
              <Text style={styles.main_text}>
                 Randevularım
              </Text>
              <TouchableOpacity style={{marginLeft:120}} onPress={() =>{
    navigation.navigate('Update Doctor')
}} >
              <Icon name="cog" size={30} color="black" />
              </TouchableOpacity>
            </View>
            
            <View style={{paddingLeft:13,paddingTop:20}}><Text style={{fontSize:22}}>Bekleyen Hastalar :</Text></View>
            <PatientCard />
            <PatientCard />
            <PatientCard />
            <PatientCard />

          
      
            
            </ScrollView>    
          </ImageBackground>
       
      
    );
  }
  export default DoctorAppointment
  