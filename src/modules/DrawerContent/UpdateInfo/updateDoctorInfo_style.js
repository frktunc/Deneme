import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    image_background: {
        flex: 1,
      },
      main_text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 26,
        marginTop: 20,
      },
      container: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      pickerContainer: {
        marginBottom: 20,
        flex: 1,
        marginRight: 10,
      },
      picker: {
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 4,
        backgroundColor: 'white',
        marginTop: 15,
        margin: 10,
      },
      hour_text: {
        fontSize: 18,
        color: 'white'
      },
      Button_container: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      button_Touch: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        width: 120,
        height: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
    
      },
      button_text: {
        textAlign: 'center',
        color: 'white',
    
      },
      container1: {
        // flex: 1,
        alignItems: 'flex-start',
        marginLeft: 20,
    
    
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      text: {
        marginRight: 20,
        fontSize: 22
      },
      checkbox: {
        borderColor: 'blue',
        backgroundColor: 'lightgray',
    
      },
})
export default styles