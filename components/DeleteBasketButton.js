import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function CupertinoButtonDelete(props) {
  return (
    <TouchableOpacity onPress={props.DelClick} style={[styles.container, props.style]}>
      <Icon name="ios-trash" style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5
  },
  icon: {
    color: "#000",
    fontSize: 24
  }
});

export default CupertinoButtonDelete;