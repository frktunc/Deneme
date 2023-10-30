import { Alert, Text, TouchableOpacity, View ,ActivityIndicator,TextInput} from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomButton from '../../components/Button'
import axios from 'axios'
import CheckBox from '@react-native-community/checkbox'
import styles from './Doktor_login_style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showMessage } from 'react-native-flash-message';

function Doktor_Login({navigation}){


const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [rememberMe, setRememberMe] = useState(false);
const[isLoading, setIsLoading] = useState(false);

useEffect(() => {
    retrieveData();
  }, [])


  const retrieveData = async () => {
    try {
      const storedUseremail = await AsyncStorage.getItem('username');
      const storedUserpassword = await AsyncStorage.getItem('password');
      const storedRememberMe = await AsyncStorage.getItem('rememberMe');

      if (storedRememberMe && storedUseremail && storedUserpassword) {
        setEmail(storedUseremail);
        setPassword(storedUserpassword);
        setRememberMe(storedRememberMe === 'true');
      }
    } catch (error) {
      console.log('Kullanıcı Bilgileri Kaydedilemedi', error);
    }
  }

  const handleLoginStrg = async () => {
    
    await AsyncStorage.setItem('username', email);
    await AsyncStorage.setItem('password', password);

    if (rememberMe) {
      await AsyncStorage.setItem('rememberMe', 'true');
    } else {
      await AsyncStorage.removeItem('rememberMe');
    }
  };


  const handleLoginAndNavigateDoktor = () => {
    setIsLoading(true);
    console.log('Email:', email);
    console.log('Password:', password);
    if (email.trim() === '' || password.trim() === '') {
      showMessage({
        message: 'E-mail ve şifre alanları zorunlu alanlardır',
        type: 'danger',
      });
      
    } else {
      axios.post('http://10.0.2.2:3000/api/auth/login', {
        email,
        password
      })
        .then(response => {
          console.log(response.data.success)
          const responseData = response.data;
          // console.log(responseData.success);
          if (responseData.success) {
            showMessage({
              message: responseData.message,
              type: 'success',
            });
           
            setTimeout(() => {
              setIsLoading(false); 
              console.log('giriş başarılı');
              navigation.navigate('Main2');
              handleLoginStrg();
            }, 1000);
           
          }
        })
        .catch(error => {
          console.log('Hata Yanıtı:', error.response);
          const response = error.response.data;
          if (!response.success) {
            showMessage({
              message: response.message,
              type: 'danger',
            });
            setIsLoading(false);
          }
        });
       
    }
    
  };


    return(
<View style={styles.main_container}>
      <View style={styles.yrd_container}>
        <Text style={styles.main_text}>
        𝐃𝐨𝐤𝐭𝐨𝐫𝐮𝐦 𝐇𝐨𝐬̧ 𝐆𝐞𝐥𝐝𝐢𝐧𝐢𝐳
        </Text>
      
      </View>
      <View style={styles.yrd_container2}>
        <Text style={styles.title_girş}>Giriş Yap</Text>
        <View style={styles.textInput_container}>
          <TextInput
            style={styles.input}
            placeholder="email"
           
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.textInput_container}>
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}

          />
        </View>
        <View style={styles.rememberme_container}>
          <Text style={styles.rememberme_text}>Beni Hatırla</Text>
          <CheckBox
             value={rememberMe}
            onValueChange={(newValue) => setRememberMe(newValue)}
            tintColors={{ true: 'white' ,false:'#071c6d'}}
             
          />
        </View>
       
        {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <CustomButton title="Giriş Yap" onPress={handleLoginAndNavigateDoktor} />
        
      )}
        
      
      
        

      </View>
    </View>
    )
}
export default Doktor_Login

