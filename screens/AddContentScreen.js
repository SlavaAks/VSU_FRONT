import React, { useEffect,useState } from 'react';
import { View, Text, Button, StyleSheet ,SafeAreaView,FlatList} from 'react-native';
import $api from "../api/client";
import Mybutton from '../components/Mybutton';


const AddContenScreen = (props) => {

    const [items,setItems]=useState([])
    useEffect(()=>{
    const resp=$api.get('api/course/module/7/content/')
    resp.then(resp=>setItems(resp.data)).catch(err=>err=>console.log(err))
    console.log(items)


    },[])

   
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
          <Mybutton
            title="edit"
            customClick={() => props.navigation.navigate('Lesson', {sub, type})}
          />
            <Mybutton
            title="delete"
            customClick={() => props.navigation.navigate('Lesson', {sub, type})}
          />
        </View>
      );
    };



      return (
        <SafeAreaView style={{flex: 1}}>
            <Mybutton
            title="text"
            customClick={() => props.navigation.navigate('ContentCreateScreen', {content_type:"text"})}
          />
          <Mybutton
            title="file"
            customClick={() => props.navigation.navigate('ContentCreateScreen', {content_type:"file"})}
          />
          <Mybutton
            title="video"
            customClick={() => props.navigation.navigate('ContentCreateScreen', {content_type:"video"})}
          />
          <Mybutton
            title="image"
            customClick={() => props.navigation.navigate('ContentCreateScreen', {content_type:"image"})}
          />
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
});
