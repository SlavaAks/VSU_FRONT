import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialCheckboxWithLabel1(props) {
  
  return (
    <TouchableOpacity onPress={props.setChecked} style={[styles.container, props.style]}>
      <Icon
        name={props.checked ? "checkbox-marked" : "checkbox-blank-outline"}
        style={styles.checkIcon}
      ></Icon>
      <Text style={styles.checkLabel}>{props.label || "Label"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: "transparent",
    flexDirection: "row"
  },
  checkIcon: {
    color: "#3F51B5",
    fontSize: 28,
    lineHeight: 28
  },
  checkLabel: {
    marginLeft: 2,
    fontSize: 16,
    color: "rgba(0,0,0,0.87)"
  }
});

export default MaterialCheckboxWithLabel1;