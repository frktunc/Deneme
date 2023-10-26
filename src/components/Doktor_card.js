import { Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { Card,  } from 'react-native-elements';
import { Rating,  } from 'react-native-ratings';
import  Colors from '../styles/color'

function DoktorCard({navigation}) {
 
  const handleRandevuAl = () =>{
    navigation.navigate('Detail')
  }

    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating);
      }
    return (
        <View >
        <Card containerStyle={{ borderRadius: 20,backgroundColor:'#f9dbdb' }} >
          <View style={styles.card_container}> 

          <TouchableOpacity>
          <Image style={styles.doktor_image} source={require('../../assets/image/diyetisyen.jpg')} />
          </TouchableOpacity>

          <View style={{backgroundColor:Colors.primaryLight,margin:10,marginLeft:30,marginRight:20,marginBottom:100,justifyContent:'center',alignItems:'center',borderRadius:5}}>
          <Text style={styles.Doktor_ünvan_text}>PROF. DOCTOR</Text>
          </View>

          </View>
          <View style={styles.branş_text_container}>
            <Text style={styles.branş_text}>Dentist</Text>
          </View>
          <View style={styles.rating_container}>
            <Rating
         
           imageSize={30}
          
        onFinishRating={ratingCompleted}
        ratingColor='red'
        
      />
          </View>
          <View style={{paddingTop:5}}>
          <Text style={styles.doktor_name}>İSİM ----SOYİSİM</Text>
          </View>
          
  
        <Card.Divider />
        
          <TouchableOpacity onPress={handleRandevuAl} style={styles.randevu_button_container}>
          <Text style={styles.randevu_button_text}>RANDEVU AL</Text>
         </TouchableOpacity>
            </Card>
        </View>
    )
  }
  const styles = StyleSheet.create({
    card_container:{
        flexDirection: 'row', 
        
      },
      doktor_image:{
        width:130,
        height:130,
        borderRadius:10
      },
      Doktor_ünvan_text:{
        fontSize: 22,
      },
      doktor_name:{
        fontWeight:'bold'
      },
      branş_text_container:{
        position:'absolute',
        marginLeft:130,
        marginTop:50,
        paddingLeft:30
      },
      branş_text:{
        fontSize:18
      },
      rating_container:{
        
         position:'absolute',
         marginLeft:140,
        marginTop:130,
        paddingLeft:30
      },
      randevu_button_container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.primaryLight,
        borderRadius:20
      },
      randevu_button_text:{
        fontSize:22
      }
  });
export default DoktorCard

