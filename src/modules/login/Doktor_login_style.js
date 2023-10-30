
    import { StyleSheet } from "react-native";
    import  Colors from '../../styles/color'
    import { colors } from "react-native-elements";
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
    backgroundColor:'#2f96bf',
    borderTopLeftRadius: 50, 
        borderTopRightRadius: 50, 
        overflow: 'hidden',
    
    paddingBottom:270
    },
    
    main_text:{
        fontSize:35,
        color:Colors.primary,
        paddingTop:150,
        // paddingLeft:40,
        textAlign:'center'
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
        color:'white',
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
      }
    })
    export default styles