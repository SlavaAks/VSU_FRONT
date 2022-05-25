import React, { useEffect,useState } from 'react';
import { View, Text, Button, StyleSheet ,SafeAreaView,Modal, Alert,ImageBackground,FlatList} from 'react-native';
// import { Modal } from 'react-native-paper';
import $api from '../api/client';
import Mybutton from '../components/Mybutton';
import Mytextinput from '../components/Mytextinput';

import Icon from 'react-native-vector-icons/FontAwesome';
import { IconButton, Colors } from 'react-native-paper';
import CourseButtonEdite from '../components/CourseButtonEdite';
import DraggableFlatList, { RenderItemInfo, OnMoveEndInfo } from 'react-native-draggable-flatlist'
import ModuleListItemStudent from '../components/ModuleListItemStudent';
import VideoPlayer from '../components/VideoPlayerCustom';

const ModuleScreen= (props) => {
    const [rerender, setRerender] = useState(false);
    const [items,setItems]=useState([])



    useEffect(()=>{
    const resp=$api.get(`api/student/course/${props.route.params.course}/module/`)
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
         
         <ModuleListItemStudent
         Click={()=>props.navigation.navigate("ContentScreen",{"module":item.id})}
        title={item.title} order={item.order}/>
      );
    };
      return (

        <>
         
        <ImageBackground source={require("../assets/VSU.png")}  resizeMode="cover" style={styles.image}>
       
          <SafeAreaView>
 

                <FlatList
                  data={items}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={ listItemView}
                  />


          </SafeAreaView>   
          {/* <VideoPlayer/> */}
          </ImageBackground>

          </>
        
      );

};

export default ModuleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 


  },
  image: {
    flex: 1,

  },
});