import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

function SubjectButton(props) {
  return (

    <View style={styles.group2}>
    <TouchableOpacity  onPress={props.Click} style={styles.button}>
      <View style={styles.imageRow}>
        <Image
          source={require("../assets/Table.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <Text style={styles.loremIpsum}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  </View>
  );
}


const styles = StyleSheet.create({
  group2: {
    width: 400,
    height: 126,
    marginTop: 15,
    alignSelf: "center"
  },
  button: {
    backgroundColor: "rgba(255,255,255,1)",
    // borderWidth: 1,
    // borderColor: "#000000",
    borderRadius: 9,
    flex: 1
  },
  image: {
    width: 58,
    height: 56
  },
  loremIpsum: {
    fontFamily: "roboto-500",
    color: "#121212",
    height: 50,
    width: 252,
    fontSize: 20,
    marginLeft: 21,
    marginTop: 6
  },
  imageRow: {
    height: 56,
    flexDirection: "row",
    marginTop: 7,
    marginLeft: 13,
    marginRight: 12
  },
  group: {
    width: 331,
    height: 39,
    overflow: "scroll",
    marginTop: 13,
    marginLeft: 13
  },
  loremIpsum2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 39,
    width: 331,
    fontSize: 16
  }
});

export default SubjectButton;