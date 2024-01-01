import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop:20,
       justifyContent:'center',
       alignItems:'center',
       flexDirection:'row',
       
    },
    main_text: {
        fontSize: 32,
        fontWeight:'bold',
        marginRight:10
    },
    image_background:{
        flex:1
    },
    openButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
      },
      modal: {
        // justifyContent: 'center',
        // alignItems: 'center',
        height: 500,
        width: 400,
        backgroundColor: '#e5dede',
      },
      modalTitle: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        margin: 10,
      },
     
      closeButton: {
        marginTop: 20,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        
      },
});

export default styles;
