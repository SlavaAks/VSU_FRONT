import React, { Component,useEffect,useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList
} from "react-native";
import { renderNode } from "react-native-elements/dist/helpers";
import $api from "../../api/client";
import CupertinoButtonDelete from "../../components/DeleteBasketButton";

function AddTest(props) {
  const [items,setItems]=useState([])
  const [rerender,setRerender]=useState()
  const [title,setTitle]=useState()
// useEffect(()=>{
// setItems=[]
// },[rerender,items]

// )

  const APITestReq=()=>{
    const data = new FormData();
    data.append('title', title);
    data.append('answer',JSON.stringify(items));
    data.append('content_type',"test")
    $api.post(`api/course/module/${props.module}/content/`,data).then(resp=>console.log(resp)).then(err=>console.log(err))

  }

  const correctAnswer=()=>{
      console.log(items)
      let copy = Object.assign([], items);
      console.log(copy,'s11')
      setItems([...copy,{type:"correct",content:""}])
    }

    const wrongAnswer=()=>{
      let copy = Object.assign([], items);
      setItems([...copy,{type:"wrong",content:""}]) 
      
    }
 
    const DelField=(id)=>{
      let copy = Object.assign([], items);
      setItems([...copy.slice(0,id),...copy.slice(id+1)])
    }

    const ChangeContent=(id,text)=>{
      let copy = Object.assign([], items);
      copy[id].content=text
      setItems([...copy]) 
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
  
    let listItemView = ( i ) => {
      if(i.item.type=="correct")
      return (
        <View style={{flexDirection: "row",}}>
        <TextInput onChangeText={(text)=>ChangeContent(i.index,text)}  placeholder="" style={styles.placeholder}></TextInput>
        <CupertinoButtonDelete DelClick={()=>DelField(i.index)} 
      ></CupertinoButtonDelete>
      </View>
      )
      else return (
        <View style={{flexDirection: "row",}}>
        <Text>{i.id}</Text>
        <TextInput onChangeText={(text)=>ChangeContent(i.index,text)}  placeholder="" style={styles.textInput}></TextInput>
        <CupertinoButtonDelete DelClick={()=>DelField(i.index)} 
        
        ></CupertinoButtonDelete>
        </View>
      )

    };


  return (
    <View style={styles.container}>
      <SafeAreaView>
            <TextInput
            onChangeText={(text)=>setTitle(text)}
        placeholder="Title"
        textBreakStrategy="simple"
        autoCorrect={false}
        style={styles.title}
      ></TextInput>
                <FlatList
                  data={items}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={ listItemView}
                 />
              <TouchableOpacity onPress={APITestReq} style={styles.button2}>
        <Text style={styles.создатьОпрос}>Создать опрос</Text>
      </TouchableOpacity>
        <View style={styles.buttonRow}>
        <TouchableOpacity onPress={correctAnswer} style={styles.button}>
          <Text style={styles.верныйВариант}>верный вариант</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={wrongAnswer} style={styles.button1}>
          <Text style={styles.ложныйВариант}>ложный вариант</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 33,
    width: 319,
    borderWidth: 1,
    borderColor: "rgba(250,0,4,1)",
    marginTop: 19,
    marginLeft: 34,
    alignSelf:"center"
  },
  placeholder: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 33,
    width: 319,
    borderWidth: 1,
    borderColor: "rgba(39,3,244,1)",
    marginTop: 19,
    marginLeft: 34,
    alignSelf:"center"
    
  },
  button: {
    width: 153,
    height: 41,
    backgroundColor: "#E6E6E6",
    borderRadius: 8
  },
  верныйВариант: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 21,
    width: 112,
    marginTop: 10,
    marginLeft: 20
  },
  button1: {
    width: 153,
    height: 41,
    backgroundColor: "#E6E6E6",
    borderRadius: 9,
    marginLeft: 41
  },
  button2: {
    width: 150,
    height: 49,
    backgroundColor: "#E6E6E6",
    borderRadius: 9,
    alignSelf:"center"
  },
  создатьОпрос: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop:10,

    alignSelf:"center"
  },
  ложныйВариант: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 21,
    width: 112,
    fontSize: 14,
    marginTop: 10,
    marginLeft: 20
  },
  buttonRow: {
    height: 41,
    flexDirection: "row",
    marginTop: 127,
    marginLeft: 14,
    marginRight: 14
  },
  title: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 93,
    width: 352,
    borderWidth: 1,
    borderColor: "#000000",
    shadowColor: "rgba(0,0,0,1)",
    alignSelf:"center"
  }
});

export default AddTest;
