// import React, { useState } from 'react';
// import { View, Text, Modal, Button, TouchableOpacity } from 'react-native';


// const [modalVisible, setModalVisible] = useState(false);
//     function LogoutComponent() {
  

//   const handleLogout = () => {
//     // Oturumu kapatma işlemleri burada gerçekleştirilebilir.
//     console.log('Oturum kapatıldı.');
//     setModalVisible(false);
//   };

//   return (
//     <View>
//       <Button title="Oturumu Kapat" onPress={() => setModalVisible(true)} />
//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         transparent={true}
//       >
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: 300 }}>
//             <Text>Oturumu kapatmak istediğinize emin misiniz?</Text>
//             <Button title="Evet" onPress={handleLogout} />
//             <Button title="Hayır" onPress={() => setModalVisible(false)} />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// export default LogoutComponent;
