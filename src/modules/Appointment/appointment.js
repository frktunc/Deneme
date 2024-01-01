import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, Image, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import styles from './appointment_style';
import { Button, SearchBar, Card } from 'react-native-elements';
import axios from 'axios';
import { Rating } from 'react-native-ratings';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from "react-redux";


const categories = [
  '--------------',
  'Cerrahi',
  'Diş Hekimi',
  'Kulak Burun Boğaz',
  'Çocuk Doktoru',
  'Psikoloji',
  'Diyetisyen',
  'Kardiyoloji',
  'Onkolog',
  'Ürolog',
  'Dermatologist'
]
const cities = [
  '--------------','Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya',
  'Ardahan', 'Artvin', 'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik',
  'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli',
  'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep',
  'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul', 'Izmir',
  'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kırıkkale', 'Kırklareli',
  'Kırşehir', 'Kilis', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Mardin', 'Mersin',
  'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye', 'Rize', 'Sakarya', 'Samsun', 'Siirt',
  'Sinop', 'Sivas', 'Şanlıurfa', 'Şırnak', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak',
  'Van', 'Yalova', 'Yozgat', 'Zonguldak'
];


const hospitals = [
  '--------------',
  'Özel Acıbadem Hastanesi',
  'Memorial Sağlık Grubu',
  'Medicana International Ankara Hastanesi',
  'Medical Park Hastanesi',
  'Liv Hospital',
  'VM Medical Park Hastanesi',
  'Ankara Şehir Hastanesi',
  'Florence Nightingale Hastanesi',
  'Avcılar',
  'Istanbul Hospital 1',
  'IzmirHospital10',
];







function Appointment({ navigation }) {

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]); 
  const [loading,setLoading] = useState(false);
  const [doctorImage, setDoctorImage]= useState(require('../../../assets/image/default-avatar.png'));

  const token = useSelector((state)=> state.auth.token);

  function handleCategoryChange(itemValue) {
    setSelectedCategory(itemValue);
  }

  function handleCityChange(itemValue) {
    setSelectedCity(itemValue);
  }
  
  function handleHospitalChange(itemValue) {
    setSelectedHospital(itemValue);
  }

  function handleSearch (){
    const query = {
      filter: selectedCategory,
      city: selectedCity,
      hospital: selectedHospital,
      profilephoto : doctorImage
  }
  if(loading) return; 
  // http://10.0.2.2:3000/api/appointment/${page + 1}?&sort=asc
  
  axios
    .get(`http://10.0.2.2:3000/api/appointment/1`, { params: query })
    .then((response) => {
      const fetchedData = response.data.data;
      // console.log('GET isteği başarılı:', fetchedData[0]);
      console.log(fetchedData[0].profilePhoto)
      if(fetchedData[0].profilePhoto){
        setDoctorImage({ uri: fetchedData[0].profilePhoto });
        // console.log(setDoctorImage)
       
      }else{
        setDoctorImage(require('../../../assets/image/default-avatar.png'));
      }
      // setData(fetchedData); // Yeni veriyle değiştir
      setData([...data, ...fetchedData]);
      setPage(page + 1);
      setLoading(false);
      console.log(data)
      console.log(page)
      console.log(selectedHospital)
      
      
      
    })
    .catch((error) => {
      console.error('GET isteği hatası:', error);
      setLoading(false);
    });
  }


// useEffect(() => {
//   handlePhoto();
// }, []);

// function handlePhoto() {
//   axios
//     .get('http://10.0.2.2:3000/api/doctor/profile')
//     .then((response) => {
//       if (response.data && response.data.profilePhotoUrl) {
//         setDoctorImage({ uri: response.data.profilePhotoUrl });
//       } else {
//         setDoctorImage(require('../../../assets/image/default-avatar.png'));
//       }
//     })
//     .catch((error) => {
//       console.error('GET isteği hatası:', error);
//       setDoctorImage(require('../../../assets/image/default-avatar.png'));
//     });
// }

const ratingCompleted = (rating) => {
  console.log("Rating is: " + rating);
};

