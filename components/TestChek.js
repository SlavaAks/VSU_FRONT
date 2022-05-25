import React, { Component,useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text ,FlatList} from "react-native";
import MaterialCheckboxWithLabel1 from "./CheckBox";




function TestChek(props) {
  const  [choose,setChoose]=useState([false*(props.query.length)])
  const [clickcheck,setClickcheck]=useState(' ')

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

  let setChecked=(id)=>{
    let copy = Object.assign([], choose);
    copy[id]=!copy[id]
    setChoose([...copy]) 
  }

  let CompairAnswer=()=>{setClickcheck("Верно")
    choose.forEach((val,index)=>{
      if(!((val && props.query[index].type=="correct")||(!val && props.query[index].type=="wrong"))){
        console.log("mistake")
        setClickcheck("Неверно")
      }
      else{
        console.log("like")
      }
    })
  }

  let listCheckBoxView=(k)=>{
    console.log(k)
     return(
       <MaterialCheckboxWithLabel1 label={k.item.content}  checked={choose[k.index]} setChecked={()=>setChecked(k.index)}/>
     )
     }

  console.log(choose)

  return (

    <View style={styles.container}>
         <Text style={styles.ask}>{props.title}</Text>
          <FlatList
                data={props.query}
                ItemSeparatorComponent={listViewItemSeparator}
                keyExtractor={(k, index) => index.toString()}
                renderItem={listCheckBoxView}
              />

      <TouchableOpacity onPress={CompairAnswer} style={styles.button}>
        <Text style={styles.ответить}>Ответить</Text>
      </TouchableOpacity>
      {clickcheck=="Верно" && (
      <View style={styles.resultTrue}>
      <Text style={styles.textResult}>{clickcheck}</Text>
      </View>
      )}
       {clickcheck=="Неверно" && (
      <View style={styles.resultFalse}>
      <Text style={styles.textResult}>{clickcheck}</Text>
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:"10%",
    marginBottom:"10%"
  },
  button: {
    width: 104,
    height: 36,
    backgroundColor: "#E6E6E6",
    marginTop: 8,
    
  },
  ответить: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 18,
    width: 78,
    textAlign: "center",
    marginTop: 9,
    marginLeft: 13
  },
  ask:{
    fontFamily: "roboto-regular",
    fontSize:18,
    color: "#121212",
    marginTop: 9,
    marginLeft: 13,
    marginBottom:9
  },
  textResult:{
    fontFamily: "roboto-regular", 
    color: "#121212",fontSize:20
  },

  resultTrue:{
    backgroundColor:"#05fc85"
  },
  resultFalse:{
    backgroundColor:"#fa3e3e"
  },

});

export default TestChek;