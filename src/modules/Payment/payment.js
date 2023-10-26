import React, { useState } from 'react';
import { Text, View, ImageBackground, ScrollView, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { CreditCardInput } from 'react-native-credit-card-input';
import styles from './payment_style';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Payment() {
  const [cardData, setCardData] = useState({
    valid: false,
    values: {},
  });

  const handleCardChange = (formData) => {
    setCardData({
      valid: formData.valid,
      values: formData.values,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../../assets/image/background.png")} style={styles.image_background}>
        <View style={styles.main_container}>
          <Text style={styles.main_text}>
            Ödeme Yönteminizi Seçiniz
          </Text>
        </View>
        <View style={{padding:5,paddingLeft:15}}>
          <Text style={styles.kartekle_text}>Yeni Kart Ekle :</Text>
        </View>
        <Card  containerStyle={{ borderRadius: 20 }}>
          <CreditCardInput
            requiresName
            requiresCVC
            labelStyle={{ color: 'black', fontSize: 12 }}
            inputStyle={{ color: 'black', fontSize: 16 }}
            validColor="black"
            invalidColor="red"
            placeholderColor="black"
            onChange={handleCardChange}
          />
          <View style={styles.card_container}>
            <Text style={styles.kard_text} >
              Kart Sahibi: {cardData.values.name || ''}
            </Text>
            <Text style={styles.kard_text}>Kart Numarası: {cardData.values.number || ''}</Text>
            <Text style={styles.kard_text}>Son Kullanma Tarihi: {cardData.values.expiry || ''}</Text>
            <Text style={styles.kard_text}>CVC: {cardData.values.cvc || ''}</Text>
            <View style={{padding:20}}>
            <Button title='Kart Bilgilerimi Kaydet' color={'red'} />
            </View>
            
          </View>
        </Card>


        <View style={styles.farklı_text_container}>
            <Text style={styles.farklı_text}>
                Farklı Bir Ödeme Yöntemi Seçin : 
            </Text>
        </View>

        <View style={styles}>
            <TouchableOpacity>

            </TouchableOpacity>
        </View>
            
      </ImageBackground>
    </View>
  );
}

export default Payment;