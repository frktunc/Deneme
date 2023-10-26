import { StyleSheet } from "react-native";
import  Colors from '../../styles/color'
const styles = StyleSheet.create({
    container: {
        flex: 1,
      
      },
      image_background:{
        flex:1
      },
      main_Text_container:{
        justifyContent:'center',
        alignItems:'center'

      },
      main_text:{
        fontSize:32,
        fontWeight:'bold',
        color:Colors.yellow
      },
      messageContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 6,
        margin:10,
        marginBottom: 10,
        maxWidth: '60%', // Mesajlar 70% genişlikte olsun
      },
      messageText: {
        fontSize: 16,
        fontWeight:'600'
      },
      messageTime:{
        textAlign:'right',
        fontWeight:'bold'
      },
      input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 10,
        padding: 10,
        margin:15,
        backgroundColor:Colors.yellow
      },
})
export default styles