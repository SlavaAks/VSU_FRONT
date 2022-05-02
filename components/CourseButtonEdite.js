import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

function CourseButtonEdite(props) {
  return (
    <View style={styles.container}>
      <View style={styles.group4}>
        <TouchableOpacity
          onPress={props.Click}
          style={styles.button}
          onLongPress={props.drag}
        >
          <View style={styles.imageRow}>
            <Image
              source={require("../assets/book-png-icon-5.png")}
              resizeMode="contain"
              style={styles.image}
            ></Image>
            <View style={styles.rect}>
              <View style={styles.group3}>
                <Text style={styles.loremIpsum}>{props.title}</Text>
              </View>
            </View>
          </View>
          <View style={styles.group2Stack}>
            <View style={styles.group2}>
              <Text style={styles.loremIpsum3}>{props.overview}</Text>
            </View>
            <TouchableOpacity
              onPress={props.DelClik}
              style={styles.button2}
            >
              <Icon name="delete-forever" style={styles.icon}></Icon>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 344,
    height: 178,
    alignSelf: "center",
    marginBottom:5
  },
  group4: {
    width: 344,
    height: 178
  },
  button: {
    width: 344,
    height: 178,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 25,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.47,
    shadowRadius: 0
  },
  image: {
    width: 99,
    height: 75
  },
  rect: {
    width: 209,
    height: 86,
    overflow: "scroll",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    marginLeft: 6
  },
  group3: {
    width: 206,
    height: 85,
    justifyContent: "center"
  },
  loremIpsum: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 85,
    width: 206,
    fontSize: 15,
    alignSelf: "center"
  },
  imageRow: {
    height: 86,
    flexDirection: "row",
    marginTop: 9,
    marginLeft: 5,
    marginRight: 26
  },
  group2: {
    top: 0,
    left: 0,
    width: 333,
    height: 42,
    position: "absolute",
    overflow: "scroll"
  },
  loremIpsum3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 43,
    width: 284,
    fontSize: 12
  },
  button2: {
    top: 35,
    left: 282,
    width: 40,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)"
  },
  icon: {
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40,
  },
  group2Stack: {
    width: 333,
    height: 81,
    marginLeft: 5
  }
});

export default CourseButtonEdite;
