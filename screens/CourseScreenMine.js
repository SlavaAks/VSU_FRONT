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
import Dropdown from '../components/Dropdown';
import CupertinoHeaderWithAddButton from '../components/HeaderAddButton';

const CourseScreenMine = (props) => {
    const [rerender, setRerender] = useState(false);
    const [items,setItems]=useState([])
    const [subject,setSubject]=useState()
    const [title,setTitle]=useState()
    const [slug,setSlug]=useState()
    const [owerw,setOwerw]=useState()
    const [isvisible,setIsvisibnle]=useState(false)
    const [data,setData]=useState()

    
    useEffect(()=>{
    const resp=$api.get(`api/course/mine/`)
    resp.then(resp=>setItems(resp.data)).catch(err=>console.log(err))
    $api.get(`api/subject/`).then(data=>setData(data.data)).catch(err=>console.log(err))

    },[rerender])

    function DelClik(pk){
      const resp=$api.delete(`api/course/${pk}/`)
      resp.then(async resp=>{ console.log(await resp.data);setRerender(!rerender);}).catch(err=>{console.log(err);Alert.alert("Ошибка сервера")})

    }

    function AddCourse (props){

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
      return (
        <CourseButtonEdite Click={()=>props.navigation.navigate("ModuleScreenTeacher",{"course":item.id})}
        DelClik={()=>{DelClik(item.id)}} 
        drag={drag}
        title={item.title} overview={item.overview}/>
      );
    };


  let  onMoveEnd = ({ data }) => { 
      setItems(data)
    }


      return (

        <>
            
        <ImageBackground source={require("../assets/VSU.png")}  resizeMode="cover" style={styles.image}>
        <CupertinoHeaderWithAddButton title={"courses"} menu={()=>props.navigation.toggleDrawer()} onPress={() => setIsvisibnle(true)}/>
        <Modal visible={isvisible}>
                  <IconButton
    icon="close"
  
    color={Colors.red500}
    style={{alignSelf: "center"}}
    size={35}
    onPress={() => setIsvisibnle(false)}
          />

          <Dropdown label="Select Item" data={data} onSelect={setSubject} />

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
    <SafeAreaView>
       
                <DraggableFlatList
                  data={items}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={ listItemView}
                  onDragEnd={onMoveEnd}
                  // onMoveEnd={onMoveEnd}
                  />
  </SafeAreaView>


          </ImageBackground>
          </>
        
      );

};

export default CourseScreenMine;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  image: {
    flex: 1,
  },
});