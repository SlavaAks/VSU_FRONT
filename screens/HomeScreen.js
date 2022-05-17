import React, { useEffect,useState } from 'react';
import { View, Text, Button, StyleSheet ,SafeAreaView,Modal, Alert,ImageBackground,FlatList} from 'react-native';
// import { Modal } from 'react-native-paper';
import $api from '../api/client';
import Mybutton from '../components/Mybutton';
import Mytextinput from '../components/Mytextinput';

import Icon from 'react-native-vector-icons/FontAwesome';
import { IconButton, Colors } from 'react-native-paper';
import CourseButton from '../components/CourseButton';
import ModuleScreen from './ModuleScreen';


const HomeScreen = (props) => {
    const [rerender, setRerender] = useState(false);
    const [items,setItems]=useState([])



    useEffect(()=>{
    const resp=$api.get(`api/student/course/`)
    resp.then(resp=>setItems(resp.data)).catch(err=>console.log(err))
    },[rerender])


   
    let listViewItemSeparator = () => {
      return (
        <View
          style={{
            height: 0.2,
            width: '100%',
            backgroundColor: '#808080',
          }}
        />
      );
    };
  
    let listItemView = ({ item }) => {

      return (
        <CourseButton Click={()=>props.navigation.navigate("ModuleScreen",{"course":item.id})}
        title={item.title} overview={item.overview}/>
      );
    };





      return (

        <>
      <View style={styles.container}>
        {/* <ImageBackground source={require("../assets/VSU.png")}  resizeMode="cover" style={styles.image}> */}
        <SafeAreaView>

                <FlatList
                  data={items}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={ listItemView}
                  />
        </SafeAreaView>
        </View>

          {/* </ImageBackground> */}
          </>
        
      );

};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(254,254,247,1)",
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});