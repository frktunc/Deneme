import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import { Calendar } from 'react-native-calendars';
import styles from './updateDoctorInfo_style';
import axios from 'axios';
import { useSelector } from "react-redux";
import { showMessage } from 'react-native-flash-message';

export default function UpdateDoctorInfo() {
  const weekdayss = {
    Pazartesi: { value: '0', isChecked: false },
    Salı: { value: '1', isChecked: false },
    Çarşamba: { value: '2', isChecked: false },
    Perşembe: { value: '3', isChecked: false },
    Cuma: { value: '4', isChecked: false },
  };
  const handleCheckboxChange = (day) => {
    setWeekdays(prevState => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        isChecked: !prevState[day].isChecked,
      },
    }));
  };
  const token = useSelector((state)=> state.auth.token);
  const [startHour, setStartHour] = useState(null);
  const [endHour, setEndHour] = useState(null);
  const hours = ['8', '9', '10', '11', '12', '13', '14', '15','16','17'];
  const [selectedInterval, setSelectedInterval] = useState(10);
  const intervals = [10, 30, 60];
  const [weekdays, setWeekdays] = useState({
    Pazartesi: false,
    Salı: false,
    Çarşamba: false,
    Perşembe: false,
    Cuma: false,
  });
  const [selectedDates, setSelectedDates] = useState({});
//Takvim
  const handleDateSelection = (day) => {
    // İzin gününü işaretle veya kaldır
    
    const updatedSelectedDates = { ...selectedDates };
    
    if (selectedDates[day.dateString]) {
      delete updatedSelectedDates[day.dateString];
    } else {
      console.log(updatedSelectedDates)
      updatedSelectedDates[day.dateString] = { selected: true, marked: true, selectedColor: 'blue' };
      // updatedSelectedDates[day.dateString] = true;
    }
    // const onlyDates = Object.keys(updatedSelectedDates).filter(date => updatedSelectedDates[date]);
    setSelectedDates(updatedSelectedDates);
  };
  

  //Randevu Sıklığı
const saveSelectedIntervalsToDatabase = () => {
  const Intervals = {
    workingInterval:selectedInterval
  };
  axios.patch('http://10.0.2.2:3000/api/doctor/workingtimes',Intervals,{
    headers:{
      Authorization:token.data,
    }
  }).then((response) =>{
     showMessage({
      message: 'Randevu sıklığınız Başarı İle Güncellendi',
      type: 'success',
    });
    console.log('Veri başarıyla sunucuya gönderildi:', response.data);
      console.log('başarılı');
  }).catch((error) => {
     showMessage({
      message: 'HATA',
      type: 'danger',
    });
    console.error('Sunucuya veri gönderirken hata oluştu:', error);
    console.log(selectedDates)
  })
}


