import React, { useEffect,useState } from 'react';
import { View, Text, Button, StyleSheet ,SafeAreaView,Modal, Alert,ImageBackground} from 'react-native';
// import { Modal } from 'react-native-paper';
import $api from '../api/client';
import Mybutton from '../components/Mybutton';
import Mytextinput from '../components/Mytextinput';

import Icon from 'react-native-vector-icons/FontAwesome';
import { IconButton, Colors } from 'react-native-paper';
import CourseButtonEdite from '../components/CourseButtonEdite';
import DraggableFlatList, { RenderItemInfo, OnMoveEndInfo } from 'react-native-draggable-flatlist'
import ModuleListItem from '../components/ModuleListItem';

const ModuleScreen= (props) => {
    const [rerender, setRerender] = useState(false);
    const [items,setItems]=useState([])
    const [subject,setSubject]=useState()
    const [title,setTitle]=useState()
    const [slug,setSlug]=useState()
    const [owerw,setOwerw]=useState()
    const [isvisible,setIsvisibnle]=useState(false)


    useEffect(()=>{
    console.log(1111)
    console.log(props.route.params.course)
    const resp=$api.get(`api/course/${props.route.params.course}/module`)
    resp.then(resp=>setItems(resp.data)).catch(err=>err=>console.log(err))

    },[rerender,props])





   
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
  
    let listItemView = ({ item, drag, isActive }) => {
      return (
         
         <ModuleListItem
         Click={()=>props.navigation.navigate("ContentScreen",{"module":item.id})}
        title={item.title} order={item.order}/>
      );
    };




      return (

        <>
         
        <ImageBackground source={require("../assets/VSU.png")}  resizeMode="cover" style={styles.image}>
       
          <SafeAreaView>
 
        <IconButton 
    icon="plus"
    color={Colors.red500}
    style={{alignSelf: "center"}}
    size={35}
    onPress={() => setIsvisibnle(true)}
          />

                <FlatList
                  data={items}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={ listItemView}
                  />


          </SafeAreaView>   
          </ImageBackground>

          </>
        
      );

};

export default ModuleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});