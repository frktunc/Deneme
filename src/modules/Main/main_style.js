import { StyleSheet } from "react-native";
import  Colors from '../../styles/color'
const styles = StyleSheet.create({
    container:{
flex:1,

    },
    image_background:{
        flex:1
    },
    image_view:{
        backgroundColor:Colors.primary,
        width:120,
        height:120,
        borderRadius:100,
        
    },
    icon_container:{
        justifyContent:'space-between',
        flexDirection:'row'
    },
    resim_text:{
       textAlign:'center',
       marginTop:3,
       fontWeight:'bold',
       
       
    },
    person_ad:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20,
        paddingBottom:10,
        color:'black'
    },
    person_infarmations:{
        padding:5,
        paddingBottom:10,
    },
    person_text:{
        fontSize:18,
        fontWeight:'700',
        color:'black'
    },
    randevu_main_text:{
       textAlign:'center',
       fontSize:24,
       paddingBottom:10
    }
})
export default styles