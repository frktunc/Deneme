import React, {useState,useEffect} from 'react';
import { Text, View, ImageBackground, Image, TouchableOpacity, FlatList, ScrollView,ActivityIndicator } from 'react-native';
import styles from './appointment_style';
import { Button, SearchBar,Card } from 'react-native-elements';
import axios from 'axios';
import { Rating } from 'react-native-ratings';





function Appointment({ navigation }) {


  const [searchText, setSearchText] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading,setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]); 

  useEffect(() => {
    loadMoreData();
    
  }, []);

  const loadMoreData = () => {
    if(loading) return;
   
  axios
  .get(`http://10.0.2.2:3000/api/appointment/${page + 1}?&sort=asc`)
    .then((response) => {
      const fetchedData = response.data.data;
      console.log(response)
      console.log('GET isteği başarılı:', fetchedData[0]);
      // console.log(fetchedData.length);
      setData([...data, ...fetchedData]);
    setPage(page + 1);
    setLoading(false);
    // console.log(page)
    })
    .catch((error) => {
      console.error('GET isteği hatası:', error);
      setLoading(false);
    });
    
  }
const handleRandevuAl = (selectedDoctor) => {
  navigation.navigate('Detail',{doctor:selectedDoctor});
};



  
  const handleCategoryPress = (specialization) => {
    setLoading(true);
    setPage(0)
    console.log(specialization)
    console.log(page)
    
    setLoading(false)
    axios.get(`http://10.0.2.2:3000/api/appointment/${page + 1}?filter=${specialization}&sort=asc`)
      .then((response) => {
        
        const fetchedData = response.data;
        console.log(fetchedData.data.length)
        setFilteredDoctors(fetchedData);
        setLoading(false);
        setPage(page + 1);
       
        console.log('başarılıııııı')
        console.log('Fetched Data:', fetchedData);
        return true
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching data:', error);
        return false

      });
  };
  



  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.categoryContainer}  onPress={() => handleCategoryPress(item.specialization)}>
        <Image source={item.image} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.name}</Text>
      </TouchableOpacity>
    );
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

          <View>
            <ScrollView>
              <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                horizontal
                 />
                 
            </ScrollView>
          </View>

          <View style={{ padding: 10, paddingHorizontal: 18 }}>
       
            
          </View>
       
          <View>
     {data.map((item, index) => (
  <Card key={index} containerStyle={{ borderRadius: 20, backgroundColor: '#f9dbdb' }}>
    <View style={styles.card_container}>
      <TouchableOpacity>
        <Image style={styles.doktor_image} source={require('../../../assets/image/default-avatar.png')} />
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

        <TouchableOpacity style={styles.moreLoad_touch_container} onPress={loadMoreData}>
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

export default Appointment;