import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

function CourseButtonEnroll(props) {
    return(
    <View style={styles.container}>
    <View style={styles.buttonStack}>
      <TouchableOpacity style={styles.button}>
        <View style={styles.imageRow}>
          <Image
            source={require("../assets/Table.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          <Text style={styles.loremIpsum}>Lorem Ipsum</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.group}>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.button2}> <Icon name="add-to-list" style={styles.icon}></Icon></TouchableOpacity>
        </View>
      </View>
      <Text style={styles.loremIpsum2}>
        sadasdasdasdasdsadsadasdasdasdsadasdsadsadasdsadsad
      </Text>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  overflow: "scroll",
  width: 351,
  height: 161,
  alignSelf: "center"
},
button: {
  top: 22,
  width: 342,
  height: 140,
  position: "absolute",
  backgroundColor: "rgba(255,255,255,1)",
  borderWidth: 1,
  borderColor: "#000000",
  borderRadius: 9,
  left: 0,
  flexDirection: "row"
},
image: {
  width: 56,
  height: 62
},
loremIpsum: {
  fontFamily: "roboto-500",
  color: "#121212",
  fontSize: 20,
  width: 118,
  height: 24,
  marginLeft: 20,
  marginTop: 5
},
imageRow: {
  height: 62,
  flexDirection: "row",
  flex: 1,
  marginRight: 135,
  marginLeft: 13,
  marginTop: 7
},
group: {
  top: 0,
  left: 311,
  width: 40,
  height: 43,
  position: "absolute",
  flexDirection: "row"
},
icon: {
  color: "rgba(128,128,128,1)",
  fontSize: 40
},
button2: {
  width: 38,
  height: 43,
  marginLeft: 2
},
iconRow: {
  height: 43,
  flexDirection: "row",
  flex: 1
},
loremIpsum2: {
  top: 98,
  left: 13,
  position: "absolute",
  fontFamily: "roboto-regular",
  color: "#121212",
  height: 39,
  width: 331,
  fontSize: 16
},
buttonStack: {
  width: 351,
  height: 162
}
});



export default CourseButtonEnroll;