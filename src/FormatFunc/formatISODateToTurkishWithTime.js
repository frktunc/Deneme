import { Text, View } from 'react-native'
import React, { Component } from 'react'

function formatISODateToTurkishWithTime(isoDateString) {
    const turkishMonths = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];
  
    const dateObject = new Date(isoDateString);
    const day = dateObject.getDate();
    const month = turkishMonths[dateObject.getMonth()];
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
  
    return `${day} ${month} ${year} / ${hours}:${minutes}`;
  }
  export default formatISODateToTurkishWithTime