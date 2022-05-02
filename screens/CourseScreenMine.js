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

const CourseScreenMine = (props) => {
    const [rerender, setRerender] = useState(false);
    const [items,setItems]=useState([])
    const [subject,setSubject]=useState()
    const [title,setTitle]=useState()
    const [slug,setSlug]=useState()
    const [owerw,setOwerw]=useState()
    const [isvisible,setIsvisibnle]=useState(false)


    useEffect(()=>{
    console.log(1111)
    const resp=$api.get(`api/course/mine/`)
    resp.then(resp=>setItems(resp.data)).catch(err=>err=>console.log(err))

    },[rerender])


    function DelClik(pk){
      const resp=$api.delete(`api/course/${pk}/`)
      resp.then(async resp=>{ console.log(await resp.data);setRerender(!rerender);}).catch(err=>{console.log(err);Alert.alert("Ошибка сервера")})

    }

    function AddCourse (){

      const data={subject,title,slug,overview:owerw}

      const resp=$api.post(`api/course/mine/`,data)
    resp.then(async resp=>{ console.log(await resp.data);setIsvisibnle(false);setRerender(!rerender);}).catch(err=>{console.log(err);Alert.alert("Ошибка введенных данных")})

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
      // console.log(item.item.item)
      console.log(item)
      console.log(drag)
      console.log(isActive)
      return (
        <CourseButtonEdite Click={()=>props.navigation.navigate("ModuleScreenTeacher",{"course":item.id})}
        DelClik={()=>{DelClik(item.id)}} 
        drag={drag}
        title={item.title} overview={item.overview}/>
      );
    };


    onMoveEnd = ({ data }) => {
      setItems(data)
    }


      return (

        <>
            
        <ImageBackground source={require("../assets/VSU.png")}  resizeMode="cover" style={styles.image}>
        <Modal visible={isvisible}>
                  <IconButton
    icon="close"
  
    color={Colors.red500}
    style={{alignSelf: "center"}}
    size={35}
    onPress={() => setIsvisibnle(false)}
          />
          <Mytextinput
            placeholder="Предмет"
            onChangeText={(Texts) => setSubject(Texts)}
            value={subject}
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{ textAlignVertical: 'top', padding: 10 }} />

          <Mytextinput
            placeholder="Тема"
            onChangeText={(Texts) => setTitle(Texts)}
            value={title}
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{ textAlignVertical: 'top', padding: 10 }} />

          <Mytextinput
            placeholder="Короткое уникальное название(латиница)"
            onChangeText={(Texts) => setSlug(Texts)}
            value={slug}
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{ textAlignVertical: 'top', padding: 10 }} />

          <Mytextinput
            placeholder="Описание"
            onChangeText={(Texts) => setOwerw(Texts)}
            value={owerw}
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{ textAlignVertical: 'top', padding: 10 }} />

          <Mybutton title="save" customClick={AddCourse} />
        </Modal>

        <IconButton 
    icon="plus"
    color={Colors.red500}
    style={{alignSelf: "center"}}
    size={35}
    onPress={() => setIsvisibnle(true)}
          />

                <DraggableFlatList
                  data={items}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={ listItemView}
                  onDragEnd={onMoveEnd}
                  // onMoveEnd={onMoveEnd}
                  />



          </ImageBackground>
          </>
        
      );

};

export default CourseScreenMine;

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