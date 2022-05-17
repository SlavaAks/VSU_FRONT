import React, { useEffect,useState } from 'react';
import { View, Text, Button, StyleSheet ,SafeAreaView,FlatList} from 'react-native';
import $api from '../../api/client';
import Mybutton from '../../components/Mybutton';
import CupertinoButtonPurple from '../../components/CupertinoButtonPurple';


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
  
    let listItemView = (item) => {
      console.log(item.item.item)
      return (
        <View key={item.id} style={{backgroundColor: 'white', padding: 20}}>
          <Text>{item.item.title}</Text>
          <Text>{item.item.item}</Text>
          <Mybutton
            title="edit"
            customClick={() => props.navigation.navigate('Lesson', {sub, type})}
          />
            <Mybutton
            title="delete"
            customClick={() => DelClick(item.id)}
          />
        </View>
      );
    };



      return (
        <SafeAreaView style={{flex: 1}}>
             <View style={styles.group}>
        <View style={styles.cupertinoButtonPurple6Row}>
          <CupertinoButtonPurple
            style={styles.cupertinoButtonPurple}
            title="text"
            customClick={() => props.navigation.navigate('ContentCreateScreen', {content_type:"text",module:props.route.params.module})}
            />
          <CupertinoButtonPurple
            style={styles.cupertinoButtonPurple}
            title="file"
            customClick={() => props.navigation.navigate('ContentCreateScreen', {content_type:"file",module:props.route.params.module})}
         />
          <CupertinoButtonPurple
            style={styles.cupertinoButtonPurple}
            title="video"
            customClick={() => props.navigation.navigate('ContentCreateScreen', {content_type:"video",module:props.route.params.module})}
          />
          <CupertinoButtonPurple
            style={styles.cupertinoButtonPurple}
            title="image"
            customClick={() => props.navigation.navigate('ContentCreateScreen', {content_type:"image"})}
          ></CupertinoButtonPurple>
          <CupertinoButtonPurple
            style={styles.cupertinoButtonPurple}
            title="test"
            customClick={() => props.navigation.navigate('ContentCreateScreen', {content_type:"test"})}
          />
        </View>
      </View>

          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex: 1}}>
              <FlatList
                data={items}
                ItemSeparatorComponent={listViewItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => listItemView(item)}
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
      // <View style={styles.container}>
      //   <Text>Settings Screen</Text>
      //   <Button
      //     title="Click Here"
      //     onPress={() => alert('Button Clicked!')}
      //   />
      // </View>

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
    flexDirection: "row",
    flex: 1
  },
  cupertinoButtonPurple6: {
    height: 38,
    width: 58,
    borderRadius: 9
  }
});
