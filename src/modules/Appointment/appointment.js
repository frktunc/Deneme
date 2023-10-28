import React, {useState,useEffect} from 'react';
import { Text, View, ImageBackground, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import styles from './appointment_style';
import  Colors from '../../styles/color'
import DoktorCard from '../../components/Doktor_card';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';



const categories = [
  { id: '1', name: 'Cerrahi', image: require('../../../assets/image/cerrahi.jpg') },
  { id: '2', name: 'Diş Hekimi', image: require('../../../assets/image/dişhekimi.jpg') },
  { id: '3', name: 'Kulak Burun Boğaz', image: require('../../../assets/image/kbb.jpg') },
  { id: '4', name: 'Çocuk Doktoru', image: require('../../../assets/image/çocukdoktor.jpg') },
  { id: '5', name: 'Psikoloji', image: require('../../../assets/image/pisikoloji.jpg') },
  { id: '6', name: 'Diyetisyen', image: require('../../../assets/image/diyetisyen.jpg') },
  { id: '7', name: 'Kardiyoloji', image: require('../../../assets/image/kardiyoloji.jpg') },
  { id: '8', name: 'Onkolog', image: require('../../../assets/image/onkoloji.jpg') },
  { id: '9', name: 'Ürolog', image: require('../../../assets/image/ürolog.jpg') },
];

// const [name,setName] = useState('');
// const [ünvan, setÜnvan] = useState('');
// const[branş,setBranş] = useState('');
// const[DImage,setDİmage] = useState('')

//

function Appointment({navigation}) {
  
  


  const renderItem = ({ item }) => {
    return (
      
      <TouchableOpacity style={styles.categoryContainer}>
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
        <ScrollView >
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            horizontal
          />
          
        </ScrollView>
        </View>
        <View style={{padding:10,paddingHorizontal:18}}>
        <SearchBar
        inputContainerStyle={{ backgroundColor: 'lightgray',borderRadius:20 }} 
        placeholder="Ara..."
        // onChangeText={text => setSearchText(text)}
        // value={searchText}
      />
        </View>
        
       <DoktorCard navigation={navigation} />
       
        
      
      </ImageBackground>
    </View>
    </ScrollView>

  );
}

export default Appointment;
