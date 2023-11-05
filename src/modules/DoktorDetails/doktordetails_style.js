import { StyleSheet } from "react-native";
import Colors from '../../styles/color';

const styles = StyleSheet.create({
    container:{
    flex:1,
    },
    image_background: {
    flex: 1,
        
      },
    main_text_container:{
    justifyContent:'center',
    alignItems:'center'
    },
    main_text:{
    fontSize:30,
    fontWeight:'bold'
    },
    doctor_image:{
        width:120,
        height:120,
        borderRadius:50
    },
    image_container:{
        flexDirection:'row',
        padding:10
    },
    name_text:{
        fontSize:18,
        fontWeight:'800',
        marginLeft:20
        
    },
    branş_container:{
        position:'absolute',
        
    },
    rank_container:{
        position:'absolute',
    },
    branş_text:{
        position:'absolute',
       paddingLeft:20,
       marginLeft:130,
       marginTop:40,
       fontSize:16
    },
    rank_text:{
        position:'absolute',
        paddingLeft:20,
        marginLeft:130,
        marginTop:65,
        fontSize:16
    },
    Konum_container:{
        position:'absolute',
        
    },
    Konum_text:{
        position:'absolute',
       paddingLeft:20,
       marginLeft:120,
       marginTop:80,
       fontSize:16
    },
    hakkımızda_text:{
            fontSize:18,
            fontWeight:'bold'
    },
    readMoreLink_Touchable:{
        justifyContent:'center',
        alignItems:'center'
    },
    longText:{
        fontSize:16
    },
    readMoreLink:{
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 8,
    marginBottom:4,
    },
    work_container:{
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:10
    },
    work_text:{
       fontSize:18,
       fontWeight:'bold' 
    },
    
    day_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 10, 
        alignItems: 'center', 
      },
      day: {
        fontWeight: 'bold', 
        fontSize: 16, 
      },
      day_saat: {
        fontSize: 16, 
        textAlign: 'center',
      },
      workHourContainer:{
        flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 10, 
  marginBottom: 10,
      },
      workHourText: {
  fontSize: 16,
  marginRight: 10, 
},
    
  
});

export default styles;