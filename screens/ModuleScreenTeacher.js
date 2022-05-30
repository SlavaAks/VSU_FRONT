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
import CupertinoHeaderBackModules from '../components/CupertinoHeaderBackModules';

const ModuleScreenTeacher = (props) => {
    const [rerender, setRerender] = useState(false);
    const [items,setItems]=useState([])

    const [title,setTitle]=useState()
    const [descr,setDescr]=useState()
    const [isvisible,setIsvisibnle]=useState(false)


    useEffect(()=>{ 
    const resp=$api.get(`api/course/${props.route.params.course}/module/`)
    resp.then(resp=>setItems(resp.data)).catch(err=>err=>console.log(err))
    // },)
    },[rerender])


    function DelClik(pk){
      const resp=$api.delete(`api/course/module/${pk}/`)
      resp.then(async resp=>{ console.log(await resp.data);setRerender(!rerender);}).catch(err=>{console.log(err);Alert.alert("Ошибка сервера")})

    }

    function AddModule (){

       const data={title,description:descr}

      const resp=$api.post(`api/course/${props.route.params.course}/module/`,data)
    resp.then(async resp=>{ console.log(await resp.data);setIsvisibnle(false);setRerender(!rerender);})
    .catch(err=>{console.log(err);Alert.alert("Ошибка введенных данных")})

    }
   
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
         Click={()=>props.navigation.navigate("Content",{"module":item.id})}
        DelClik={()=>{DelClik(item.id)}} 
        drag={drag}
        title={item.title} order={item.order}/>
      );
    };


    onMoveEnd = ({ data }) => {
      setItems(data)
      $api.post(`api/course/${props.route.params.course}/module/order/`,data)
        .then(resp=>{console.log(resp.status);setRerender(!rerender);}).catch(err=>{console.log(err);Alert.alert(err)})

    }


      return (

        <>
         
        <ImageBackground source={require("../assets/VSU.png")}  resizeMode="cover" style={styles.image}>
        <CupertinoHeaderBackModules title={"modules"} back={()=>props.navigation.goBack()} onPress={() => setIsvisibnle(true)}/>

          <Modal visible={isvisible}>
                  <IconButton
    icon="close"
  
    color={Colors.red500}
    style={{alignSelf: "center"}}
    size={35}
    onPress={() => setIsvisibnle(false)}
          />


          <Mytextinput
            placeholder="Тема"
            onChangeText={(Texts) => setTitle(Texts)}
            value={title}
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{ textAlignVertical: 'top', padding: 10 }} />



          <Mytextinput
            placeholder="Описание"
            onChangeText={(Texts) => setDescr(Texts)}
            value={descr}
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{ textAlignVertical: 'top', padding: 10 }} />

          <Mybutton title="save" customClick={AddModule} />
        </Modal>
        <SafeAreaView>

                <DraggableFlatList
                  data={items}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={ listItemView}
                  onDragEnd={onMoveEnd}
                  />


          </SafeAreaView>   
          </ImageBackground>

          </>
        
      );

};

export default ModuleScreenTeacher;

const styles = StyleSheet.create({
  container: {
    flex: 1, 

  },
  image: {
    flex: 1,

  },
});