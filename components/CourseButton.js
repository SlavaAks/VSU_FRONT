import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

function CourseButton(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Untitled")}
        style={styles.button}
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
        <View style={styles.group2}>
          <Text style={styles.loremIpsum3}>{props.overview}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    width: 322,
    height: 53,
    overflow: "scroll",
    marginTop: 13,
    marginLeft: 12
  },
  loremIpsum3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 43,
    width: 284,
    fontSize: 12
  }
});

export default CourseButton;