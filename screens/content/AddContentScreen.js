import React, { useEffect,useState } from 'react';
import { View, Text, Button, StyleSheet ,SafeAreaView,FlatList} from 'react-native';
import $api from '../../api/client';
import DraggableFlatList, { RenderItemInfo, OnMoveEndInfo } from 'react-native-draggable-flatlist'
import CupertinoButtonPurple from '../../components/CupertinoButtonPurple';
import ContentEditButton from '../../components/ContentEditButton';


const AddContenScreen = (props) => {
    [module,setModule]=useState(props.route.params.module)
    const [rerender, setRerender] = useState(false);

    const [items,setItems]=useState([])
    useEffect(()=>{
    console.log(props.route.params.module)
    const resp=$api.get(`api/course/module/${props.route.params.module}/content/`)
    resp.then(resp=>setItems(resp.data)).catch(err=>err=>console.log(err))
    console.log(items)


    },[props,rerender])

    
    let DelClick=(id)=>{$api.delete(`api/course/module/content/${id}/`).then(resp=>{console.log(resp);setRerender(!rerender)}).catch(err=>console.log(err))
    console.log(items)
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
  
    let listItemView = ({ item, drag, isActive }) => {console.log(item.item.item)
      return (
        <ContentEditButton DrugMove={drag} title={item.item.title} content_type={item.content_type} delete={() => DelClick(item.id)} edit={()=>{}}/>
      );
    };

    onMoveEnd = ({ data }) => {
      setItems(data)
      $api.post(`api/course/module/${props.route.params.module}/order/`,data)
        .then(resp=>{console.log(resp.status);setRerender(!rerender);}).catch(err=>{console.log(err);Alert.alert(err)})

    }



      return (
        <SafeAreaView style={{flex: 1}}>
             <View style={styles.group}>
        <View style={styles.cupertinoButtonPurple6Row}>
          <CupertinoButtonPurple
            style={styles.cupertinoButtonPurple}
            title="text"
            AddCont={() => props.navigation.navigate('Creation', {content_type:"text",module:props.route.params.module})}
            />
          <CupertinoButtonPurple
            style={styles.cupertinoButtonPurple}
            title="file"
            AddCont={() => props.navigation.navigate('Creation', {content_type:"file",module:props.route.params.module})}
         />
          <CupertinoButtonPurple
            style={styles.cupertinoButtonPurple}
            title="video"
            AddCont={() => props.navigation.navigate('Creation', {content_type:"video",module:props.route.params.module})}
          />
          <CupertinoButtonPurple
            style={styles.cupertinoButtonPurple}
            title="image"
            AddCont={() => props.navigation.navigate('Creation', {content_type:"image",module:props.route.params.module})}
          ></CupertinoButtonPurple>
          <CupertinoButtonPurple
            style={styles.cupertinoButtonPurple}
            title="test"
            AddCont={() => props.navigation.navigate('Creation', {content_type:"test",module:props.route.params.module})}
          />
        </View>
      </View>

          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex: 1}}>
            <DraggableFlatList
                  data={items}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={ listItemView}
                  onDragEnd={onMoveEnd}
                  />
            </View>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: 'grey',
              }}></Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                color: 'grey',
              }}></Text>
          </View>
        </SafeAreaView>
      );

};

export default AddContenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  cupertinoButtonPurple6Row: {
    height: 38,
    width:"100%",
    flexDirection: "row",
    // flex: 1
  },
  cupertinoButtonPurple: {
    height: 38,
    width:"17.5%",
    marginLeft:"2%",
    borderRadius: 9
  }
});
