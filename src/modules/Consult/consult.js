// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList } from 'react-native';
// import styles from './online_style';
// import axios from 'axios';

// const ChatScreen = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
// //   const apiEndpoint = 'https://api.example.com/messages'; 

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(apiEndpoint);
//       setMessages(response.data);
//     } catch (error) {
//       console.error('Mesajları alma hatası:', error);
//     }
//   };

//   const sendMessage = async () => {
//     try {
//       const response = await axios.post(apiEndpoint, { text: message });
//       console.log('Mesaj gönderildi:', response.data);
//       setMessage(''); // Mesaj gönderildikten sonra input temizlenir
//     } catch (error) {
//       console.error('Mesaj gönderme hatası:', error);
//     }
//   };

//   useEffect(() => {
//     fetchMessages(); // Sayfa yüklendiğinde mesajları al
//   }, []);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.messageContainer}>
//             <Text style={styles.messageText}>{item.text}</Text>
//           </View>
//         )}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Mesajınızı girin"
//         value={message}
//         onChangeText={(text) => setMessage(text)}
//         returnKeyType="send" 
//         onSubmitEditing={sendMessage} // 
//       />
//     </View>
//   );
// };

// export default ChatScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ImageBackground, FlatList,ScrollView } from 'react-native';
import styles from './consult_style';
import axios from 'axios';
import  Colors from '../../styles/color'


const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
//   const apiEndpoint = 'https://api.example.com/messages'; 

  const fetchMessages = async () => {
    // API'den mesajları almak için axios veya fetch kullanılmalıdır.
    // Bu örnekte API endpoint'inizin kullanılmadığını anlıyorum.
    // İşte API'den mesajları alırken kullanabileceğiniz yerel bir örnek:
    
    // const response = await axios.get(apiEndpoint); // Gerçek API endpoint'i
    
 
  };

  const sendMessage = async () => {
    if (!message) return; // Boş mesajları engelle
    // API'ye mesajı göndermek için axios veya fetch kullanılmalıdır.
    // Bu örnekte yerel mesajları kullanarak:
    const currentTime = new Date().toLocaleTimeString(); // O anki saat bilgisini al
    const newMessage = { id: messages.length + 1, text: message, time: currentTime };
    setMessages([...messages, newMessage]);
    setMessage(''); // Mesaj gönderildikten sonra input temizlenir
  };
 
  useEffect(() => {
    fetchMessages(); // Sayfa yüklendiğinde mesajları al
  }, []);

  return (


   
    <View style={styles.container}>
      
        <ImageBackground style={styles.image_background} source={require("../../../assets/image/background.png")}>
         <View style={styles.main_Text_container}>
        <Text style={styles.main_text}>
            Uzmana Danış
        </Text>
        </View>
        <Text style={{margin:10,fontWeight:'bold',fontSize:20}}>
          Ben :
          </Text>   
      <FlatList
      
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
        )}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Mesajınızı girin"
        value={message}
        onChangeText={(text) => setMessage(text)}
        returnKeyType="send"
        onSubmitEditing={sendMessage}
      />
      </ImageBackground>
     
    </View>
    
  );
};

export default ChatScreen;