const handleRandevuAl = (selectedDoctor) => {
  navigation.navigate('Detail',{doctor:selectedDoctor});
};



  return (

    <ScrollView>


      <View style={styles.main_container}>
        <ImageBackground style={styles.image_background} source={require("../../../assets/image/background.png")}>
          <View style={styles.main_text_container}>
            <Text style={styles.main_text}>
              Randevunu Oluştur
            </Text>

          </View>

          <View style={{justifyContent:'center',alignItems:'center',paddingTop:20}}>
            
            <Image source={require("../../../assets/image/kbb.jpg")} style={styles.sehir_ımage}/>
            <Picker
              selectedValue={selectedCategory}
              style={{ height: 50, width: 150 }}
              onValueChange={handleCategoryChange} > 
              {categories.map((cat,index) => (
                <Picker.Item label={cat} value={cat} key={index} />
              ))}     
            </Picker>
            <Text style={styles.queryText}>Branşa Göre Sorgula</Text>
          </View>

         


          <View style={styles.ImageAndText}>


            <Image source={require("../../../assets/image/sehir.jpg")} style={styles.sehir_ımage} />
            <Picker
              selectedValue={selectedCity}
              style={{ height: 50, width: 150 }}
              onValueChange={handleCityChange}
            >
              {cities.map((city, index) => (
                <Picker.Item label={city} value={city} key={index} />
              ))}
            </Picker>

            <Text style={styles.queryText}>Şehre Göre Sorgula</Text>

         


            <View style={{ paddingTop: 80 ,justifyContent:'center',alignItems:'center'}}>
              <Image source={require("../../../assets/image/hastane.jpg")} style={styles.sehir_ımage} />
              <Picker
                selectedValue={selectedHospital}
                style={{ height: 50, width: 150 }}
                onValueChange={handleHospitalChange}
              >
                {hospitals.map((hospital, index) => (
                  <Picker.Item label={hospital} value={hospital} key={index} />
                ))}
              </Picker>

              <Text style={styles.queryText}>  Hastaneye Göre Sorgula</Text>
              

            </View>
            
            <View style={{paddingTop:20}}>
              <TouchableOpacity style={styles.sorgula_button} onPress={handleSearch}>
                <Text style={{ color: 'white', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }} >SORGULA</Text>
              </TouchableOpacity>
            </View>
          </View>
 

          <View>
     {data.map((item, index) => (
  <Card key={index} containerStyle={{ borderRadius: 20, backgroundColor: '#f9dbdb' }}>
    <View style={styles.card_container}>
      <TouchableOpacity>
      <Image style={styles.doktor_image} source={{ uri: item.profilePhoto }} />
      </TouchableOpacity>
      <View style={styles.doktor_name_container}>
        <Text style={styles.Doktor_name_text}>{item.name} {item.surname}</Text>
      </View>
      <View style={styles.branş_text_container}>
        <Text style={styles.branş_text}>{item.specialization}</Text>
      </View>
      <View style={styles.name_text_container}>
      <Text style={styles.doktor_rank}>{item.rank} </Text>
      </View>
      <View style={styles.rating_container}>
        <Rating
          imageSize={30}
          onFinishRating={ratingCompleted}
          ratingColor='red'
        />
      </View>
     
    </View>
    <Card.Divider />
     
    <TouchableOpacity onPress={() => handleRandevuAl(item)} style={styles.randevu_button_container}>
      <Text style={styles.randevu_button_text}>RANDEVU AL</Text>
    </TouchableOpacity>
  </Card>
))}


 {loading && <ActivityIndicator size={'large'} color='black' /> } 
 {data.length >= page * 1  ? (
  <View style={styles.moreLoad_container}>

        <TouchableOpacity style={styles.moreLoad_touch_container} onPress={handleSearch}>
          <Text style={{  fontSize: 22,padding:10,}}>Daha Fazla Yükle</Text>
        </TouchableOpacity>

    
        </View>
      ):null}
    
    </View>




        </ImageBackground>
      </View>
    </ScrollView>


  );
}


const renderItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.categoryContainer}  >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default Appointment