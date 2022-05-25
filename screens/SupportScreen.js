import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import CupertinoHeaderWithActionButton from "../components/Headers";
import Icon from "react-native-vector-icons/Feather";
import $api from "../api/client";
import { ScrollView } from "react-native-gesture-handler";

function SupportScreen(props) {
  const [description,setDescription]=useState()
  const [topic,setTopic]=useState()



  let SendTicket=()=>{
    $api.post("user_tickets/",{topic,description}).then(resp=>{console.log(resp);Alert.alert("Issue add");setDescription(''),setTopic('')}).catch(err=>console.error(err))
  }


  return (

    <ScrollView style={styles.container}>
    <StatusBar animated />
    <CupertinoHeaderWithActionButton
      Back={()=>props.navigation.navigate("Home")}
      SendTicket={SendTicket}
      style={styles.cupertinoHeaderWithActionButton}
    ></CupertinoHeaderWithActionButton>
    <View style={styles.placeholderStack}>
      <TextInput
        placeholder=""
        style={styles.placeholder}
        value={topic}
        onChangeText={(text)=>setTopic(text)}
      ></TextInput>
      <Text style={styles.coreIssue}>Core issue</Text>
    </View>
    <View style={styles.placeholder2Stack}>
      <TextInput
        placeholder=""
        multiline={true}
        value={description}
        style={styles.placeholder2}
        onChangeText={(text)=>setDescription(text)}
      ></TextInput>
      <Text style={styles.additionalComments}>Additional comments</Text>
      <TouchableOpacity  style={styles.button}>
      <Icon name="file" style={styles.icon}></Icon>
    </TouchableOpacity>
    </View>
  </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(209, 209, 209, 1)"
  },
  cupertinoHeaderWithActionButton: {
    height: "15%",
  },
  placeholder: {

   
    fontFamily: "roboto-regular",
    backgroundColor: "rgba(255,255,255,1)",
    color:"#000000",
    height: "75%",
    marginTop: "10%",
    width: "100%",
    fontSize: 16,
    // borderWidth: 1,
    // borderColor: "#000000",
    borderRadius: 9,
  },
  coreIssue: {
    marginBottom:"5%",
    
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#000000",
    height: "100%",
    width: "100%",
  },
  placeholderStack: {
    width: "95%",
    height: "15%",
    marginTop: "4%",
    marginLeft: "2%",
  },
  placeholder2: {
    // flex:1,
    color:"#000000",
    width:"95%",
    height:100,
    marginTop: "11%",
  
    fontFamily: "roboto-regular",
    fontSize: 16,
    backgroundColor: "rgba(255,255,255,1)",
    textAlignVertical: 'top',
    borderRadius: 9
  },
  additionalComments: {

    position: "absolute",
    fontFamily: "roboto-regular",
    marginTop: "4%",
    color: "#000000",
    height: "25%",
    width: "40%"
  },
  placeholder2Stack: {
    width: "100%",
    height: "100%",
    marginTop: "7%",
    marginBottom:"5%",
    marginLeft: "2%",
  },
  button: {
    width:"13%",
    height: "14%",
    backgroundColor: "rgba(255,255,255,1)",
    marginTop:"10%",
    // borderWidth: 1,
    // borderColor: "#000000",
    borderRadius: 9,
    marginLeft: 10
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    width:"100%",
    height: "100%",
    marginTop: 5,
    marginLeft: 6
  }
});

export default SupportScreen;
