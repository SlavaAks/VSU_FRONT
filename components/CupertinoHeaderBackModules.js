import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";

function CupertinoHeaderBackModules(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.leftWrapper}>
        <TouchableOpacity onPress={props.back} style={styles.leftIconButton}>
          <IoniconsIcon name="arrow-back" style={styles.leftIcon}></IoniconsIcon>
        </TouchableOpacity>
      </View>
      <View style={styles.textWrapper}>
        <Text numberOfLines={1} style={styles.title}>
          {props.title}
        </Text>
      </View>
      <View style={styles.rightWrapper}>
        <TouchableOpacity onPress={props.onPress} style={styles.button}>
          <IoniconsIcon name="ios-add" style={styles.rightIcon}></IoniconsIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#EFEFF4",
    paddingRight: 8,
    paddingLeft: 8
  },
  leftWrapper: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  leftIconButton: {
    flexDirection: "row"
  },
  leftIcon: {
    color: "#007AFF",
    fontSize: 40
  },
  textWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    color: "#000"
  },
  rightWrapper: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  button: {},
  rightIcon: {
    backgroundColor: "transparent",
    color: "#007AFF",
    fontSize: 40
  }
});

export default CupertinoHeaderBackModules;
