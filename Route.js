import React from 'react';

import { Provider } from 'react-redux';
import store from './src/Redux/store';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome'; 
import FlashMessage from "react-native-flash-message";

import GirişEkran from './src/modules/login/Login';
import KayıtEkran from './src/modules/Register/Register';
import AnaEkran from './src/modules/Main/main';
import ModalEkran from './src/components/Modal'
import RandevuEkran from './src/modules/Appointment/appointment';
import DoktorRandevu from './src/modules/Appointment/DoctorAppointment';
import DanışEkran from './src/modules/Consult/consult';
import OnlineEkran from './src/modules/OnlineMeeting/online';
import  Colors  from './src/styles/color';
import Doktordetails from './src/modules/DoktorDetails/doktordetails';
import Doktor_Login from './src/modules/login/Doktor_Login';
import DoktorMain from './src/modules/Main/DoktorMain'
import DoktorModal from './src/components/DoktorModal'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MainTabs() {
  
  return (
    <Provider store={store}>
    <Tab.Navigator
    keyboardHidesTabBar={true}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor:Colors.yellow },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: 'white',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Ana Sayfa') {
            iconName = 'home'; 
          } else if (route.name === 'Randevu İşlemleri') {
            iconName = 'calendar'; 
          } else if (route.name === 'Uzmana Danış') {
            iconName = 'user'; 
          } else if (route.name === 'Online Muayane') {
            iconName = 'video-camera'; 
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
       
       
      <Tab.Screen name="Ana Sayfa" component={AnaEkran} />
       <Tab.Screen name="Randevu İşlemleri" component={RandevuEkran} />
      <Tab.Screen name="Uzmana Danış" component={DanışEkran} />
      <Tab.Screen name="Online Muayane" component={OnlineEkran} />
    </Tab.Navigator>
    </Provider>
  );
}


function MainTabs2() {
  
  return (
  <Provider store={store}>

  
    <Tab.Navigator
    keyboardHidesTabBar={true}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor:Colors.yellow },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'white',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Profil Sayfam') {
            iconName = 'user';  
          } else if (route.name === 'Randevularım') {
            iconName = 'calendar'; 
          } else if (route.name === 'Hasta Mesajlarım') {
            iconName = 'envelope'; 
          } else if (route.name === 'Online Muayane') {
            iconName = 'video-camera'; 
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
       
       
      <Tab.Screen name="Profil Sayfam" component={DoktorMain} />
       <Tab.Screen name="Randevularım" component={DoktorRandevu} />
      <Tab.Screen name="Hasta Mesajlarım" component={DanışEkran} />
      <Tab.Screen name="Online Muayane" component={OnlineEkran} />
    </Tab.Navigator>
    </Provider>
  );
}


export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
    
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Login" component={GirişEkran} />
        <Stack.Screen name="Register" component={KayıtEkran} />
        <Stack.Screen name='DoktorLogin' component={Doktor_Login} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name='Main2' component={MainTabs2} />
        <Stack.Screen name='Modal' component={ModalEkran} />
        <Stack.Screen name='DoktorModal' component={DoktorModal} />
        <Stack.Screen name='Detail' component={Doktordetails} />
      </Stack.Navigator>
      <FlashMessage position="top" /> 
    </NavigationContainer>
    </Provider>
  );
}
