import React from 'react';
import { View, Button, Alert } from 'react-native';
import { BackHandler } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

const ExitButton = () => {
  const handleExit = () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış Yapmak İstediğinize Emin misiniz?',
      [
        {
          text: 'Vazgeç',
          style: 'cancel',
        },
        {
          text: 'Çıkış Yap',
          onPress: () => {
            BackHandler.exitApp();
            // Burada çıkış işlemi gerçekleştirilebilir
            // Örneğin:
            // Çıkış işlemi için ilgili kodu buraya ekleyin (örneğin uygulamayı kapatma)
            // Örnek olarak:
            // Native yöntem ile uygulamadan çıkış yapmak (bu kısmı cihaza göre uygulama yapılandırmasına göre değiştirmeniz gerekebilir)
            // örneğin:
            // Platform.OS === 'ios' ? RNExitApp.exitApp() : BackHandler.exitApp();
            // yukarıdaki kod Android ve iOS platformlarında uygulamadan çıkış yapmak için kullanılabilir
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <Icon name="sign-out" size={30} color="red" onPress={handleExit} />
    </View>
  );
};

export default ExitButton;
