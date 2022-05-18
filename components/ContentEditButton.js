import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

function ContentEditButton(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onLongPress={props.DrugMove} style={styles.button2}>
        <Text style={styles.loremIpsum}>{props.title}</Text>
        <Text style={styles.type}>Type: {props.content_type}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={props.edit} style={styles.button}>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.delete} style={styles.button1}>
            <Text style={styles.edit1}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 351,
    height: 114,
    marginLeft:"6%",
    marginTop:"4%"
  },
  button2: {
    width: 351,
    backgroundColor: "#E6E6E6",
    flex: 1
  },
  loremIpsum: {
    fontFamily: "roboto-500",
    color: "#121212",
    height: 40,
    width: 331,
    fontSize: 16,
    marginTop: 9,
    marginLeft: 8
  },
  type: {
    fontFamily: "roboto-500",
    color: "#121212",
    height: 28,
    width: 195,
    fontSize: 16,
    marginLeft: 8
  },
  button: {
    width: 105,
    height: 34,
    backgroundColor: "rgba(195,195,195,1)",
    marginTop: 2
  },
  edit: {
    fontFamily: "roboto-regular",
    color: "rgba(74,144,226,1)",
    height: 25,
    width: 38,
    fontSize: 17,
    marginTop: 5,
    marginLeft: 34
  },
  button1: {
    width: 105,
    height: 34,
    backgroundColor: "rgba(195,195,195,1)",
    marginLeft: 141
  },
  edit1: {
    fontFamily: "roboto-regular",
    color: "rgba(250,0,4,1)",
    height: 22,
    width: 51,
    fontSize: 17,
    marginTop: 7,
    marginLeft: 33
  },
  buttonRow: {
    height: 36,
    flexDirection: "row",
    marginTop: 1
  }
});

export default ContentEditButton;