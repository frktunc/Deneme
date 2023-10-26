import { Text, View,TouchableOpacity,TextInput ,Alert} from 'react-native'
import React, {  useState } from 'react'
import  Colors from '../../styles/color'
import CustomButton from '../../components/Button'
import styles from './Register_style'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler'

function Register({navigation}){
  const [name,setName] = useState('');
  const [surname,setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNamnber] = useState('');
  const [password,setPassword] = useState('');
  const emailReg = /\S+@\S+\.\S+/;

  const userData = {
    name: name,
    password: password,
    surname: surname,
    email: email,
    phoneNumber: phoneNumber

};
function onRegister(){
  if(!emailReg.test(email)) {
      showMessage({
          message:'Geçersiz E-posta',
          type:'danger'
      })
      return;
  }
  if(password.length<1) {
      showMessage({
          message:'Parolanız en az 1 rakam içermelidir',
          type: 'danger'
      })
      return;
  }
  
     
  
  handleRegister();
}

function handleRegister() { 
  axios.post('http://10.0.2.2:3000/api/auth/signup?role=patient', userData)
      .then(response => {
        console.log("BURADAYIZ")
        const responseData = response.data;
          Alert.alert('Kayıt Oluşturuldu ')
          navigation.navigate('Login');
         
      })
      .catch(error => {
          console.log(error)
          // console.log("HATA::::"+error)
          // Alert.alert('Hata', 'Kayıt Yapılamadı Lütfen Tekrar deneyin')
          showMessage({
              message: 'Kayıt Yapılamadı Lütfen Tekrar deneyin',
              type: "danger",
            });
      });
}


    return(

    <ScrollView>
        <View style={styles.main_container}>
     
        <View style={styles.yrd_container}>
        <Text style={styles.main_text}>
        HealApp Kayıt Ol
        
        </Text>
        </View>
        
        
        <View style={styles.yrd_container2}>
         <Text style={styles.title_girş}>Kayıt Ol</Text>
        <View style={{padding:15}}>
        <TextInput
            style={styles.input}
                placeholder="İsim"
            onChangeText={text => setName(text)}
            value={name}
            />
        </View>
         
<View style={{padding:15}}>
          <TextInput
             style={styles.input}
              placeholder="Soyisim"
              onChangeText={text => setSurname(text)}
              value={surname}
        
            />
            </View>
            <View style={{padding:15}}>
             <TextInput
             style={styles.input}
              placeholder="E-mail"
            onChangeText={text=>setEmail(text) }
             value={email}
            />
            </View>
            <View style={{padding:15}}>
             <TextInput
             style={styles.input}
             placeholder="0 (5xx) xxx xx xx"
              onChangeText={text => setPhoneNamnber(text)}
              value={phoneNumber}
            />
            </View>
            <View style={{padding:15}}>
             <TextInput
             style={styles.input}
             placeholder="Şifre"
             onChangeText={text => setPassword(text)}
             value={password}
             
            />
            </View>
            <CustomButton 
          title={"Kayıt Ol"}
          onPress={onRegister}
          />
            </View>

            
            

          
         
        
        
        
       
        
      </View>
      </ScrollView>
    )
}
export default Register