import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import Colors from '../styles/color';
import axios from 'axios';

function DoktorCard({ navigation }) {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false)
  const [page, setPage] = useState(1); 
  

  useEffect(() => {
    loadMoreData();
  }, []);

 
    
  

    const loadMoreData = () => {
      if(loading) return;

    axios
    .get(`http://10.0.2.2:3000/api/appointment/${page + 1}`)
      .then((response) => {
        const fetchedData = response.data.data;
        console.log('GET isteği başarılı:', fetchedData[0]);
        console.log(fetchedData.length);
        setData([...data, ...fetchedData]);
      setPage(page + 1);
      setLoading(false);
      console.log(page)
      })
      .catch((error) => {
        console.error('GET isteği hatası:', error);
        setLoading(false);
      });
  
    }
  const handleRandevuAl = (selectedDoctor) => {
    navigation.navigate('Detail',{doctor:selectedDoctor});
  };

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };

  return (
    <View>
     {data.map((item, index) => (
  <Card key={index} containerStyle={{ borderRadius: 20, backgroundColor: '#f9dbdb' }}>
    <View style={styles.card_container}>
      <TouchableOpacity>
        <Image style={styles.doktor_image} source={require('../../assets/image/diyetisyen.jpg')} />
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
  );
}

const styles = StyleSheet.create({
  card_container: {
    flexDirection: 'row',
  },
  doktor_image: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  Doktor_name_text: {
    fontSize: 22,
  },
  doktor_rank: {
    fontWeight: 'bold',
  },
  branş_text_container: {
    position: 'absolute',
    marginLeft: 130,
    marginTop: 50,
    paddingLeft: 30,
  },
  name_text_container: {
    position: 'absolute',
    marginLeft: 130,
    marginTop: 80,
    paddingLeft: 30,
  },
  branş_text: {
    fontSize: 18,
  },
  rating_container: {
    position: 'absolute',
    marginLeft: 130,
    marginTop: 130,
    paddingLeft: 30,
  },
  randevu_button_container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderRadius: 20,
    marginTop:20,
  },
  randevu_button_text: {
    fontSize: 22,
  },
  doktor_name_container:{
    backgroundColor: Colors.primaryLight,
     margin: 10,
      marginLeft: 30, 
     marginRight: 20,
      marginBottom: 100,
      justifyContent: 'center', 
      alignItems: 'center', 
      borderRadius: 5
  },
  moreLoad_container:{
    justifyContent:'center',
    alignItems:'center'
  },
  moreLoad_touch_container:{
    borderWidth:1,
    width:200,height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    backgroundColor:'white'
  }
  
 
});

export default DoktorCard;
