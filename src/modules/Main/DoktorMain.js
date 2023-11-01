import React, { Component, useState ,useEffect} from "react";
import { ImageBackground, View ,Text, Image,Dimensions,ScrollView,Linking, TouchableOpacity} from "react-native";
import { Card,  } from 'react-native-elements';
import styles from "./DoktorMain_style";
import  Colors  from '../../styles/color'
import Icon from "react-native-vector-icons/FontAwesome";
import { launchImageLibrary } from "react-native-image-picker";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from "axios";
import { useSelector } from "react-redux";



function DoktorMain({navigation}){
const[Name,setName] = useState('');
const[surname,setSurname] = useState('')
const [specialization,setSpecialization] = useState('');
const[rate,setRate] = useState('');
const[rank,setRank] = useState('');
const[hospitalName,setHospitalName] = useState('');
const[iban,setIban]=useState('');
const[workingHours,setWorkingHoursStart] = useState('');
const[workingHoursEnd,setWorkingHoursEnd] = useState('');
const[about,setAbout] = useState('');
const [selectedImage, setSelectedImage] = useState('');

const token = useSelector((state)=> state.auth.token);

const openENabiz = () => {
  Linking.openURL('https://www.enabiz.gov.tr/');
};

const openEDevlet = () => {
  Linking.openURL('https://www.turkiye.gov.tr/');
};

const openWhatsApp = () => {
  Linking.openURL('https://api.whatsapp.com/send?phone=5061992373'); 
};

const openTwitter = () => {
  Linking.openURL('https://twitter.com/enbiyagoraI'); 
};


// Image permission
  const openImagePicker =async () => {
    const permissionsStatus = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    if(permissionsStatus === RESULTS.GRANTED) {
      launchGallery();
    }else if (permissionsStatus === RESULTS.DENIED) {
      requestGalleryPermissions();
    }else if (permissionsStatus === RESULTS.BLOCKED) {
      console.log('Kullanıcı İzni Engellendi');
    }
  };

//  Image Gallery
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

        
      }
    })
  }


 
    // kullanıcı bilgileri get

      const fetchData = async () => {
        try {
          const response = await axios.get('http://10.0.2.2:3000/api/doctor/profile',{
            headers:{
              'Authorization': token.data,
            }
          });
          console.log(response.data);
          setName(response.data.data.name)
          setSurname(response.data.data.surname)
          setSpecialization(response.data.data.specialization)
          setHospitalName(response.data.data.location.hospitalName)
          setWorkingHoursStart(response.data.data.workingHours.start)
          setWorkingHoursEnd(response.data.data.workingHours.end)
          setAbout(response.data.data.about)
          setRank(response.data.data.rank)
          setRate(response.data.rate)
          setIban(response.data.data.iban)
        }catch(error) {
          console.error('veriler çekilmedi ',error)
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
    fetchData();
  }, []);

 

  
    
    return(
     
<View style={styles.container}>
<ImageBackground style={styles.image_background} source={require("../../../assets/image/background.png")}>
<Card containerStyle={{ borderRadius: 20 }} >
<View>
<TouchableOpacity onPress={() =>{
    navigation.navigate('DoktorModal')
}} >
  <Icon name="pencil" size={30} color="blue" />
</TouchableOpacity>

</View>

    <View style={{justifyContent:'center',alignItems:'center',marginBottom:15}}>
    < TouchableOpacity onPress={openImagePicker} style={styles.image_view}>
      {selectedImage ? (
        <Image style={styles.image_view}
            source={{uri:selectedImage}} />
      ):  (
        <Image style={styles.image_view}source={require('../../../assets/image/default-avatar.png')} />
      )}
            
        <Text style={styles.resim_text}>Resim Yükle</Text>

        </TouchableOpacity>
    </View>

          <View style={styles.person_infarmations}>
    <Text style={styles.person_ad}>{Name} {surname}</Text> 
    
    <Text style={styles.person_text}>Branşınız:  <Text style={{color:Colors.grey,fontSize:17}}>{specialization}</Text></Text>
    <Text style={styles.person_text}>Ünvanınız:  <Text style={{color:Colors.grey,fontSize:17}}>{rank}</Text></Text>
    <Text style={styles.person_text}>Çalıştığınız Hastane:  <Text style={{color:Colors.grey,fontSize:17}}>{hospitalName}</Text></Text> 
    <Text style={styles.person_text}>Yıldız Puanınız:  <Text style={{color:Colors.grey,fontSize:17}}>{rate}</Text></Text>
   <Text style={styles.person_text}>Hakkınızda:  <Text style={{color:Colors.grey,fontSize:16}}>{about}</Text></Text>
    <Text style={styles.person_text}>Çalışma Saatleriniz:  <Text style={{color:Colors.grey,fontSize:17}}>{workingHours}.00 - {workingHoursEnd}.00</Text></Text>     
    <Text style={styles.person_text}>İban Bilginiz:  <Text style={{color:Colors.grey,fontSize:14}}>{iban}</Text></Text>   
        </View>

       
      </Card>

      <View style={styles.icon_container}>

      <TouchableOpacity onPress={openENabiz}>
        <Icon name="heartbeat" size={30} color="#ff5733" />
        <Text>e-Nabız</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openEDevlet}>
        <Icon name="address-card" size={30} color="#05a5d1" style={{paddingLeft:10}} />
        <Text>e-Devlet</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openWhatsApp}>
        <Icon name="whatsapp" size={30} color="#31661b" style={{paddingLeft:15}} />
        <Text>WhatsApp</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openTwitter}>
        <Icon name="twitter" size={30} color="#174082" style={{paddingLeft:10}} />
        <Text>Twitter</Text>
      </TouchableOpacity>

    </View>

</ImageBackground>
</View>

    )
}
export default DoktorMain