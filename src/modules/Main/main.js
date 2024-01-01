import React, { Component, useState ,useEffect} from "react";
import { ImageBackground, View ,Text, Image,Dimensions} from "react-native";
import { Card,  } from 'react-native-elements';
import styles from "./main_style";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import  Colors  from '../../styles/color'
import LogoutComponent from "../DrawerContent/LogOut/logout";
import Icon from "react-native-vector-icons/FontAwesome";
import { launchImageLibrary } from "react-native-image-picker";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from "../../Redux/authSlice";
import ExitButton from "../DrawerContent/LogOut/logout";
import formatISODateToTurkishWithTime from "../../FormatFunc/formatISODateToTurkishWithTime";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Main({navigation}){
 
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const[weight,setWeight] = useState('');
  const[height,setHeight] = useState('');
  const[bloodGroup,setBloodGroup] = useState('');
  const[MassIndex,setMassIndex] = useState('');

  const[name,setName] = useState('');
  const[specialization,setUzmanlık] = useState('');
  const[hospitalName,setHastane] = useState('');
  const[date,setrandevu] =useState('');
  // const[doktorad, setDoktorad] = useState('');

  const [selectedImage, setSelectedImage] = useState('');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  const [userProfileImage, setUserProfileImage] = useState(null);

  const token = useSelector((state)=>state.auth.token);
  const userRole = useSelector((state) => state.auth.userRole)

  const dispatch = useDispatch();

  const openImagePicker =async () => {
    const permissionsStatus = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    if(permissionsStatus === RESULTS.GRANTED) {
      launchGallery();
    }else if (permissionsStatus === RESULTS.DENIED) {
      requestGalleryPermissions();
    }else if (permissionsStatus === RESULTS.BLOCKED) {
      console.log('Kullanıcı İzni Engellendi');
    }


    // const formData = new FormData();
    // formData.append('profilephoto', {
    //   uri: selectedImage,
    //   type: 'image/jpeg',
    //   name: 'user_profile_image.jpg',
    // });
    // axios.post('http://10.0.2.2:3000/api/patient/update-profile-photo',formData,{
    //   headers:{
    //     'Authorization': token.data,
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    // .then((response) => {
    //   console.log('Resim yükleme başarılı:', response.data)
     
    // })
    // .catch((error) => {
    //   console.error('Resim yükleme hatası:', error);
    // })

    
  
    
  };
 
  const launchGallery = ()=> {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: Math.floor(Dimensions.get('window').height),
      maxWidth: Math.floor(Dimensions.get('window').width),
    }
    launchImageLibrary(options, (response) => {
      if(response.didCancel) {
        console.log('user cacelled image picker');
      }else if (response.error) {
        console.log('Image picker error', response.error)
      }else{
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        uploadImage(imageUri);
        
      }
    })
  }
  //  Resim post
  const uploadImage = (imageUri) => {
    const formData = new FormData();
    formData.append('profilephoto', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'user_profile_image.jpg',
    });
    axios.post('http://10.0.2.2:3000/api/patient/update-profile-photo', formData, {
      headers: {
        'Authorization': token.data,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('Resim yükleme başarılı:', response.data);
        setProfilePhotoUrl(response.data.data);
        saveSelectedImage(imageUri);
        
      })
      .catch((error) => {
        console.error('Resim yükleme hatası:', error);
      });

      

  };

  const saveSelectedImage = async (imageUri) => {
    try {
      await AsyncStorage.setItem('userProfileImage', imageUri);
      console.log('Resim kaydedildi:', imageUri);
      
    } catch (error) {
      console.error('Resim kaydedilemedi:', error);
    }
  };

   useEffect(() => {
    const fetchUserProfileImage = async () => {
      try {
        const imageUri = await AsyncStorage.getItem('userProfileImage');
        if (imageUri) {
          setUserProfileImage(imageUri);
        }
      } catch (error) {
        console.error('Resim getirilemedi:', error);
      }
    };

    fetchUserProfileImage();
  }, []);
 
  // useEffect(() => {
  //   if (profilePhotoUrl) {
  //     axios.get(profilePhotoUrl, {
  //       headers: {
  //         'Authorization': token.data,
  //       },
  //     })
  //     .then(response => {
  //       // response.data içerisinde resim verisi olacak
  //       // Bu veriyi kullanarak istediğiniz işlemi yapabilirsiniz
  //       console.log('Profil resmi alındı:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('Profil resmi alınamadı:', error);
  //     });
  //   }
  // }, [profilePhotoUrl]);

  
    // kullanıcı bilgileri get


  
      const fetchData = async () => {
        try {

          const response = (await axios.get('http://10.0.2.2:3000/api/patient/profile',{
            headers: {
              'Authorization': token.data,
            }
          }))
          
          // const response2 = (await axios.get('http://10.0.2.2:3000/api/patient/profile-photo',{
          //   headers: {
          //     'Authorization': token.data,
          //   }
          // }))
          // console.log("121221",response2.data)
          // setProfilePhotoUrl(response2.data.data);

          if(response.data.data !== undefined){
           
            setFullName(response.data.data.fullName);
            setWeight(response.data.data.weight);
            setHeight(response.data.data.height);
            setBloodGroup(response.data.data.bloodGroup);
            setMassIndex(response.data.data.MassIndex)
            setAge(response.data.data.age)
          }
   
        }catch(error) {
          console.error('veriler çekilmedi ',error)
          console.log(token.data);
        }
      }

      const fetchDataDoctor = async () => {
        try {

          const responses = (await axios.get('http://10.0.2.2:3000/api/patient/appointments?latest=1',{
            headers: {
              'Authorization': token.data,
            }
          }))
         
          if(responses.data.data !== undefined){
            console.log(responses.data.data); 
            setName(responses.data.data[0].doctor.name);
            setUzmanlık(responses.data.data[0].doctor.specialization);
            setHastane(responses.data.data[0].doctor.location.hospitalName);
           
            
            setrandevu( formatISODateToTurkishWithTime(responses.data.data[0].date));
          }
         
        
        }catch(error) {
          console.log('first')
          console.error('veriler çekilmedi ',error)
          console.log(token.data);
        }
      }
     
     

      //picker için permissions
  const requestGalleryPermissions = async () => {
    const permissionsStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)

    if(permissionsStatus === RESULTS.GRANTED) {
      launchGallery();
    }else{
      console.log('Kullanıcı izni reddetti.')
    }
  }

  useEffect(() => {
    fetchDataDoctor();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  
  

  
    
    return(
        <ScrollView >
<View style={styles.container}>
<ImageBackground style={styles.image_background} source={require("../../../assets/image/background.png")}>
<Card containerStyle={{ borderRadius: 20 }} >
<View style={styles.icon_container}>
<TouchableOpacity onPress={() =>{
    navigation.navigate('Modal')
}} >
  <Icon name="pencil" size={30} color="blue" />
</TouchableOpacity>
<TouchableOpacity>
<ExitButton/>

</TouchableOpacity>

</View>
    <View style={{justifyContent:'center',alignItems:'center',marginBottom:15}}>
    < TouchableOpacity onPress={openImagePicker} style={styles.image_view}>
      {userProfileImage ? (
        <Image style={styles.image_view}
            source={{uri:userProfileImage}} />
      ):  (
        <Image style={styles.image_view}source={require('../../../assets/image/default-avatar.png')} />
      )}
            
            

<Text style={styles.resim_text}>Resim Yükle</Text>

        </TouchableOpacity>
    </View>
    
          <View style={styles.person_infarmations}>
            
    <Text style={styles.person_ad}>{fullName}</Text>
    <Text style={styles.person_text}>Boyunuz: <Text style={{color:Colors.grey}}>{height} cm</Text></Text>
    <Text style={styles.person_text}>Kilonuz: <Text style={{color:Colors.grey}}>{weight} kg</Text></Text>
    <Text style={styles.person_text}>Yaşınız:  <Text style={{color:Colors.grey}}>{age}</Text></Text>
    <Text style={styles.person_text}>Kütle İndex:  <Text style={{color:Colors.grey}}>{MassIndex}</Text></Text>
    <Text style={styles.person_text}>Kan Grubunuz: <Text style={{color:Colors.grey}}>{bloodGroup}</Text> </Text>
        </View>

        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>Kart içeriği buraya gelebilir. </Text>
        
      </Card>

      <Card containerStyle={{ borderRadius: 20 }} >
       <Text style={styles.randevu_main_text}>Randevularım</Text>
    <View style={{justifyContent:'center',alignItems:'center',marginBottom:15}}>
    < TouchableOpacity style={styles.image_view}>
            <Image style={styles.image_view}source={require('../../../assets/image/default-avatar.png')} />


        </TouchableOpacity>
    </View>

          <View style={styles.person_infarmations}>
    <Text style={styles.person_ad}>{name}</Text>
    <Text style={styles.person_text}>Uzmanlık: <Text style={{color:Colors.grey}}>{specialization}</Text></Text>
    <Text style={styles.person_text}>Hastane: <Text style={{color:Colors.grey}}>{hospitalName}</Text></Text>
    <Text style={styles.person_text}>Randevu Tarihi:  <Text style={{color:Colors.grey}}>{date}</Text></Text>
   
        </View>

        <Card.Divider />
        <Text style={{ marginBottom: 10 , textAlign:'center' }}>Aktif Randevunuz Bulunmaktadır.</Text>
        
      </Card>

</ImageBackground>
</View>
</ScrollView>
    )
}
export default Main