//Takvim
const saveSelectedCalenderToDatabase = () => {
  const selectedDateList = Object.keys(selectedDates).map(date => {
    return { [date]: selectedDates[date] };
  });

  const calenderData = {
    selectedDates: selectedDateList, 
  };

  axios.patch('http://10.0.2.2:3000/api/doctor/resttimes', calenderData, {
    headers:{
      Authorization:token.data,
    },
  })
  .then((response) => {
    // showMessage({
    //   message: 'İzin Almak İstediğiniz Günler Başarı İle Gönderildi',
    //   type: 'success',
    // });
    console.log('Veri başarıyla sunucuya gönderildi:', response.data);
      console.log(requestData);
      console.log('başarılı');
  })
  .catch((error) => {
    // showMessage({
    //   message: 'HATA',
    //   type: 'danger',
    // });
    console.error('Sunucuya veri gönderirken hata oluştu:', error);
    console.log(selectedDates)
  });
 }


 //çalışma saatlerini güncelle
  const saveSelectedDatesToDatabase = () => {
   
    const requestData = {
      start: startHour,
      end: endHour,
      // selectedInterval: selectedInterval,
      // weekdays: weekdays,
      // selectedDates: selectedDates,
    };
  
    
    axios.patch('http://10.0.2.2:3000/api/doctor/workingtimes', requestData,{
      headers:{
        'Authorization': token.data,
      }
    })
      .then(response => {
        showMessage({
          message: 'Çalışma Saatleriniz Başarı İle Güncellendi',
          type: 'success',
        });
        console.log('Veri başarıyla sunucuya gönderildi:', response.data);
        console.log(requestData)
        console.log('başaarılıııı')
      
      })
      .catch(error => {
        showMessage({
          message: 'HATA',
          type: 'danger',
        });
        console.error('Sunucuya veri gönderirken hata oluştu:', error);
       
      });
  };
  // const filteredSelectedDays = Object.keys(weekdays)
  // .filter(day => weekdays[day].isChecked)
  // .map(day => weekdays[day].value);




  const handleStartHourChange = (itemValue) => {
    if(endHour && itemValue >= endHour) {
      showMessage({
        message: 'Hata',
        description: 'Başlangıç saati, bitiş saatinden büyük veya eşit olamaz.',
        type: 'danger',
      });
      return;
    }
    setStartHour(itemValue);
  };

  const handleEndHourChange = (itemValue) => {
    if(startHour && itemValue <= startHour) {
      showMessage({
        message: 'Hata',
        description: 'Bitiş saati, başlangıç saatinden küçük veya eşit olamaz.',
        type: 'danger',
      });
      return;
    }
    setEndHour(itemValue);
  };
  const handleIntervalChange = (value) => {
    setSelectedInterval(value);
  };



  return (
    <ImageBackground style={styles.image_background} source={require("../../../../assets/image/background.png")}>
      <ScrollView style={{ flex: 1 }}>
        <View>
          <Text style={styles.main_text}>Çalışma Saatlerinizi Güncelleyin</Text>

          <View style={styles.container}>
            <View style={styles.pickerContainer}>
              <Text style={styles.hour_text}>Başlangıç Saati:</Text>
              <Picker
                selectedValue={startHour}
                onValueChange={handleStartHourChange}
                style={styles.picker}
              >
                {hours.map((hour) => (
                  <Picker.Item key={hour} label={hour} value={hour} />
                ))}
              </Picker>
            </View>
            <View style={styles.pickerContainer}>
              <Text style={styles.hour_text}>Bitiş Saati:</Text>
              <Picker
                selectedValue={endHour}
                onValueChange={handleEndHourChange}
                style={styles.picker}
              >
                {hours.map((hour) => (
                  <Picker.Item key={hour} label={hour} value={hour} />
                ))}
              </Picker>
            </View>

          </View>
          <View style={styles.Button_container}>
            <TouchableOpacity style={styles.button_Touch} onPress={saveSelectedDatesToDatabase}>
              <Text style={styles.button_text}>DEĞİŞTİR</Text>
            </TouchableOpacity>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}>
            <Text style={{ fontSize: 19, color: 'white' }}>
              Çalışma Gününüzü ve Çalışma Aralığınız
            </Text>
          </View>

          <View style={styles.container1}>
            {Object.keys(weekdays).map((day) => (
              <View key={day} style={styles.row}>
                <Text style={styles.text}>{day}</Text>
                <CheckBox
                  style={styles.checkbox}
                  value={weekdays[day]}
                  onValueChange={() => handleCheckboxChange(day)}
                />
              </View>
            ))}
          

          </View>
          <View style={{justifyContent:'center',alignItems:'center',paddingBottom:20}}>
                <TouchableOpacity style={styles.button_Touch} >
              <Text style={styles.button_text}>ONAYLA</Text>
            </TouchableOpacity>
            </View>
          <View>
            <Text  style={{ fontSize: 19, color: 'white',textAlign:'center'}}>Randevu Sıklığınızı Belirleyin</Text>
            <Picker
              selectedValue={selectedInterval}
              onValueChange={handleIntervalChange}
              style={styles.picker}
            >
              {intervals.map((interval) => (
                <Picker.Item key={interval} label={`${interval} Dakikada bir yeni randevu`} value={interval} />
              ))}
            </Picker>
            
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.button_Touch} onPress={saveSelectedIntervalsToDatabase}>
              <Text style={styles.button_text}>ONAYLA</Text>
            </TouchableOpacity>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, paddingTop: 20 }}>
            <Text style={{ fontSize: 22, color: 'white' }}>İzin Almak İstediğiniz Günü Seçiniz</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


            <Calendar
              style={{ width: 380, height: 350, }}
              current={'2023-11-08'}
              markedDates={selectedDates}
              onDayPress={(day) => handleDateSelection(day)}
            />
            <View style={{padding:10}}>
              <TouchableOpacity style={styles.button_Touch} onPress={saveSelectedCalenderToDatabase}>
                <Text style={styles.button_text}>İzin İsteği Gönder</Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>
      </ScrollView>
    </ImageBackground>
  );
}






