import React from 'react';
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
import DanışEkran from './src/modules/Consult/consult';
import OnlineEkran from './src/modules/OnlineMeeting/online';
import  Colors  from './src/styles/color';
import Doktordetails from './src/modules/DoktorDetails/doktordetails';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MainTabs() {
  return (
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
  );
}


export default function App() {
  return (
    <NavigationContainer>
    
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={GirişEkran} />
        <Stack.Screen name="Register" component={KayıtEkran} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name='Modal' component={ModalEkran} />
        <Stack.Screen name='Detail' component={Doktordetails} />
      </Stack.Navigator>
      <FlashMessage position="top" /> 
    </NavigationContainer>
    
  );
}
