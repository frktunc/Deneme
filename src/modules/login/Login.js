import { Alert, Text, TouchableOpacity, View ,ActivityIndicator,Button,Dimensions} from 'react-native'
import React, { useState, useEffect ,useRef} from 'react'
import CustomButton from '../../components/Button'
import styles from './Login_style'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-gesture-handler'
import CheckBox from '@react-native-community/checkbox'
import Modal from 'react-native-modalbox'
import { setToken } from '../../Redux/authSlice'
import { useDispatch } from 'react-redux'
import { decode } from "react-native-pure-jwt";

function Login({ navigation }) {
  
const [isModalVisible, setModalVisible] = useState(false);
  const [rUrl,setRUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const[isLoading, setIsLoading] = useState(false);
  // const [remainingTries,setRemainingTries] = useState(3);

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

  // Kullanıcı Bilgilerini Kaydet
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
      // else(remainingTries > 0) 
      //   {
      //     console.log(remainingTries)
      //     setRemainingTries(remainingTries - 1);
          
      //     showMessage({
      //       message: 'Yanlış Doğrulama Kodu ${remainingTries - 1} hakkınız kaldı',
      //       type:'danger'
      //     })
      //   } 
      
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
//  **** 
  const handleKayitOl = () => {
    navigation.navigate('Register');
  };

  const handleDoktorLogin = () => {
    navigation.navigate('DoktorLogin')
  }

  const handleLoginAndNavigate = () => {
    setIsLoading(true);
    console.log('Email:', email);
    console.log('Password:', password);
    if (email.trim() === '' || password.trim() === '') {
      showMessage({
        message: 'E-mail ve şifre alanları zorunlu alanlardır',
        type: 'danger',
      });
      setIsLoading(false);
    } else {
      axios.post('http://10.0.2.2:3000/api/auth/login', {
        email,
        password
      })
      .then(async response => {
        const url = response.request.responseURL
        console.log(response.data)
        console.log(url)
        
        

        if (url.startsWith('http://10.0.2.2:3000/api/auth/generate-otp/')) {
          const updatedUrl = url.replace('generate-otp', 'verify');
          console.log(updatedUrl)
          setRUrl(updatedUrl);
          openModal();
          
        } else {
          
          const responseData = response.data;
          console.log("arabab",responseData)

          const decoded = await decode(response.data.data,"nanaHUI3JOTw/+tGPCBTzSBWthw", {skipValidation: true});
          const userRole = decoded.payload.userRole;
          const loggedIn = decoded.payload.loggedIn;

          dispatch(
            setToken({
              token: response.data, // Token değeri
              userRole: decoded.payload.userRole, // Kullanıcı rolü
              loggedIn: decoded.payload.loggedIn, // Giriş yapıldı mı?
            })
          );

          if (responseData.success && userRole === 'Patient') {

              showMessage({
                message: responseData.message,
                type: 'success',
              });
            
           
            
            setTimeout(() => {
              setIsLoading(false); 
              console.log('giriş başarılı');
              navigation.navigate('Main');
              handleLoginStrg();
            }, 1000);
          }
          else {
              showMessage({
                message: 'Oturum Rolünüz doğru değil',
                type:'warning'
              });
              setIsLoading(false);
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

  return (
    <View style={styles.main_container}>
      <View style={styles.yrd_container}>
        <Text style={styles.main_text}>
          𝙃𝙤𝙨̧ 𝙂𝙚𝙡𝙙𝙞𝙣𝙞𝙯
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
        <CustomButton title="Giriş Yap" onPress={handleLoginAndNavigate} />
        
      )}
      
        <Text style={styles.question}>Hala Bir Hesabınız Yok mu ?</Text>
        <TouchableOpacity onPress={handleKayitOl} style={{ paddingTop: 3 }}>
          <Text style={styles.create_account}>Hesap Oluştur</Text>
        </TouchableOpacity>

        <View style={styles.doktor_login_container}>
          <Text>Hayatlarımızı Kurtaran Kahraman mısın ?</Text>
         
          <View style={styles.doktor_login_container2}>
          <TouchableOpacity onPress={handleDoktorLogin}>
            <Text style={styles.doktor_login_text}>
              Doktor Giriş
            </Text>
          </TouchableOpacity>
          </View>
          
        </View>

      </View>
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
  )
}

export default Login;