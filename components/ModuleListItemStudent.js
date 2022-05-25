import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

function ModuleListItemStudent(props) {
  return (
    <View style={styles.container}>
            <TouchableOpacity           
            onPress={props.Click}
              style={styles.button}
               onLongPress={props.drag}>
                <Icon name="edit" style={styles.icon}></Icon>
                    <Text style={styles.loremIpsum}>{props.order+1}.</Text>
                    <Text style={styles.loremIpsum3}>{props.title}</Text>
            </TouchableOpacity>
      </View>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  button: {
    marginTop:6,
    height: 89,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(155,155,155,1)",
    flexDirection: "row"
  },

  loremIpsum: {
    fontFamily: "roboto-regular",
    fontSize:25,
    color: "#121212",
    height: 28,
    width: 40
  },

  loremIpsum3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 35,
    fontSize:20,
    width: "70%"
  },

  button2: {

    width: "10%",
    height: "50%",
    alignSelf:"flex-end",
    backgroundColor: "rgba(255,255,255,1)"
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
  },
});

export default  ModuleListItemStudent;
