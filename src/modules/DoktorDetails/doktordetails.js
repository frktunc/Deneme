import { View, Text, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { Card, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './doktordetails_style';
import Modal from 'react-native-modalbox';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';


const LongText = ({ text }) => {
  const [showMore, setShowMore] = useState(false);
  
  
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <View>
        <Text style={styles.hakkımızda_text}>Doktorunuz Hakkında:</Text>
      <Text numberOfLines={showMore ? undefined : 2} style={styles.longText}>
        {text}
      </Text>
      {!showMore && (
        <TouchableOpacity style={styles.readMoreLink_Touchable} onPress={toggleShowMore}>
          <Text style={styles.readMoreLink}>Daha Fazla</Text>
        </TouchableOpacity>
      )}
      {showMore && (
        <TouchableOpacity style={styles.readMoreLink_Touchable}onPress={toggleShowMore}>
          <Text style={styles.readMoreLink}>Daha Az</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

function Doktordetails() {

  const{width,height} = Dimensions.get('window')
  const workingHours = ['08.00 - 09.00', '09.00 - 10.00','10.00 - 11.00', '11.00 - 12.00', '13.00-14.00' ,'14.00-15.00','15.00 - 16.00'];
  const daysofWeek = ['Pazartesi', 'Salı','Çarşamba','Perşembe', 'Cuma'];

  const [isModalVisible, setModalVisible] = useState(false);
  const[selectedDay,setSelectedDay] = useState('Pazartesi');
  const[selectedHours,setSelectedHours] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const openModal = (day) => {
    setModalVisible(true);
    setSelectedDay(day);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('tr-TR'); // Tarihi istediğiniz formata dönüştürün
  
    setSelectedDate(formattedDate);

  }

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDay('Pazartesi');
  }
  const createAppointment = () => {
    // SEÇİLEN SAATLERE GÖRE RANDEVU İŞLEMLERİNİ BURDA YAPICAM
  }
  
  const renderWorkHours = (day) => {
    return (
      <View style={{flex:1}}>
        <ScrollView>
          {workingHours.map((hour) => (
            <View key={hour} style={styles.workHourContainer}>
              <Text style={styles.workHourText} >{hour}</Text>
              <CheckBox  
             
                value={selectedHours[hour]}
                onValueChange={(value) =>
                  setSelectedHours({...selectedHours, [hour]: value})
                }
              />
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={createAppointment}>
          <Text style={{color:'red',fontSize:22}}>Randevu Oluştur</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const longText = "Bu, çok uzun bir metin örneğidir ve kullanıcının 'Daha Fazla' düğmesine tıkladığında daha fazlasını görmesine olanak tanır. Bu yöntem, uzun metinleri daha iyi kullanıcı deneyimi sunmak için kısaltmanıza ve daha fazla içerik göstermek için kullanıcıya izin vermenize olanak sağlar.";
  
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image_background} source={require("../../../assets/image/background.png")}>
        <ScrollView>
        <View style={styles.main_text_container}>
          <Text style={styles.main_text}>Doktorunuz Hakkında</Text>
        </View>
        <Card containerStyle={{ borderRadius: 20 }}>
          <View style={styles.image_container}>
            <Image source={require('../../../assets/image/diyetisyen.jpg')} style={styles.doctor_image} />
            <Text style={styles.name_text}>Dr. Faruk Serhat Tunç</Text>
          </View>
          <View style={styles.branş_container}>
            <Text style={styles.branş_text}>Dentist</Text>
          </View>
          <View style={styles.Konum_container}>
            <Text style={styles.Konum_text}>
              <Icon name="map-marker" size={30} color="red" />
              Hastane Konum Bilgileri
            </Text>
          </View>
          <Card.Divider />

          <LongText text={longText} />

          <Card.Divider />
          <View style={styles.work_container}>
            <Text style={styles.work_text}>
                Çalışma Saatleri:
            </Text>
          </View>
          <View>
  <Text style={styles.day_container}>
    <Text style={styles.day}>Pazartesi:</Text>
    <Text style={styles.day_saat}>09.00-17.00</Text>
  </Text>

  <Text style={styles.day_container}>
    <Text style={styles.day}>Salı:</Text>
    <Text style={styles.day_saat}>09.00-17.00</Text>
  </Text>

  <Text style={styles.day_container}>
    <Text style={styles.day}>Çarşamba:</Text>
    <Text style={styles.day_saat}>09.00-17.00</Text>
  </Text>

  <Text style={styles.day_container}>
    <Text style={styles.day}>Perşembe:</Text>
    <Text style={styles.day_saat}>09.00-17.00</Text>
  </Text>

  <Text style={styles.day_container}>
    <Text style={styles.day}>Cuma:</Text>
    <Text style={styles.day_saat}>09.00-17.00</Text>
  </Text>

  
  <View style={{justifyContent:'center',alignItems:'center'}}>
  <Text style={{color:'red',fontSize:18}}> Randevu Almak istediğiniz Günü Seçiniz</Text>
  </View>
  

      <View style={{justifyContent:'center',alignItems:'center'}}>
        {daysofWeek.map((day) => (
          
          <TouchableOpacity key={day} onPress={() => openModal(day)}>
            <Text style={{fontSize:20,color:'#ffc247'}}> - {day}</Text>
          </TouchableOpacity>
         
        ))}
      </View>
     
      <Modal
        style={{
          flex:1,
          justifyContent:'center',
          alignItems:'center',
          height: height * 0.7,
          width: width * 0.8,
          
        }}
        isOpen={isModalVisible}
        onClosed={() => closeModal()}
      >
        
        <Text style={{fontSize:20,textDecorationLine:'underline',color:'red'}}>{selectedDay}</Text>
        {renderWorkHours(selectedDay)}

            { <Text style={{ fontSize: 16, color: 'blue' }}>
    Tarih: {selectedDate}
  </Text> }
  {/* {renderWorkHours(selectedDay)} */}
        
      </Modal>
     
      
</View>

           <Card.Divider /> 

           <View  style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:18,fontWeight:'700'}}>Adres Bilgisi:</Text>
           </View>
          <Text>
          Bu, çok uzun bir metin örneğidir ve kullanıcının 'Daha Fazla' düğmesine tıkladığında daha fazlasını görmesine olanak tanır. Bu yöntem, uzun metinleri daha iyi kullanıcı deneyimi sunmak için kısaltmanıza ve daha fazla içerik göstermek için kullanıcıya izin vermenize olanak sağlar.
          </Text>
        </Card>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

export default Doktordetails;




