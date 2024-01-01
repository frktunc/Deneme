import { StyleSheet } from "react-native";
import Colors from '../../styles/color'
const styles = StyleSheet.create({
  main_container:{
flex:2
  },
  main_text_container:{
    justifyContent:'center',
    alignItems:'center'
  },
  card_container: {
    flexDirection: 'row',
  },
  main_text:{
    fontSize:28,
    color:'white'
  },
  doktor_image: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  Doktor_name_text: {
    fontSize: 22,
  },
  doktor_rank: {
    fontWeight: 'bold',
  },
  branş_text_container: {
    position: 'absolute',
    marginLeft: 130,
    marginTop: 50,
    paddingLeft: 30,
  },
  name_text_container: {
    position: 'absolute',
    marginLeft: 130,
    marginTop: 80,
    paddingLeft: 30,
  },
  branş_text: {
    fontSize: 18,
  },
  rating_container: {
    position: 'absolute',
    marginLeft: 130,
    marginTop: 130,
    paddingLeft: 30,
  },
  randevu_button_container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderRadius: 20,
    marginTop:20,
  },
  randevu_button_text: {
    fontSize: 22,
  },
  doktor_name_container:{
    backgroundColor: Colors.primaryLight,
     margin: 10,
      marginLeft: 30, 
     marginRight: 20,
      marginBottom: 100,
      justifyContent: 'center', 
      alignItems: 'center', 
      borderRadius: 5
  },
  moreLoad_container:{
    justifyContent:'center',
    alignItems:'center'
  },
  moreLoad_touch_container:{
    borderWidth:1,
    width:200,height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    backgroundColor:'white'
  },
  ImageAndText:{
    paddingTop:60,
    justifyContent:'center',
    alignItems:'center',
  },
  sehir_ımage:{
    
    width:240,
    height:140,
    borderRadius:10
  },
  queryText:{
    fontSize:18,
    color:'white'
  },
  sorgula_button:{
    borderWidth:1,
    borderRadius:30,
    width:100,
    height:40,
    marginVertical:10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.yellow
  }
})
export default styles;

