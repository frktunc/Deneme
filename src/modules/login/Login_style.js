import { StyleSheet,Dimensions } from "react-native";
import  Colors from '../../styles/color'
import { color } from "react-native-elements/dist/helpers";
import { colors } from "react-native-elements";

  const{width,height} = Dimensions.get('window')

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

paddingBottom:270
},

main_text:{
    fontSize:42,
    color:Colors.primary,
    paddingTop:150,
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
input: {
    borderWidth: 1,
    borderColor: Colors.blue,
    padding: 10,
    borderRadius: 5,
    backgroundColor:'white'
  },
  textInput_container:{
    padding:15
  },
  rememberme_container:{
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:15
  },
  rememberme_text:{
    fontWeight:'bold',
    color:'#738bef',
    fontSize:18
  },
  doktor_login_container:{
    paddingTop:20,
    justifyContent:'center',
    alignItems:'center'
  },
  doktor_login_text:{
    fontSize:18,
    fontWeight:'bold'
  },
  doktor_login_container2:{
    paddingTop:10
  },
  modal_container:
    {
      
          position: 'absolute',
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          height: height * 0.6,
          // width: width * 0.5,
          
        },
        modal_main_text:{
          fontSize:19,
          fontWeight:'bold'
        },
        text_ınput_container:{
          borderWidth:1,
          
        },
        modal_box_container:{
        flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         padding:30,
        
    
        },
        modal_box_text:{
          width: 55,
          height: 55,
          borderWidth: 1,
          textAlign: 'center',
          borderRadius:100,
          backgroundColor:'#c4c4c4',
          borderColor:'#8791ff'
        }
  
})
export default styles