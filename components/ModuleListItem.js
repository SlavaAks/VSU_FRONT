import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

function ModuleListItem(props) {
  return (
    <View style={styles.container}>
      <View style={styles.group4}>
        <View style={styles.group3}>
          <View style={styles.rect}>
            <TouchableOpacity           
            onPress={props.Click}
          style={styles.button}
          onLongPress={props.drag}>
              <View style={styles.iconRow}>
                <Icon name="edit" style={styles.icon}></Icon>
                <View style={styles.groupStack}>
                  <View style={styles.group}>
                    <Text style={styles.loremIpsum}>{props.order}.</Text>
                  </View>
                  <View style={styles.group2}>
                    <Text style={styles.loremIpsum3}>{props.title}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
     
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
      group4: {
        height: 90,

      },
      group3: {
        flex: 1
      },
      rect: {
        flex: 1
      },
      button: {
        height: 89,
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "rgba(155,155,155,1)",
        flexDirection: "row"
      },
      icon: {
        color: "rgba(128,128,128,1)",
        fontSize: 32,
        height: 35,
        width: 32
      },
      group: {
        top: 0,
        left: 0,
        width: 55,
        height: 45,
        position: "absolute",
        overflow: "scroll"
      },
      loremIpsum: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 28,
        width: 40
      },
      group2: {
        top: 0,
        left: 54,
        width: 223,
        height: 35,
        position: "absolute",
        overflow: "scroll"
      },
      loremIpsum3: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 35,
        width: 223
      },
      groupStack: {
        width: 277,

      },
      iconRow: {
        height: 45,
        flexDirection: "row",
        flex: 1,

      }
});

export default ModuleListItem;
