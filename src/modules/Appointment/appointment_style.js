import { StyleSheet } from "react-native";
import Colors from '../../styles/color';

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  image_background: {
    flex: 1,
    
  },
  main_text_container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  main_text: {
    fontSize: 32,
    color: 'white',
  },
  categoryContainer: {
    backgroundColor:Colors.yellow, 
    borderRadius: 10, 
    margin: 5, 
    padding: 10,
    alignItems: 'center',
    width:100,
    height:180
  },
  categoryImage: {
    width: 100, 
    height: 100,
    borderRadius: 50, 
  },
  categoryName: {
    marginTop: 5,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    color:'black'
  },
  
  
});

export default styles;
