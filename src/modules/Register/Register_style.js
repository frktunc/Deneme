import { StyleSheet } from "react-native";
import  Colors from '../../styles/color'
const styles = StyleSheet.create({
    main_container:{
        flex:1,
        
        flexDirection: 'column',
        
        },
        yrd_container:{
            flex:1,
          backgroundColor: 'white',
           
        },
        yrd_container2:{
        flex:1,
        backgroundColor:Colors.primary,
        borderTopLeftRadius: 50, 
            borderTopRightRadius: 50, 
            overflow: 'hidden',
        
        paddingBottom:350
        },
        
        main_text:{
            fontSize:42,
            color:Colors.primary,
            paddingTop:100,
            paddingLeft:40
        },
        title_girş:{
            marginTop:20,
            fontSize:34,
            marginLeft:30,
            color:'white'
        },
        question:{
            fontSize:16,
            paddingTop:10,
            padding:10,
            paddingLeft:30,
            textAlign:'center'
        },
        create_account:{
            fontSize:18,
            fontWeight:'bold',
           
            textAlign:'center'
            
        },
        input:{
            borderWidth: 1,
            borderColor: Colors.blue,
            padding: 10,
            borderRadius: 5,
            backgroundColor:'white'
        }
})
export default styles;