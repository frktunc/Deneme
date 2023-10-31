import { Alert, Text, TouchableOpacity, View ,ActivityIndicator,TextInput,Button} from 'react-native'
import React, { useState, useEffect,useRef } from 'react'
import CustomButton from '../../components/Button'
import axios from 'axios'
import CheckBox from '@react-native-community/checkbox'
import styles from './Doktor_login_style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showMessage } from 'react-native-flash-message';
import { setToken } from '../../Redux/authSlice'
import { useDispatch } from 'react-redux'
import Modal from 'react-native-modalbox'

function Doktor_Login({navigation}){

const [isModalVisible, setModalVisible] = useState(false);
const [rUrl,setRUrl] = useState('');

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [rememberMe, setRememberMe] = useState(false);
const[isLoading, setIsLoading] = useState(false);

const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
const inputRefs = useRef([]);

const dispatch = useDispatch();

const handleChange = (text,index) => {
  const updateCode = [...verificationCode];
  updateCode[index] = text;
  setVerificationCode(updateCode);

  if(text && index < verificationCode.length - 1) {
    inputRefs.current[index +1].focus();
  }
}

useEffect(() => {
    retrieveData();
  }, [])

  const openModal = () => {

    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const verifyCode = () => {
    const completeCode = verificationCode.join('');
    console.log(rUrl);
    console.log(completeCode);
    
    axios.post(rUrl,{verifyCode:completeCode}).then(response=>{
      if(response.data.success){
        closeModal();
        navigation.navigate('Main');
        showMessage({
          message: 'Doğrulamanız Başarı ile Gerçekleşti',
          type: 'success',
        });
      }
      
    })
  }

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
          const url = response.request.responseURL
           
          dispatch(setToken(response.data));
          // console.log(responseData.success);
          if (url.startsWith('http://10.0.2.2:3000/api/auth/verify/')) {
            setRUrl(response.request.responseURL);
            openModal();
            
           
          } else {
            // URL beklenen URL ile başlamıyorsa giriş işlemi yap
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
        
      
        <Modal style={styles.modal_container}
       
       isOpen={isModalVisible}
       onClosed={closeModal}
     >
       <View style={{}}>
       <Text style={styles.modal_main_text}>Mailinize Gelen Doğrulama Kodunuzu Giriniz</Text>
       </View>
       <View style={styles.modal_box_container}>
     {verificationCode.map((_,index) => (
       <TextInput
         key={index}
         style={styles.modal_box_text}
         value={verificationCode[index]}
         onChangeText={(text) => handleChange(text, index)}
         keyboardType="numeric"
         ref={(ref) => (inputRefs.current[index] = ref)}
         maxLength={1}
       />
     ))}
   </View>
      
       <Button title="Doğrula" onPress={verifyCode} />
     </Modal>
        

      </View>
    </View>
    )
}
export default Doktor_Login

